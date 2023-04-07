using System.Text.Json.Serialization;

namespace TiktokWidget.Service.ViewModels
{
    public abstract class BaseViewModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("index")]
        public int Index { get; set; }
    }
}
