import ContactAddress from "./_components/contact-address";
import ContactForm from "./_components/contact-form";
import ContactMap from "./_components/contact-map";
import ContactPageHeader from "./_components/contact-page-header";

export default function Contact() {
  return (
    <div>
      <ContactPageHeader />
      <ContactAddress />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
