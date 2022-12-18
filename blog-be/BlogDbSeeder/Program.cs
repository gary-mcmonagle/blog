using BlogServicesShared;
using Microsoft.Azure.Cosmos;

if (args.Length == 0)
{
    throw new Exception("please provide cosmos connection string");
}
string cosmosConnectionString = args[0];
var baseBlogs = new List<BlogTemplateEntity>
{
    new BlogTemplateEntity{ Id = Guid.Parse("3169155b-f9a1-4221-8a66-611d5ad4d50e"), Name = "basic" },
    new BlogTemplateEntity{ Id = Guid.Parse("30734e3e-bbfd-40d2-9df1-62641c492350"), Name = "grid" },
};

CosmosClient cosmosClient = new(cosmosConnectionString);

// Database reference with creation if it does not already exist
Database database = cosmosClient.GetDatabase(id: "blog");
Console.WriteLine($"New database:\t{database.Id}");
ContainerProperties templatesConatinerProperties = new ContainerProperties()
{
    Id = "templates",
    PartitionKeyPath = "/id",
    IndexingPolicy = new IndexingPolicy()
    {
        Automatic = false,
        IndexingMode = IndexingMode.Lazy,
    }
};
ContainerProperties blogContainerProperties = new ContainerProperties()
{
    Id = "blog",
    PartitionKeyPath = "/template/templateId",
    IndexingPolicy = new IndexingPolicy()
    {
        Automatic = false,
        IndexingMode = IndexingMode.Lazy,
    }
};
await database.CreateContainerIfNotExistsAsync(templatesConatinerProperties);
await database.CreateContainerIfNotExistsAsync(blogContainerProperties);
Container container = database.GetContainer(id: "templates");

foreach (var blog in baseBlogs)
{
    try
    {
        var got = await container.ReadItemAsync<BlogTemplateEntity>(id: Guid.Parse(blog.Id.ToString()).ToString(), new PartitionKey(blog.Id.ToString()));
        Console.WriteLine(got.Resource.Name);

    }
    catch (Microsoft.Azure.Cosmos.CosmosException)
    {
        await container.CreateItemAsync<BlogTemplateEntity>(item: new BlogTemplateEntity { Id = blog.Id, Name = blog.Name });
    }
}