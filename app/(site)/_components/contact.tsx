import ContactUsForm from "@/components/common/contact-us-form";
import ContactUsImage from "@/images/home/home-contact-image.jpeg";
import Image from "next/image";

export default function Contact() {
  return (
    <div className=" bg-slate-200 py-24 ">
      <h1 className="text-center text-4xl font-bold mb-16">
        Get in Touch with London&apos;s Home Safety Experts
      </h1>
      <div className=" flex max-w-7xl mx-auto  ">
        <Image
          className="w-[33%] h-[550px] rounded-l-xl"
          src={ContactUsImage}
          alt="ContactUsImage"
        />
        <div className="p-6 w-96  bg-white  pl-6 ">
          <h2 className="text-lg font-semibold mb-6">Working Hours:</h2>
          <ul className="space-y-7  ">
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
                <span className="text-gray-600">{item.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center space-x-2">
            <span className="text-blue-600 font-medium">Need Help?</span>
            <span className="text-gray-800 font-semibold">020 8146 6698</span>
          </div>
        </div>
        <div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}
