using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }
        public List<Post> Posts { get; set; }
    }
}
