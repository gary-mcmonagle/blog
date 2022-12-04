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

namespace BlogServices
{
    public static class GetBlog
    {
        [FunctionName("GetBlog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "blog/{slug}")] HttpRequest req,
             [CosmosDB("blog", "blog",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "select * from blog r where r.urlSlug = {slug}")]
                IEnumerable<dynamic> toDoItems,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            log.LogInformation(toDoItems.ToList().Count.ToString());

            var blog = toDoItems.ToList()[0];

            foreach (dynamic toDoItem in toDoItems)
            {
                log.LogInformation(toDoItem.id as string);
            }
            return new OkObjectResult(
                new GetBlogResponse
                { 
                    Content = blog.content,
                    TemplateId = blog.templateId,
                    Title = blog.title,
                    UrlSlug = blog.urlSlug
                }
            );
        }
    }
}
