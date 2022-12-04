using System;
using AutoMapper;
using BlogServicesShared.Responses;

namespace BlogServicesShared.Mappers
{
    public class BlogMapper : Profile
    {
        public BlogMapper()
        {
            CreateMap<BlogEntity, GetBlogResponse>();
        }
    }
}
