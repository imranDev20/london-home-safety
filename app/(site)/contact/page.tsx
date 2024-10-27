import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/bg-image-2.jpg";
import AnimatedSection from "./_components/animated-section";
import ContactForm from "./_components/contact-form";
import ContactInfo from "./_components/contact-info";
import ContactMap from "./_components/contact-map";

const breadCrumbOptions = [
  {
    label: "Contact us",
    isCurrentPage: true,
  },
];

export default async function Contact() {
  const siteSettings = await getSettings();
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <AnimatedSection className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gray-900 leading-tight">
            Get in Touch
            <span className="text-primary block mt-2">
              We&apos;re Here to Help
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo siteSettings={siteSettings} />
            <ContactForm />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Find Us on the Map
          </h2>
          <ContactMap />
        </div>
      </AnimatedSection>
    </>
  );
}
