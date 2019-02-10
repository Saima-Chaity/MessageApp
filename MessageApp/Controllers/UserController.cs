using System;
using System.Collections.Generic;
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
        public UserController(MessageDBContext _db)
        {
            db = _db;
        }

        [HttpGet("[action]")]
        public IActionResult GetCurrentUser()
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                             Response);

            string userID = cookieHelper.Get("userID");

            var query = (from user in db.UserData
                         where user.UserId == Int32.Parse(userID)
                         select new {
                             name = user.UserName,
                             email = user.Email,
                             status = user.Status,
                             userId = user.UserId}).FirstOrDefault();

            return new ObjectResult(query);
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
    }
}