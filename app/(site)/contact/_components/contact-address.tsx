import { CONTACT } from "@/shared/data";
import { Contact } from "@/types/contact";
import ContactDetails from "./contact-details";

export default function ContactAddress() {
  

  return (
    <div className="  bg-blue-50 py-20  ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-">
        {CONTACT.map((contact) => (
         <ContactDetails key={contact.id} item={contact} />
        ))}
      </div>
    </div>
  );
}
