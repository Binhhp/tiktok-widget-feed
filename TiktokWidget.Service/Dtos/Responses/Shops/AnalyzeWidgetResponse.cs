using System;
using System.Collections.Generic;

namespace TiktokWidget.Service.Dtos.Responses.Shops
{
    public class AnalyzeWidgetResponse
    {
        public Analytics Analytics { get; set; }
        public IEnumerable<PerformanceViewModel> Impression { get; set; }
    }

    public class Analytics
    {
        public ItemAnalytic Impression { get; set; }
        public ItemAnalytic Clicks { get; set; }
        public ConversationRate ConversationRate { get; set; }
        public Analytics(long impression, long clicks)
        {
            Impression = new ItemAnalytic(impression);
            Clicks = new ItemAnalytic(clicks);
            var conversationRate = (double)clicks / (double)impression;
            ConversationRate = new ConversationRate(conversationRate);
        }

        public void SetAnlysisImpression(long valueLast)
        {
            this.Impression.AnalysisIndicator = (double)(this.Impression.Value - valueLast) / (double)valueLast;
        }
        public void SetAnlysisClicks(long valueLast)
        {
            this.Clicks.AnalysisIndicator = (double)(this.Clicks.Value - valueLast) / (double)valueLast;
        }
        public void SetAnlysisConversationRate(long impressionLast, long clicksLast)
        {
            var conversationRate = (double)clicksLast / (double)impressionLast;
            this.ConversationRate.AnalysisIndicator = (double)(this.ConversationRate.Value - conversationRate) / conversationRate;
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
        public ItemAnalytic(long value)
        {
            Value = value;
        }
    }
    public class ConversationRate
    {
        public double Value { get; set; }
        public double AnalysisIndicator { get; set; }
        public ConversationRate(double value)
        {
            Value = value;
        }
    }
}
