using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MessageApp.Models;
using MessageApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly MessageDBContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserController(MessageDBContext _db, IHttpContextAccessor _httpContextAccessor)
        {
            db = _db;
            this._httpContextAccessor = _httpContextAccessor;
        }

        [HttpGet("[action]")]
        public IActionResult GetCurrentUser()
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                             Response);

            string userID = cookieHelper.Get("userID");

            if (userID == null)
            {
                return null;
            }


            var findUser = (from user in db.UserData
                            where user.UserId == Int32.Parse(userID)
                            select user).FirstOrDefault();

            if(findUser.UserImage != null)
            {
                string imageBase64Data = Convert.ToBase64String(findUser.UserImage);
                string imgDataURL = string.Format("data:image/jpg;base64,{0}", imageBase64Data);
                var queryWithImage = (from user in db.UserData
                             where user.UserId == Int32.Parse(userID)
                             select new
                             {
                                 name = user.UserName,
                                 email = user.Email,
                                 status = user.Status,
                                 profilePhoto = imgDataURL,
                                 userId = user.UserId
                             }).FirstOrDefault();

                if (queryWithImage == null)
                {
                    return null;
                }

                return new ObjectResult(queryWithImage);

            }

            var queryWithoutImage = (from user in db.UserData
                         where user.UserId == Int32.Parse(userID)
                         select new
                         {
                             name = user.UserName,
                             email = user.Email,
                             status = user.Status,
                             userId = user.UserId
                         }).FirstOrDefault();

            if (queryWithoutImage == null)
            {
                return null;
            }

            return new ObjectResult(queryWithoutImage);
        }

        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                             Response);

            string userID = cookieHelper.Get("userID");

            var query = (from user in db.UserData
                         where user.UserId == Int32.Parse(userID)
                         select user).FirstOrDefault();

            query.Status = "Offline";
            db.UserData.Update(query);
            db.SaveChanges();

            return new ObjectResult(query);
        }

        [HttpGet("[action]")]
        public IActionResult GetUserList()
        {
            var query = (from user in db.UserData
                         select user);

            return new ObjectResult(query);
        }

        [HttpPost("[action]")]
        public string SaveUserProfile()
        {
            using (var stream = new StreamReader(Request.Body))
            {
                CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                             Response);

                string userID = cookieHelper.Get("userID");

                var query = (from user in db.UserData
                             where user.UserId == Int32.Parse(userID)
                             select user).FirstOrDefault();

                string imagePath = stream.ReadToEnd();

                query.UserImage = Convert.FromBase64String(imagePath);

                db.UserData.Update(query);
                db.SaveChanges();

                return stream.ReadToEnd();
            }
        }
    }
}
