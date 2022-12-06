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

namespace BlogAdminServices
{
    public class CreateBlog
    {
        private readonly IMapper _mapper;

        public CreateBlog(IMapper mapper)
        {
            _mapper = mapper;
        }

        [FunctionName("CreateBlog")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "blog",
                collectionName: "blog",
                ConnectionStringSetting = "CosmosDBConnection"
            )]
                IAsyncCollector<BlogEntity> documentsOut,
            ILogger log
        )
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            CreateBlogRequest data = JsonConvert.DeserializeObject<CreateBlogRequest>(requestBody);

            var templateId = data.TemplateId;
            if (string.IsNullOrEmpty(templateId))
            {
                return new BadRequestObjectResult("No template id");
            }

            string responseMessage = templateId;
            BlogEntity entity = new(data.Content, data.TemplateId, data.UrlSlug, data.Title);
            await documentsOut.AddAsync(entity);
            return new OkObjectResult(_mapper.Map<GetBlogResponse>(entity));
        }
    }
}
