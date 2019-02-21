using System;
using System.Collections.Generic;

namespace MessageApp.Models
{
    public partial class Message
    {
        public int MessageId { get; set; }
        public int? UserId { get; set; }
        public string SentMessage { get; set; }
        public DateTime SentAt { get; set; }
        public string SentFile { get; set; }

        public UserData User { get; set; }
    }
}
