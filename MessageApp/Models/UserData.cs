using System;
using System.Collections.Generic;

namespace MessageApp.Models
{
    public partial class UserData
    {
        public UserData()
        {
            Message = new HashSet<Message>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public string Status { get; set; }
        public byte[] UserImage { get; set; }

        public ICollection<Message> Message { get; set; }
    }
}
