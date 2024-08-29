import ContactUsForm from "@/app/_components/contact-us-form";
import { Button } from "@/components/ui/button";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="bg-slate-200 py-12 md:py-24">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 md:mb-16">
        Get in Touch with London&apos;s Home Safety Experts
      </h2>
      <div className="grid grid-cols-12 max-w-7xl mx-auto gap-y-8 md:gap-y-0">
        {/* Image Section */}
        <div className="col-span-12 md:col-span-3">
          <Image
            className="h-full w-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            src={ContactUsImage}
            alt="ContactUsImage"
            loading="lazy"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Working Hours Section */}
        <div className="col-span-12 md:col-span-4 p-6 bg-white pl-6 rounded-b-xl md:rounded-none">
          <h2 className="text-lg font-semibold mb-6">Working Hours:</h2>
          <ul className="space-y-7">
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
          <div className="mt-6 flex items-center space-x-2">
            <span className="text-primary font-medium">Need Help?</span>
            <Link href="tel:+020 8146 6698">
              <Button className="bg-white text-black shadow-none hover:bg-white font-semibold hover:underline">
                020 8146 6698
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Us Form Section */}
        <div className="col-span-12 md:col-span-5">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}
