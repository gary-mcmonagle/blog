using System;
using System.Xml.Linq;
using AutoMapper;
using BlogServicesShared.Mappers;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
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
        }
    }
}
