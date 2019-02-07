using System;
using System.Collections.Generic;

namespace MessageApp.Models
{
    public partial class Message
    {
        public int MessageId { get; set; }
        public string UserName { get; set; }
        public string SentMessage { get; set; }
        public DateTime SentAt { get; set; }
        public string SentFile { get; set; }
    }
}
