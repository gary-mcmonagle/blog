using System;
using BlogServicesShared.Dtos.Requests;

namespace BlogServicesShared.Services;

public class BlogService : IBlogService
{
    private IBlogWriteRepository _blogWriteRepository;
    private IBlogReadRepository _blogReadRepository;

    public BlogService(IBlogWriteRepository writeRepository, IBlogReadRepository readRepository)
    {
        _blogWriteRepository = writeRepository;
        _blogReadRepository = readRepository;
    }

    public async Task<BlogEntity> Create(CreateBlogDto createDto)
    {
        var matchingSlug = await _blogReadRepository.Get(
            new BlogQuery { UrlSlug = createDto.UrlSlug }
        );
        if (matchingSlug.Count > 0)
            throw new Exception("Could not create");
        return await _blogWriteRepository.Add(createDto);
    }
}
