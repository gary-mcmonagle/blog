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

namespace BlogServices
{
    public class GetBlog
    {
        private readonly IMapper _mapper;

        public GetBlog(IMapper mapper)
        {
            _mapper = mapper;
        }

        [FunctionName("GetBlog")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "blog/{slug}")]
                HttpRequest req,
            [CosmosDB(
                "blog",
                "blog",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "select * from blog r where r.urlSlug = {slug}"
            )]
                IEnumerable<BlogEntity> blogs,
            ILogger log
        )
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            log.LogInformation(blogs.ToList().Count.ToString());

            if (blogs.ToList().Count == 0)
            {
                return new NotFoundResult();
            }

            var blog = blogs.ToList()[0];
            return new OkObjectResult(_mapper.Map<GetBlogResponse>(blog));
        }
    }
}
