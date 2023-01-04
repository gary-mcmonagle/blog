using System;
using BlogServicesShared.Dtos.Requests;

namespace BlogServicesShared.Services;

public interface IBlogService
{
    public Task<BlogEntity> Create(CreateBlogDto createDto);
    public Task<BlogEntity?> GetSingle(BlogQuery query);
}
