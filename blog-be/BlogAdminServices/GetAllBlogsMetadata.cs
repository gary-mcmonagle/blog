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
    public class GetAllBlogsMetadata
    {
        private readonly IMapper _mapper;
        private readonly List<string> _metdataFields = new List<string> { "title" };

        public GetAllBlogsMetadata(IMapper mapper)
        {
            _mapper = mapper;
        }

        [FunctionName("GetAllBlogsMetadata")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "metadata/blog")]
                HttpRequest req,
            [CosmosDB(
                "blog",
                "blog",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = $"SELECT b.title, b.urlSlug, b.id FROM blog b"
            )]
                IEnumerable<MetadataDto> blogsMetadata,
            ILogger log
        )
        {
            return new OkObjectResult(
                blogsMetadata.Select(meta => _mapper.Map<BlogMetadataResponse>(meta))
            );
        }
    }
}
