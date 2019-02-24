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
    public class MessageController : Controller
    {
        private readonly MessageDBContext db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string userID { get; set; }
        private string userName { get; set; }
        //private byte[] SendImage { get; set; }
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
            var query = from msgs in db.Message
                        from u in db.UserData
                        where msgs.UserId == u.UserId
                        select msgs;

            return new ObjectResult(query);
        }

        [HttpPost("[action]")]
        public string sendMessageAndFile([FromQuery(Name = "message")] string message)
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

                Message msg = new Message();
                DateTime dateTime = DateTime.Now;

                msg.SentMessage = message;
                msg.SentAt = dateTime;
                msg.UserId = Int32.Parse(userID);
                msg.SentFile = Convert.FromBase64String(imagePath);

                db.Message.Add(msg);
                db.SaveChanges();

                return stream.ReadToEnd();
            }
        }
    }
}