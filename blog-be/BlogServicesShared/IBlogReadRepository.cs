using System;

namespace BlogServicesShared
{
    public interface IBlogReadRepository
    {
        public Task<List<BlogEntity>> Get(BlogQuery query);
    }
}
