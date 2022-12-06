using System;
using Newtonsoft.Json;

namespace BlogServicesShared
{
    public class MetadataDto
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("urlSlug")]
        public string UrlSlug { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
