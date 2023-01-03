using System;
using System.Reflection.Metadata;
using BlogServicesShared;
using BlogServicesShared.Dtos.Requests;
using Microsoft.Azure.Cosmos;

namespace BlogInfrastructure;

public class BlogReadRepository : IBlogReadRepository
{
    Database _db;

    public BlogReadRepository(string cosmosConnectionString)
    {
        CosmosClient cosmosClient = new(cosmosConnectionString);
        _db = cosmosClient.GetDatabase("blog");
    }

    public async Task<List<BlogEntity>> Get(BlogQuery query)
    {
        var container = _db.GetContainer(id: "blog");
        IOrderedQueryable<BlogEntity> queryable = container.GetItemLinqQueryable<BlogEntity>();
        var matches = queryable.Where(p => p.UrlSlug == query.UrlSlug);
        return matches.ToList();
    }
}
