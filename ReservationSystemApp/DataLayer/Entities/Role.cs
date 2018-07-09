﻿using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; }

        public List<User> Users { get; set; }
    }
}
