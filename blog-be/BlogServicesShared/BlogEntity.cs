using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace BlogServicesShared
{
    public class BlogEntity : BaseEntity
    {
        public BlogEntity(
            dynamic content,
            BlogTemplateEntity template,
            string urlSlug,
            string title,
            bool published,
            DateTime? publishDate
        )
        {
            Content = content;
            Template = template;
            UrlSlug = urlSlug;
            Title = title;
            Published = published;
            PublishDate = publishDate;
            Deleted = false;
        }

        [JsonProperty("template")]
        public BlogTemplateEntity Template { get; set; }

        [JsonProperty("content")]
        public dynamic Content { get; set; }

        [JsonProperty("templateId")]
        public string TemplateId { get; set; }

        [JsonProperty("urlSlug")]
        public string UrlSlug { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("published")]
        public bool Published { get; set; }

        [JsonProperty("deleted")]
        public bool Deleted { get; set; }

        [JsonProperty("publishDate")]
        public DateTime? PublishDate { get; set; }
    }
}
