import { CONTACT } from "@/shared/data";
import ContactDetails from "./contact-details";

export default function ContactAddress() {
  return (
    <div className="bg-blue-50 py-12 md:py-20">
      <div className="max-w-6xl px-5 justify-center items-center gap-10  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CONTACT.map((contact) => (
          <ContactDetails key={contact.id} item={contact} />
        ))}
      </div>
    </div>
  );
}
