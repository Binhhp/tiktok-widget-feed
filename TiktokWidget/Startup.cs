using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNet.OData.Batch;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Formatter.Serialization;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData.Routing.Conventions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData;
using Orichi.IoC.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using TiktokWidget.Middlewares.GlobalExceptionHandler;
using TiktokWidget.ODataEntities;
using TiktokWidget.ODataEntities.ODataProvider;
using TiktokWidget.Service;
using TiktokWidget.Service.Configurations;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Validators;

namespace TiktokWidget
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        public IWebHostEnvironment Environment { get; set; }
        public Startup(IWebHostEnvironment env)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: true).Build();
            Configuration = configuration;
            Environment = env;
        }

        private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("TiktokWidget");
            services.AddDbContext<WidgetFeedDbContext>(options => options.UseSqlServer(connectionString));

            var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
            if (appSettings != null)
            {
                AppSettings appConfig = appSettings;
                services.AddSingleton(appConfig);
            }

            services.AddOData();

            services.AddHttpContextAccessor();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllers(options =>
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add<ValidatorFilter>();
                foreach (var outputFormatter in options.OutputFormatters.OfType<OutputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new Microsoft.Net.Http.Headers.MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }

                foreach (var inputFormatter in options.InputFormatters.OfType<InputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new Microsoft.Net.Http.Headers.MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                })
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                )
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidatorFilter>());

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.SetIsOriginAllowed(isOriginAllowed: _ => true).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
            });
            if (Environment.EnvironmentName != "Development")
            {
                // In production, the React files will be served from this directory
                services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/build";
                });
            }

            services.InitCoreComponents();
            services.AddMediatR(typeof(MediatREntrypoint).Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(MyAllowSpecificOrigins);
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (env.EnvironmentName != "Development")
                app.UseSpaStaticFiles();
            //SPA
            app.UseRouting();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

            });
            app.GlobalExceptionMiddleware();
            var model = OdataEdmEntity.GetEdmModel();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.Select().Filter().Expand(QueryOptionSetting.Allowed).OrderBy().MaxTop(null).Count().SkipToken();
                endpoints.EnableDependencyInjection();
                endpoints.MapODataRoute(routeName: "odata", routePrefix: "odata", builder =>
                {
                    builder.AddService(Microsoft.OData.ServiceLifetime.Singleton, (IServiceProvider sp) => model);
                    builder.AddService(Microsoft.OData.ServiceLifetime.Singleton, (IServiceProvider sp) => new DefaultODataBatchHandler());
                    builder.AddService(Microsoft.OData.ServiceLifetime.Singleton, (Func<IServiceProvider, IEnumerable<IODataRoutingConvention>>)((IServiceProvider sp) => ODataRoutingConventions.CreateDefaultWithAttributeRouting("odata", endpoints.ServiceProvider)));
                    builder.AddService<ODataSerializerProvider>(Microsoft.OData.ServiceLifetime.Singleton, s => new EntityTypeSerializerProvider(s));
                    builder.AddService<ODataBatchHandler>(Microsoft.OData.ServiceLifetime.Singleton, serviceProvider => new DefaultODataBatchHandler());
                });
                //endpoints.MapODataRoute(routeName: "odata", routePrefix: "odata", OdataEdmEntity.GetEdmModel(), new DefaultODataBatchHandler());
            });

            if (env.EnvironmentName != "Development")
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";
                    if (env.EnvironmentName == "Testing")
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
            }
        }
    }
}
