using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using BlogServicesShared;
using AutoMapper;
using BlogServicesShared.Responses;

namespace BlogServices;

public class GetBlog
{
    private readonly IMapper _mapper;
    private readonly IBlogReadRepository _blogReadRepository;

    public GetBlog(IMapper mapper, IBlogReadRepository blogReadRepository)
    {
        _mapper = mapper;
        _blogReadRepository = blogReadRepository;
    }

    [FunctionName("GetBlog")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "blog/{slug}")] HttpRequest req,
        string slug,
        ILogger log
    )
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        var blogs = await _blogReadRepository.Get(new BlogQuery { UrlSlug = slug });

        Console.WriteLine($@"POOTH ${req.Path}");

        if (blogs.ToList().Count == 0)
        {
            return new NotFoundResult();
        }

        var blog = blogs.ToList()[0];

        if (!blog.Published)
        {
            return new NotFoundResult();
        }
        return new OkObjectResult(_mapper.Map<GetBlogResponse>(blog));
    }
}
