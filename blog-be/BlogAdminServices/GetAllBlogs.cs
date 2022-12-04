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

namespace BlogAdminServices
{
    public class GetAllBlogs
    {
        private readonly IMapper _mapper;

        public GetAllBlogs(IMapper mapper)
        {
            _mapper = mapper;
        }

        [FunctionName("GetAllBlogs")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "blog")] HttpRequest req,
            [CosmosDB(
                "blog",
                "blog",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "select * from blog"
            )]
                IEnumerable<BlogEntity> toDoItems,
            ILogger log
        )
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            log.LogInformation(toDoItems.ToList().Count.ToString());

            return new OkObjectResult(toDoItems.Select(blog => _mapper.Map<GetBlogResponse>(blog)));
        }
    }
}
