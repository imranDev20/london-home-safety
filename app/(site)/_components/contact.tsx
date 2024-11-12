import ContactUsForm from "@/app/_components/common/contact-us-form";
import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import { Button } from "@/components/ui/button";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";
import { SiteSettingWithRelations } from "@/types/misc";
import Image from "next/image";
import Link from "next/link";

export default async function Contact({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  const siteSettingTime = await getSettings();

  return (
    <div className="bg-slate-200 py-12 sm:py-16 md:py-24" id="contact">
      <h2 className="mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight text-center">
        Get in Touch with
        <span className="text-primary block mt-2">
          London&apos;s Home Safety Experts
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto px-4">
        <div className="md:col-span-3 h-64 md:h-auto">
          <Image
            className="w-full h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none object-cover"
            src={ContactUsImage}
            alt="ContactUsImage"
            loading="lazy"
          />
        </div>
        <div className="md:col-span-4 p-6 bg-white">
          <h2 className="text-lg font-semibold mb-6">Working Hours:</h2>
          <ul className="space-y-4 sm:space-y-7">
            {siteSettingTime?.openingDateTime?.map((item) => (
              <li
                key={item.dayOfWeek}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-medium">{item.dayOfWeek}:</span>
                <span className="text-body">{`${item.openingTime}-${item.closingTime}`}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <span className="text-primary font-medium">Need Help?</span>
            <a href={`tel:${siteSettings?.phone1 || ""}`}>
              <Button className="bg-white text-black shadow-none hover:bg-white font-semibold hover:underline">
                {siteSettings?.phone1 || "No phone number available"}
              </Button>
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-primary h-full p-8">
            <h2 className="text-white text-center text-4xl font-bold mb-8">
              Contact Us
            </h2>
            <ContactUsForm
              formClass="space-y-6"
              inputClass="bg-white border-yellow-400 text-black placeholder-black"
              buttonClass="bg-secondary text-black  font-bold hover:bg-secondary/40"
              textareaClass="bg-white border-secondary text-black"
              errorTextClass="text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
