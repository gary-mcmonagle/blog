using System;
using Newtonsoft.Json;

namespace BlogServicesShared.Responses
{
    public class BlogMetadataResponse
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("urlSlug")]
        public string UrlSlug { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
