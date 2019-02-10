using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MessageApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MessageApp.Services;

namespace MessageApp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly MessageDBContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SampleDataController(MessageDBContext _db)
        {
            db = _db;
        }

        [HttpPost("{email}")]
        public IActionResult Signup([FromQuery(Name = "email")] string email, [FromQuery(Name = "userName")] string userName, [FromQuery(Name = "password")] string password)
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                                         Response);

            byte[] validatePassword = Encoding.ASCII.GetBytes(password);

            UserData userData = new UserData();

            userData.Email = email;
            userData.UserName = userName;
            userData.Password = validatePassword;
            userData.Status = "Online";

            db.UserData.Add(userData);
            db.SaveChanges();

            cookieHelper.Set("userID", (userData.UserId).ToString(), 1);
            HttpContext.Session.SetString("userID", (userData.UserId).ToString());

            return new ObjectResult(userData);
        }

        [HttpGet("{password}")]
        public IActionResult Login([FromQuery(Name = "email")] string email, [FromQuery(Name = "password")] string password)
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                                         Response);

            byte[] validatePassword = Encoding.ASCII.GetBytes(password);

            var query = (from user in db.UserData
                         where user.Email == email &&
                         user.Password == validatePassword
                         select user).FirstOrDefault();

            if(query == null)
            {
                return Redirect("https://localhost:44379/signup");
            }

            query.Status = "Online";

            db.UserData.Update(query);
            db.SaveChanges();

            cookieHelper.Set("userID", (query.UserId).ToString(), 1);

            return new ObjectResult(query);
        }
    }
}
