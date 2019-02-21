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
        public string userID { get; set; }
        private string userName { get; set; }
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

            Message msg = new Message();
            DateTime dateTime = DateTime.Now;

            msg.SentMessage = message;
            msg.SentAt = dateTime;
            msg.UserId = Int32.Parse(userID);

            db.Message.Add(msg);
            db.SaveChanges();

            return new ObjectResult(msg);
        }

        [HttpGet("[action]")]
        public IActionResult GetMessages()
        {

            var msgQuery = from msgs in db.Message
                           from u in db.UserData
                           where msgs.UserId == u.UserId
                           select new
                           {
                               SendMessage = msgs.SentMessage,
                               SendBy = u.UserName,
                               SendTime = msgs.SentAt,
                               userId = msgs.UserId,
                          };

            return new ObjectResult(msgQuery);
        }
    }
}