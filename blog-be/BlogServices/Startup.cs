using System;
using System.Xml.Linq;
using AutoMapper;
using BlogServicesShared;
using BlogServicesShared.Mappers;
using BlogInfrastructure;
using BlogServicesShared.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(BlogServices.Startup))]

namespace BlogServices
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<IMapper>(
                (s) =>
                {
                    var mapperConfig = new MapperConfiguration(mc =>
                    {
                        mc.AddProfile(new BlogMapper());
                    });
                    return mapperConfig.CreateMapper();
                }
            );
            builder.Services.AddSingleton<IBlogWriteRepository>(
                (s) =>
                {
                    return new BlogWriteRepository(
                        s.GetService<IConfiguration>().GetSection("CosmosDBConnection").Value
                    );
                }
            );
            builder.Services.AddSingleton<IBlogReadRepository>(
                (s) =>
                {
                    return new BlogReadRepository(
                        s.GetService<IConfiguration>().GetSection("CosmosDBConnection").Value
                    );
                }
            );
            builder.Services.AddScoped<IBlogService, BlogService>();
        }
    }
}
