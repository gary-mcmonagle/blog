using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using BlogAdminServices.Requests;

namespace BlogAdminServices
{
    public static class CreateBlog
    {
        [FunctionName("CreateBlog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "blog",
                collectionName: "blog",
                ConnectionStringSetting = "CosmosDBConnection"
            )]
                IAsyncCollector<dynamic> documentsOut,
            ILogger log
        )
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            CreateBlogRequest data = JsonConvert.DeserializeObject<CreateBlogRequest>(requestBody);

            var templateId = data.templateId;
            if (string.IsNullOrEmpty(templateId))
            {
                return new BadRequestObjectResult("No template id");
            }

            string responseMessage = templateId;
            await documentsOut.AddAsync(
                new
                {
                    id = System.Guid.NewGuid().ToString(),
                    templateId = data.templateId,
                    content = data.content,
                    urlSlug = data.urlSlug,
                    title = data.title
                }
            );

            return new OkObjectResult(responseMessage);
        }
    }
}
