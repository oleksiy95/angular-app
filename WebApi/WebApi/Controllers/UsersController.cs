using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.Entities;
using WebApi.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public UsersController(UserManager<AppUser> userManager, ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToArrayAsync();

            if (!users.Any()) { return NotFound("UserNotFound"); }
            else return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {
            //var userToVerify = await _userManager.FindByIdAsync(id);
            var user = await _context.Users.Include(u => u.Identity).SingleOrDefaultAsync(u => u.IdentityId == id);
            var userModel = _mapper.Map<UserViewModel>(user);

            if (user == null)
            {
                return NotFound("User not Found");
            }

            return Ok(userModel);
        }

        [HttpGet("{id}/posts")]
        public async Task<IActionResult> GetUserPosts([FromRoute] int id)
        {
            var user = await _context.Users.Include(u => u.Posts).SingleOrDefaultAsync(u => u.UserId == id);
            if (user == null)
            {
                return NotFound("User not Found");
            }
            if (user.Posts == null) return Ok(new List<Post>());
            var posts = user.Posts.OrderByDescending(p => p.Date).Select(Mapper.Map<PostViewModel>);
            return Ok(posts);
        }

        [HttpPost("{id}/posts")]
        public async Task<IActionResult> PostUserPost([FromRoute] int id,[FromBody] Post post)
        {            
                if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            post.UserId = id;
            post.Date = DateTime.Now;
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            var postModel = Mapper.Map<PostViewModel>(post);

            return Ok(postModel);
        }

        
        // PUT: api/Users/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        //{
        //    if (id != user.UserId)
        //    {
        //        return BadRequest("Wrong Id");
        //    }

        //    try
        //    {
        //        var userToEdit = await _context.Users
        //          .AsNoTracking()
        //          .SingleOrDefaultAsync(m => m.UserId == id);

        //        if (userToEdit == null)
        //        {
        //            return NotFound("Could not update user as it was not Found");
        //        }
        //        else
        //        {
        //            _context.Update(user);
        //            await _context.SaveChangesAsync();
        //            return Ok($"Updated user - {user.}");
        //        }
        //    }
        //    catch (DbUpdateException)
        //    {
        //        return NotFound("User not Found");
        //    }
        //}

        // POST: api/Users
        //[HttpPost]
        //public async Task<IActionResult> PostUser([FromBody] User user)
        //{
        //    if (!string.IsNullOrEmpty(user.Name))
        //    {
        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();
        //        return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        //    }
        //    else
        //    {
        //        return BadRequest("User's name was not given");
        //    }
        //}

        //// DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser([FromRoute] int id)
        //{
        //    var user = await _context.Users.SingleOrDefaultAsync(m => m.UserId == id);
        //    if (user == null)
        //    {
        //        return NotFound("Could not delete user as it was not Found");
        //    }

        //    _context.Users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return Ok($"Deleted user - {user.Name}");
        //}

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}