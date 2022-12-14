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
using BlogServicesShared.Responses;
using Microsoft.Azure.Documents.Client;
using System.Linq;

namespace BlogAdminServices
{
    public static class DeleteBlog
    {
        [FunctionName("DeleteBlog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "blog/{blogId}")]
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

            if (document == null)
            {
                return new NotFoundResult();
            }
            document.SetPropertyValue("deleted", true);
            await client.ReplaceDocumentAsync(document);

            BlogEntity e = new BlogEntity(
                document.GetPropertyValue<dynamic>("content"),
                document.GetPropertyValue<string>("templateId"),
                document.GetPropertyValue<string>("urlSlug"),
                document.GetPropertyValue<string>("title"),
                document.GetPropertyValue<bool>("published"),
                document.GetPropertyValue<DateTime?>("publishDate")
            );
            e.Id = Guid.Parse(document.Id);

            return new OkResult();
        }
    }
}
