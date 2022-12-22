using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using static System.Net.WebRequestMethods;

namespace BlogAdminServices
{
    public static class UploadImage
    {
        [FunctionName("UploadImage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "image/{filename}")]
                HttpRequest req,
            ILogger log
        )
        {
            var formdata = await req.ReadFormAsync();
            var file = req.Form.Files["file"];
            // return new OkObjectResult(file.FileName + " - " + file.Length.ToString());


            string Connection = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
            Stream myBlob = new MemoryStream();
            myBlob = file.OpenReadStream();
            var blobClient = new BlobContainerClient(Connection, "test-container");

            var uri = blobClient.Uri;
            var blob = blobClient.GetBlobClient(file.FileName);
            Console.WriteLine(file.FileName);
            var upload = await blob.UploadAsync(myBlob);
            return new OkObjectResult(new { url = uri + "/" + file.FileName });
        }
    }
}
