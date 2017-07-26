﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.ViewModels
{
    public class PostViewModel
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}
