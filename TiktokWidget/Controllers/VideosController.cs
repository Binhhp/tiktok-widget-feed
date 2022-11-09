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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;
        public VideosController(IMediator mediator, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("TikTokVideos({key})")]
        public async Task<IActionResult> GetTikTokVideos([FromODataUri] string key)
        {
            var result = await _mediator.Send(new GetTikTokVideoCommand(key));
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
                var response = _unitOfWork.TikTok.GetVideoJob(new GetVideoByJobRequest
                {
                    Data = data,
                    Type = type
                });
                return Ok(response);
            }
            return BadRequest();
        }

        [HttpPost]
        [ODataRoute("TikTokVideos({key})/SetClicks")]
        public async Task<IActionResult> SetTikTokClicks([FromODataUri] string key)
        {
            await Task.Run(() => _mediator.Publish(new TikTokClicksCommand
            {
                Time = DateTime.UtcNow,
                WidgetId = key
            }));
            return Ok();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("InstagramVideos")]
        public IActionResult GetInstagramVideos(string data, SourceTypeEnum type)
        {
            if (!string.IsNullOrEmpty(data))
            {
                var response = _unitOfWork.Instagram.GetVideoJob(new GetVideoByJobRequest
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
            var result = await _mediator.Send(new GetInstagramVideoCommand(key));
            await Task.Run(() => _mediator.Publish(new InstagramImpressionCommand
            {
                Time = DateTime.UtcNow,
                WidgetId = key
            }));
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("InstagramVideos({key})/SetClicks")]
        public async Task<IActionResult> SetInstagramClicks([FromODataUri] string key)
        {
            await Task.Run(() => _mediator.Publish(new InstagramClicksCommand
            {
                Time = DateTime.UtcNow,
                WidgetId = key
            }));
            return Ok();
        }
    }
}
