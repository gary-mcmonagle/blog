using BlogServicesShared;
using Newtonsoft.Json;

namespace BlogAdminServices.Requests
{
    public class CreateBlogRequest
    {
        [JsonProperty("template")]
        public BlogTemplateEntity Template { get; set; }

        [JsonProperty("content")]
        public dynamic Content { get; set; }

        [JsonProperty("urlSlug")]
        public string UrlSlug { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("published")]
        public bool Published { get; set; }
    }
}
