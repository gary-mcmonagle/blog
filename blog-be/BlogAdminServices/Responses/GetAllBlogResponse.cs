namespace BlogAdminServices.Responses
{
    public class GetAllBlogResponse
    {
        public string TemplateId { get; set; }

        public dynamic Content { get; set; }

        public string Title { get; set; }

        public string UrlSlug { get; set; }
    }
}
