using DataLayer.Entities;

namespace Services.Models
{
    public class ContactModel
    {
        public string ContactValue { get; set; }

        public ContactType ContactType { get; set; }

        public ContactModel(Contact contact)
        {
            if (contact != null)
            {
                ContactValue = contact.ContactValue;
                ContactType = contact.ContactType;
            }
        }

        public ContactModel() {}
    }
}
