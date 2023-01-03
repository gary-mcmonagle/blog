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
using AutoMapper;
using BlogServicesShared.Responses;
using Microsoft.Azure.Documents.Client;
using System.Linq;
using BlogServicesShared.Services;
using BlogServicesShared.Dtos.Requests;

namespace BlogAdminServices
{
    public class CreateBlog
    {
        private readonly IMapper _mapper;
        private readonly IBlogService _blogService;

        public CreateBlog(IMapper mapper, IBlogService blogService)
        {
            _mapper = mapper;
            _blogService = blogService;
        }

        [FunctionName("CreateBlog")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "blog")] HttpRequest req,
            [CosmosDB(
                databaseName: "blog",
                collectionName: "blog",
                ConnectionStringSetting = "CosmosDBConnection"
            )]
                IAsyncCollector<BlogEntity> documentsOut,
            [CosmosDB(ConnectionStringSetting = "CosmosDBConnection")] DocumentClient client,
            ILogger log
        )
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            CreateBlogRequest data = JsonConvert.DeserializeObject<CreateBlogRequest>(requestBody);
            var createDto = JsonConvert.DeserializeObject<CreateBlogDto>(requestBody);

            var e = await _blogService.Create(createDto);
            return new OkObjectResult(_mapper.Map<GetBlogResponse>(e));
            /*

            var option = new FeedOptions { EnableCrossPartitionQuery = true };
            var collectionUri = UriFactory.CreateDocumentCollectionUri("blog", "blog");

            var matchingSlugDocument = client
                .CreateDocumentQuery<BlogEntity>(collectionUri, option)
                .Where(t => t.UrlSlug == data.UrlSlug)
                .AsEnumerable()
                .FirstOrDefault();

            if (matchingSlugDocument != null)
            {
                return new BadRequestObjectResult("Slug already exists in system");
            }

            var templateId = data.Template.Id;
            if (string.IsNullOrEmpty(templateId.ToString()))
            {
                return new BadRequestObjectResult("No template id");
            }

            DateTime? publishDate = data.Published ? DateTime.Now : null;

            string responseMessage = templateId.ToString();
            BlogEntity entity =
                new(
                    data.Content,
                    data.Template,
                    data.UrlSlug,
                    data.Title,
                    data.Published,
                    publishDate
                );
            await documentsOut.AddAsync(entity);
            return new OkObjectResult(_mapper.Map<GetBlogResponse>(entity));
            */
        }
    }
}
