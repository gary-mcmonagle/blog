using System;
using Newtonsoft.Json;

namespace BlogServicesShared.Responses
{
    public class GetBlogResponse
    {
        public string Content { get; set; }
        public string TemplateId { get; set; }
        public string UrlSlug { get; set; }
        public string Title { get; set; }
        public string Id { get; set; }
        public bool Published { get; set; }
        public DateTime? PublishDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
