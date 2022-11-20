using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
                //No change value
                if (Impression.Value == 0)
                {
                    Impression.AnalysisIndicator = 0;
                }
                //Value down
                else
                {
                    Impression.Status = StatusAnalystics.Down;
                    Impression.AnalysisIndicator = 1;
                }
            }
            else
            {
                //Value down
                if(valueLast > Impression.Value)
                {
                    Impression.AnalysisIndicator = ((double)valueLast - Impression.Value) / (double)valueLast;
                    Impression.Status = StatusAnalystics.Down;
                }
                //Value up
                else if(valueLast < Impression.Value)
                {
                    Impression.Status = StatusAnalystics.Up;
                    Impression.AnalysisIndicator = ((double)Impression.Value - valueLast) / (double)valueLast;
                }
                else
                {
                    Impression.Status = StatusAnalystics.NoChange;
                    Impression.AnalysisIndicator = 0;
                }
            }
        }
        public void SetAnlysisClicks(long valueLast)
        {
            if (valueLast == 0)
            {
                //No change value
                if (Clicks.Value == 0)
                {
                    Clicks.AnalysisIndicator = 0;
                }
                //Value down
                else
                {
                    Clicks.Status = StatusAnalystics.Down;
                    Clicks.AnalysisIndicator = 1;
                }
            }
            else
            {
                //Value down
                if (valueLast > Clicks.Value)
                {
                    Clicks.AnalysisIndicator = (double)(valueLast - Clicks.Value) / (double)valueLast;
                    Clicks.Status = StatusAnalystics.Down;
                }
                //Value up
                else if (valueLast < Clicks.Value)
                {
                    Clicks.Status = StatusAnalystics.Up;
                    Clicks.AnalysisIndicator = ((double)Clicks.Value - valueLast) / (double)valueLast;
                }
                else
                {
                    Clicks.Status = StatusAnalystics.NoChange;
                    Clicks.AnalysisIndicator = 0;
                }
            }
        }
        public void SetAnlysisConversationRate(long impressionLast, long clicksLast)
        {
            var conversationRateLast = clicksLast / impressionLast;
            if (conversationRateLast == 0)
            {
                //No change value
                if (ConversationRate.Value == 0)
                {
                    ConversationRate.AnalysisIndicator = 0;
                }
                //Value down
                else
                {
                    ConversationRate.Status = StatusAnalystics.Down;
                    ConversationRate.AnalysisIndicator = 1;
                }
            }
            else
            {
                //Value down
                if (conversationRateLast > ConversationRate.Value)
                {
                    ConversationRate.AnalysisIndicator = ((double)conversationRateLast - ConversationRate.Value) / (double)conversationRateLast;
                    ConversationRate.Status = StatusAnalystics.Down;
                }
                //Value up
                else if (conversationRateLast < ConversationRate.Value)
                {
                    ConversationRate.Status = StatusAnalystics.Up;
                    ConversationRate.AnalysisIndicator = ((double)ConversationRate.Value - conversationRateLast) / (double)conversationRateLast;
                }
                else
                {
                    ConversationRate.Status = StatusAnalystics.NoChange;
                    ConversationRate.AnalysisIndicator = 0;
                }
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
        public StatusAnalystics Status { get; set; }
        public ItemAnalytic()
        {
            Value = 0;
            AnalysisIndicator = 0;
            Status = StatusAnalystics.NoChange;
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
        public StatusAnalystics Status { get; set; }
        public ConversationRate()
        {
            Value = 0;
            AnalysisIndicator = 0;
            Status = StatusAnalystics.NoChange;
        }
        public ConversationRate(double value)
        {
            Value = value;
        }
    }

    public enum StatusAnalystics
    {
        Up,
        Down,
        NoChange
    }
}
