using System;
using System.Collections.Generic;

namespace TiktokWidget.Service.Dtos.Responses.Shops
{
    public class AnalyzeWidgetResponse
    {
        public Analytics Analytics { get; set; }
        public IEnumerable<PerformanceViewModel> Impression { get; set; }

        public AnalyzeWidgetResponse()
        {
            Analytics = new Analytics();
            Impression = new List<PerformanceViewModel>();  
        }
    }

    public class Analytics
    {
        public ItemAnalytic Impression { get; set; }
        public ItemAnalytic Clicks { get; set; }
        public ConversationRate ConversationRate { get; set; }
        public Analytics()
        {
            Clicks = new ItemAnalytic();
            Impression = new ItemAnalytic();
            ConversationRate = new ConversationRate();
        }
        public Analytics(long impression, long clicks)
        {
            Impression = new ItemAnalytic(impression);
            Clicks = new ItemAnalytic(clicks);
            var conversationRate = clicks / impression;
            ConversationRate = new ConversationRate(conversationRate);
        }

        public void SetAnlysisImpression(long valueLast)
        {
            if(valueLast == 0)
            {
                if (Impression.Value == 0) Impression.AnalysisIndicator = 0;
                else Impression.AnalysisIndicator = -1;
            }
            else
            {
                Impression.AnalysisIndicator = (valueLast - Impression.Value) / Impression.Value;
            }
        }
        public void SetAnlysisClicks(long valueLast)
        {
            if (valueLast == 0)
            {
                if (Impression.Value == 0) Impression.AnalysisIndicator = 0;
                else Impression.AnalysisIndicator = -1;
            }
            else
            {
                Clicks.AnalysisIndicator = (valueLast - Clicks.Value) / Clicks.Value;
            }
        }
        public void SetAnlysisConversationRate(long impressionLast, long clicksLast)
        {
            var conversationRateLast = clicksLast / impressionLast;
            if (conversationRateLast == 0)
            {
                if (ConversationRate.Value == 0) ConversationRate.AnalysisIndicator = 0;
                else ConversationRate.AnalysisIndicator = -1;
            }
            else
            {
                ConversationRate.AnalysisIndicator = (conversationRateLast - ConversationRate.Value) / ConversationRate.Value;
            }
        }
    }

    public class PerformanceViewModel
    {
        public DateTime Time { get; set; }
        public long Impression { get; set; }
        public long Clicks { get; set; }
    }
    public class ItemAnalytic
    {
        public long Value { get; set; }
        public double AnalysisIndicator { get; set; }
        public ItemAnalytic()
        {
            Value = 0;
            AnalysisIndicator = 0;
        }
        public ItemAnalytic(long value)
        {
            Value = value;
        }
    }
    public class ConversationRate
    {
        public double Value { get; set; }
        public double AnalysisIndicator { get; set; }
        public ConversationRate()
        {
            Value = 0;
            AnalysisIndicator = 0;
        }
        public ConversationRate(double value)
        {
            Value = value;
        }
    }
}
