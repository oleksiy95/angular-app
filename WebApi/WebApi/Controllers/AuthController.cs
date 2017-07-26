using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebApi.Auth;
using Newtonsoft.Json;
using WebApi.Models;
using WebApi.Models.Entities;
using Microsoft.Extensions.Options;
using WebApi.ViewModels;
using WebApi.Helpers;
using System.Security.Claims;
using WebApi.Data;
using AutoMapper;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions, ApplicationDbContext context, IMapper mapper)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _context = context;
            _mapper = mapper;

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        // POST api/auth/login
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userToVerify = await _userManager.FindByNameAsync(credentials.UserName);
            var identity = await GetClaimsIdentity(userToVerify, credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            // Serialize and return the response
            var user = _mapper.Map<UserViewModel>(_context.Users.SingleOrDefault(u => u.IdentityId == userToVerify.Id));
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                expires_in = (int)_jwtOptions.ValidFor.TotalSeconds,
                user = user
            };

            //var json = JsonConvert.SerializeObject(response, _serializerSettings);
            return new OkObjectResult(response);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(AppUser userToVerify, string userName, string password)
        {
            if (userToVerify != null)
            {
                // check the credentials  
                if (await _userManager.CheckPasswordAsync(userToVerify, password))
                {
                    return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                }
            }            

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}