using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace BlogServicesShared
{
    public class BaseEntity : IBaseEntity
    {
        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("modifiedAt")]
        public DateTime? ModifiedAt { get; set; }

        [JsonProperty("id")]
        public Guid Id { get; set; }

        public BaseEntity()
        {
            CreatedAt = DateTime.Now;
            Id = Guid.NewGuid();
        }
    }
}
