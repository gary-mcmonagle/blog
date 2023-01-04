using System;
using System.Reflection.Metadata;
using BlogServicesShared;
using BlogServicesShared.Dtos.Requests;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;

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
        var sqlQuery = new QueryDefinition(
            $"select * from blog b where b.urlSlug = @slug"
        ).WithParameter("@slug", query.UrlSlug);
        var iterator = container.GetItemQueryIterator<BlogEntity>(sqlQuery);

        var got = new List<BlogEntity>();

        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync();

            foreach (var result in response.Resource)
            {
                got.Add(result);
            }
        }

        return got;
    }
}
