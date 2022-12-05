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
using BlogServicesShared;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Documents.Client;
using System.Linq;

namespace BlogAdminServices
{
    public static class UpdateBlog
    {
        [FunctionName("UpdateBlog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "blog/{blogId}")]
                HttpRequest req,
            string blogId,
            [CosmosDB(ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log
        )
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var updated = JsonConvert.DeserializeObject<UpdateBlogRequest>(requestBody);

            var option = new FeedOptions { EnableCrossPartitionQuery = true };
            var collectionUri = UriFactory.CreateDocumentCollectionUri("blog", "blog");

            var document = client
                .CreateDocumentQuery(collectionUri, option)
                .Where(t => t.Id == blogId)
                .AsEnumerable()
                .FirstOrDefault();

            Console.WriteLine(document.Id);

            if (document == null)
            {
                return new NotFoundResult();
            }
            if (updated.Content != null)
            {
                dynamic c = updated.Content;
                document.SetPropertyValue("content", c);
            }

            await client.ReplaceDocumentAsync(document);

            return new OkObjectResult("TEST");
        }
    }
}
