using MediatR;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Requests.Videos;
using TiktokWidget.Service.Entities;
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

        [HttpPost]
        [EnableQuery]
        [ODataRoute("TikTokVideos")]
        public IActionResult GetTikTokVideos([FromBody] GetVideoJobRequest request)
        {
            var requestDto = new GetVideoByJobRequest
            {
                Data = request.Data,
                Type = request.Type
            };
            if (Request.Query.TryGetValue("widgetId", out var widgetId))
            {
                requestDto.WidgetId = widgetId;
            }
            var response = _unitOfWork.TikTok.GetVideoJob(requestDto);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("TikTokVideos({key})/SetClicks")]
        public async Task<IActionResult> SetTikTokClicks([FromODataUri] string key, [FromBody] SetClickPostRequest request)
        {
            await Task.Run(() => _mediator.Publish(new TikTokClicksCommand
            {
                Time = DateTime.UtcNow,
                PostWidgetInformation = new PostWidgetInformation
                {
                    Id = request.PostId,
                    Description= request.Description,
                    Image = request.Image,
                },
                WidgetId = key
            }));
            return Ok();
        }

        [HttpPost]
        [EnableQuery]
        [ODataRoute("InstagramVideos")]
        public IActionResult GetInstagramVideos([FromBody] GetVideoJobRequest request)
        {
            var requestDto = new GetVideoByJobRequest
            {
                Data = request.Data,
                Type = request.Type
            };
            if (Request.Query.TryGetValue("widgetId", out var widgetId))
            {
                requestDto.WidgetId = widgetId;
            }
            var response = _unitOfWork.Instagram.GetVideoJob(requestDto);
            return Ok(response);
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
        public async Task<IActionResult> SetInstagramClicks([FromODataUri] string key, [FromBody] SetClickPostRequest request)
        {
            await Task.Run(() => _mediator.Publish(new InstagramClicksCommand
            {
                Time = DateTime.UtcNow,
                PostWidgetInformation = new PostWidgetInformation
                {
                    Id = request.PostId,
                    Description = request.Description,
                    Image = request.Image,
                },
                WidgetId = key
            }));
            return Ok();
        }
    }
}
