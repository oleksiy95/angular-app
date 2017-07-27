using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models.Entities;

namespace WebApi.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>();

            CreateMap<Post, PostViewModel>();
            CreateMap<PostViewModel, Post>();

            CreateMap<User, UserViewModel>()
                .ForMember(dist => dist.Email, map => map.MapFrom(src => src.Identity.Email))
                .ForMember(dist => dist.FirstName, map => map.MapFrom(src => src.Identity.FirstName))
                .ForMember(dist => dist.LastName, map => map.MapFrom(src => src.Identity.LastName))
                .ForMember(dist => dist.UserName, map => map.MapFrom(src => src.Identity.UserName));

            CreateMap<User, UserStaticDataModel>()
                .ForMember(dist => dist.Email, map => map.MapFrom(src => src.Identity.Email))
                .ForMember(dist => dist.FirstName, map => map.MapFrom(src => src.Identity.FirstName))
                .ForMember(dist => dist.LastName, map => map.MapFrom(src => src.Identity.LastName))
                .ForMember(dist => dist.UserName, map => map.MapFrom(src => src.Identity.UserName));
        }
    }
}
