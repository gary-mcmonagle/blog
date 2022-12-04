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
using BlogAdminServices.Responses;
using BlogServicesShared;

namespace BlogAdminServices
{
    public static class GetAllBlogs
    {
        [FunctionName("GetAllBlogs")]
        public static async Task<IActionResult> Run(
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

            return new OkObjectResult(
                toDoItems.Select(
                    blog =>
                        new GetAllBlogResponse
                        {
                            Content = blog.Content,
                            TemplateId = blog.TemplateId,
                            Title = blog.Title,
                            UrlSlug = blog.UrlSlug
                        }
                )
            );
        }
    }
}
