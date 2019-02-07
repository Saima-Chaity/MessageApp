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
    public class MessageController : Controller
    {
        private readonly MessageDBContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private string userID { get; set; }
        private string userName { get; set; }
        private IEnumerable<Message> AllMessages { get; set; }
        public MessageController(MessageDBContext _db)
        {
            db = _db;
        }

        [HttpPost("{message}")]
        public IActionResult SendMessage([FromQuery(Name = "message")]  string message)
        {
            CookieHelper cookieHelper = new CookieHelper(_httpContextAccessor, Request,
                                                         Response);

            userID = cookieHelper.Get("userID");

            userName = (from user in db.UserData
                        where user.UserId == Int32.Parse(userID)
                        select user.UserName).FirstOrDefault();

            Message msg = new Message();
            DateTime dateTime = DateTime.Now;

            msg.UserName = userName;
            msg.SentMessage = message;
            msg.SentAt = dateTime;

            db.Message.Add(msg);
            db.SaveChanges();

            return new ObjectResult(AllMessages);
        }

        [HttpGet("[action]")]
        public IEnumerable<Message> GetMessages()
        {
            AllMessages = from msgs in db.Message
                        select msgs;

            return AllMessages;
        }
    }
}