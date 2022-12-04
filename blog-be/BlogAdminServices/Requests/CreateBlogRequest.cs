namespace BlogAdminServices.Requests
{
    public class CreateBlogRequest
    {
        public string templateId { get; set; }

        public string content { get; set; }

        public string urlSlug { get; set; }

        public string title { get; set; }
    }
}
