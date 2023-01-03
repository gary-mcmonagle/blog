using System;
using System.Reflection.Metadata;
using BlogServicesShared;
using BlogServicesShared.Dtos.Requests;
using Microsoft.Azure.Cosmos;

namespace BlogInfrastructure;

public class BlogWriteRepository : IBlogWriteRepository
{
    Database _db;

    public BlogWriteRepository(string cosmosConnectionString)
    {
        CosmosClient cosmosClient = new(cosmosConnectionString);
        _db = cosmosClient.GetDatabase("blog");
    }

    public async Task<BlogEntity> Add(CreateBlogDto dto)
    {
        var container = _db.GetContainer(id: "blog");
        DateTime? publishDate = dto.Published ? DateTime.Now : null;
        BlogEntity entity =
            new(dto.Content, dto.Template, dto.UrlSlug, dto.Title, dto.Published, publishDate);
        await container.CreateItemAsync<BlogEntity>(entity);
        return entity;
    }
}
