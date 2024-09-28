"use client";
import { Button } from "@/components/ui/button";
import AboutImage1 from "@/images/electrician-2.jpg";
import AboutImage3 from "@/images/electrician-3.jpg";
import AboutImage2 from "@/images/happy-family.jpg";
import TrustPilot from "@/images/trustpilot.jpeg";
import { SiteSettingWithRelations } from "@/types/misc";

import Image from "next/image";
import Link from "next/link";
import { HiPhone } from "react-icons/hi";

const categories = [
  { text: "Highly skilled and certified experts." },
  {
    text: "Wide range of electrical, gas, fire, and health safety services.",
  },
  {
    text: "Top-quality service prioritizing safety and satisfaction.",
  },
  {
    text: "Deep understanding of London's local needs and regulations.",
  },
  {
    text: "Trusted by homeowners for reliability and professionalism.",
  },
];

const DotIcon = () => (
  <span className="w-5 h-5 flex justify-center items-center bg-secondary/20 rounded-full">
    <span className="w-2 h-2 bg-secondary inline-block rounded-full" />
  </span>
);

export default function AboutUsHome({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  return (
    <section className="bg-gradient-to-t from-blue-50 to-white py-36 overflow-hidden">
      <div className="container max-w-screen-xl grid grid-cols-12 lg:px-16 lg:gap-20">
        <div className="col-span-12 lg:col-span-6 flex items-center gap-3 min-h-[500px] relative">
          <div className="relative flex-1 h-5/6 rounded-xl overflow-hidden shadow-lg group">
            <Image
              src={AboutImage1}
              alt="Large Image"
              fill
              loading="lazy"
              quality={20}
              placeholder="blur"
              className="w-full h-full transition-transform duration-300 group-hover:scale-110"
              style={{
                objectFit: "cover",
                objectPosition: "80% 30%",
              }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-3 h-full">
            <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg group">
              <Image
                src={AboutImage2}
                alt="Small Image 1"
                fill
                loading="lazy"
                quality={20}
                placeholder="blur"
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  objectFit: "cover",
                  objectPosition: "10% 20%",
                }}
              />
            </div>

            <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg group">
              <Image
                src={AboutImage3}
                alt="Small Image 2"
                fill
                loading="lazy"
                quality={20}
                placeholder="blur"
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="absolute bg-white p-5 rounded-lg shadow-md left-1/2 -translate-x-1/2 top-1/2 transform -translate-y-1/2">
            <Image
              src={TrustPilot}
              alt="London Home Safety Trustpilot Rating"
              width={150}
              height={150}
              loading="lazy"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <h2 className="mb-8 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Get to Know
            <span className="text-primary block mt-2">London Home Safety</span>
          </h2>

          <p className="text-body leading-loose">
            At London Home Safety Limited, we are dedicated to safeguarding
            homes across London with our premier safety solutions. With years of
            experience and a team of certified professionals, we provide
            reliable and comprehensive services to ensure the safety and
            well-being of your home. Our commitment to excellence and customer
            satisfaction sets us apart as the trusted choice for home safety in
            London.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            {categories.map((cat) => (
              <div className="flex items-center" key={cat.text}>
                <DotIcon />
                <span className="ml-3 leading-relaxed text-lg">{cat.text}</span>
              </div>
            ))}
          </div>

          <hr className="my-8" />

          <div className="flex flex-col lg:flex-row items-center gap-7">
            <Button
              className="bg-primary hover:bg-secondary hover:text-black py-6 text-md"
              size="lg"
              asChild
            >
              <Link href="/about">More About Us</Link>
            </Button>
            <div className="flex items-center">
              <HiPhone className="text-4xl text-body mr-2 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-sm text-body">Call Us Anytime</p>
                <a href={`tel:${siteSettings?.phone1 || ""}`}>
                  <p className="text-xl font-semibold text-body-dark hover:underline">
                    {siteSettings?.phone1 || "No phone number available"}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
