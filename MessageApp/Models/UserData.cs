using System;
using System.Collections.Generic;

namespace MessageApp.Models
{
    public partial class UserData
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public string Status { get; set; }
    }
}
