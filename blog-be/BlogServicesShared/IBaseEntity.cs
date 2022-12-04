using System;

namespace BlogServicesShared
{
    public interface IBaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public Guid Id { get; set; }
    }
}
