using System;
using BlogServicesShared.Dtos.Requests;

namespace BlogServicesShared
{
    public interface IBlogWriteRepository
    {
        public Task<BlogEntity> Add(CreateBlogDto dto);
    }
}
