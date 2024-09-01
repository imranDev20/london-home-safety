import ContactUsForm from "@/app/_components/common/contact-us-form";
import { SOCIALS } from "@/shared/data";
import SocialIcon from "./social-icon";
export default function ContactSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/5">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Have Questions? We&lsquo;re Here to Help!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions about our services or need assistance,
            don&apos;t hesitate to reach out. Our team is here to help you.
          </p>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <SocialIcon key={social.id} item={social} />
            ))}
          </div>
        </div>

        <div className="lg:w-3/5">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}
