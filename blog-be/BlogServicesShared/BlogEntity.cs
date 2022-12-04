using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace BlogServicesShared
{
    public class BlogEntity : BaseEntity
    {
        public BlogEntity(dynamic content, string templateId, string urlSlug, string title)
        {
            Content = content;
            TemplateId = templateId;
            UrlSlug = urlSlug;
            Title = title;
        }

        [JsonProperty("content")]
        public dynamic Content { get; set; }

        [JsonProperty("templateId")]
        public string TemplateId { get; set; }

        [JsonProperty("urlSlug")]
        public string UrlSlug { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }
    }
}
