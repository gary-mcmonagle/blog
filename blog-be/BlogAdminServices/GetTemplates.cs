using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using BlogServicesShared;
using System.Collections.Generic;

namespace BlogAdminServices
{
    public static class GetTemplates
    {
        [FunctionName("GetTemplates")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "templates")] HttpRequest req,
            [CosmosDB(
                "blog",
                "templates",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "select * from templates"
            )]
                IEnumerable<BlogTemplateEntity> templates,
            ILogger log
        )
        {
            return new OkObjectResult(templates);
        }
    }
}
