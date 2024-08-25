import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import ContactAddress from "./_components/contact-address";
import ContactForm from "./_components/contact-form";
import ContactMap from "./_components/contact-map";
const breadCrumbOptions = [
  {
    label: "Contact us",
    isCurrentPage: true,
  },
];
export default function Contact() {
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ContactAddress />
      <ContactForm />
      <ContactMap />
    </div>
  );
}
