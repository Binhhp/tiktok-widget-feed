using MediatR;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class VideosController : ODataController
    {
        private readonly IWidgetService _widgetService;
        private readonly IInstagramWidgetService _instagramWidgetService;
        private readonly IMediator _mediator;
        public VideosController(IWidgetService widgetService, IMediator mediator, IInstagramWidgetService instagramWidgetService)
        {
            _widgetService = widgetService;
            _mediator = mediator;
            _instagramWidgetService = instagramWidgetService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("TikTokVideos({key})")]
        public async Task<IActionResult> GetTikTokVideos([FromODataUri] string key)
        {
            var result = _widgetService.GetVideos(key);
            await Task.Run(() => _mediator.Publish(new TikTokImpressionCommand
            {
                Time = DateTime.UtcNow,
                WidgetId = key
            }));
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("TikTokVideos")]
        public IActionResult GetTikTokVideos(string data, SourceTypeEnum type)
        {
            if (!string.IsNullOrEmpty(data))
            {
                var response = _widgetService.GetVideoJob(new GetVideoByJobRequest
                {
                    Data = data,
                    Type = type
                });
                return Ok(response);
            }
            return BadRequest();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("InstagramVideos")]
        public IActionResult GetInstagramVideos(string data, SourceTypeEnum type)
        {
            if (!string.IsNullOrEmpty(data))
            {
                var response = _instagramWidgetService.GetVideoJob(new GetVideoByJobRequest
                {
                    Data = data,
                    Type = type
                });
                return Ok(response);
            }
            return BadRequest();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("InstagramVideos({key})")]
        public async Task<IActionResult> GetInstagramVideos([FromODataUri] string key)
        {
            var result = _instagramWidgetService.GetVideos(key);
            await Task.Run(() => _mediator.Publish(new InstagramImpressionCommand
            {
                Time = DateTime.UtcNow,
                WidgetId = key
            }));
            return Ok(result);
        }
    }
}
