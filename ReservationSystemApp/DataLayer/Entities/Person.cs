using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer.Entities
{
    public class Person
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public Contacts Contacts { get; set; }
    }
}
