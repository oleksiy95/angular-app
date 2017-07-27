using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace WebApi.ViewModels.Validations
{
    public class PostViewModelValidator : AbstractValidator<PostViewModel>
    {
        public PostViewModelValidator()
        {
            RuleFor(vm => vm.Content).NotEmpty().WithMessage("Content cannot be empty");
        }
    }
}
