using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Entities
{
    public class UserFollowers
    {
        public int FollowerId { get; set; }
        public int FollowingId { get; set; }

        public User Follower { get; set; }
        public User Following { get; set; }
    }
}
