import ContactUsForm from "@/app/_components/common/contact-us-form";
import { Button } from "@/components/ui/button";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="bg-slate-200 py-12 sm:py-16 md:py-24">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 md:mb-16 px-4">
        Get in Touch with London&apos;s Home Safety Experts
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
            {[
              { day: "Monday", time: "09:00 - 17:00" },
              { day: "Tuesday", time: "09:00 - 17:00" },
              { day: "Wednesday", time: "09:00 - 17:00" },
              { day: "Thursday", time: "09:00 - 17:00" },
              { day: "Friday", time: "09:00 - 17:00" },
              { day: "Saturday", time: "09:00 - 17:00" },
              { day: "Sunday", time: "09:00 - 17:00" },
            ].map((item) => (
              <li
                key={item.day}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-medium">{item.day}:</span>
                <span className="text-body">{item.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <span className="text-primary font-medium">Need Help?</span>
            <Link href="tel:+020 8146 6698">
              <Button className="bg-white text-black shadow-none hover:bg-white font-semibold hover:underline">
                020 8146 6698
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="bg-blue-600 h-full p-8">
            <h2 className="text-white text-center text-4xl font-bold mb-8">
              Contact Us
            </h2>
            <ContactUsForm
              formClass="space-y-6"
              inputClass="bg-white border-yellow-400 text-black placeholder-black"
              buttonClass="bg-secondary text-black  font-bold hover:bg-secondary/40"
              textareaClass="bg-white border-secondary text-black"
              errorTextClass="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
