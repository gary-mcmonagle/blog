using System;
using Newtonsoft.Json;

namespace BlogServicesShared
{
    public class BlogTemplateEntity
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
