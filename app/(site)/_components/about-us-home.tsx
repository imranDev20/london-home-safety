import Image from "next/image";

import { Button } from "@/components/ui/button";
// import { PhoneIcon } from "@radix-ui/react-icons";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Link from "next/link";
// import { PHONE_NO } from "@/shared/constants";

const categories = [
  { text: "Our team is made up of highly skilled and certified experts." },
  {
    text: "We offer a wide range of services in electrical, gas, fire, and health and safety.",
  },
  {
    text: "We prioritize your safety and satisfaction with top-quality service.",
  },
  {
    text: "Serving the heart of London with a deep understanding of local needs and regulations.",
  },
  {
    text: "Trusted by homeowners across London for our reliability and professionalism.",
  },
];

const DotIcon = () => (
  <span className="flex justify-center items-center bg-opacity-30 bg-secondary-500 w-4 h-4 p-0.5 rounded-full">
    <span className="bg-secondary-500 w-2 h-2 rounded-full" />
  </span>
);

export default function AboutUsHome() {
  return (
    <div className="my-15 px-4 md:px-8 my-20 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-5 lg:gap-10">
        <div className="col-span-12 md:col-span-7 relative">
          <div className="flex justify-center    ">
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="row-span-2 w-72 h-96 rounded-lg overflow-hidden mt-3">
                <Image
                  src={BackgroundImage}
                  alt="Large Image"
                  width={384}
                  height={384}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-48 h-48 rounded-lg overflow-hidden">
                <Image
                  src={BackgroundImage}
                  alt="Small Image 1"
                  width={192}
                  height={192}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-48 h-48 rounded-lg overflow-hidden">
                <Image
                  src={BackgroundImage}
                  alt="Small Image 2"
                  width={192}
                  height={192}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-white px-8 py-10   ">
                  <p className="text-lg font-medium">TrustPilot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h2 className="text-4xl font-bold mb-2">
            About London Home Safety Limited
          </h2>
          <p className="text-neutral-600 my-3 leading-relaxed">
            At London Home Safety Limited, we are dedicated to safeguarding
            homes across London with our premier safety solutions. With years of
            experience and a team of certified professionals, we provide
            reliable and comprehensive services to ensure the safety and
            well-being of your home. Our commitment to excellence and customer
            satisfaction sets us apart as the trusted choice for home safety in
            London.
          </p>
          <div className="flex flex-col gap-2 my-4">
            {categories.map((cat) => (
              <div className="flex items-center" key={cat.text}>
                <DotIcon />
                <span className="ml-1">{cat.text}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex items-center mt-3 gap-4">
            <Button className="bg-blue-700 hover:bg-blue-700" size="lg" asChild>
              <Link href="/about">More About Us</Link>
            </Button>
            <div className="flex items-center">
              {/* <PhoneIcon className="mr-1 text-4xl" /> */}
              <div>
                <p className="text-sm">Call Us Anytime</p>
                <p className="text-xl font-bold">020 8146 6698</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
