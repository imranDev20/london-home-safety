import React from "react";
import BookNow from "@/app/_components/book-now";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative flex items-center py-28 lg:py-0 min-h-[600px] sm:min-h-[800px] lg:min-h-screen -mt-[65px]">
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={20}
        priority
      />

      <div className="absolute inset-0 bg-[rgba(6,44,100,0.85)] mix-blend-multiply"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 z-10 relative max-w-screen-xl px-4 sm:px-8 lg:px-16">
        <div className="col-span-1 lg:col-span-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-relaxed mb-4 text-white">
            Safeguarding London&apos;s
            <span className="text-secondary"> Homes </span>
            with Premier <span className="text-secondary">Safety</span>{" "}
            Solutions
          </h1>

          <p className="text-white text-base sm:text-lg lg:text-xl font-normal mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl">
            Welcome to London Home Safety Limited, your trusted partner for
            comprehensive safety solutions in the heart of London. With years of
            experience and a team of certified professionals, we provide
            top-notch services to ensure the safety and well-being of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="tel:+020 8146 6698" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-secondary hover:bg-primary text-black font-medium text-sm sm:text-base lg:text-lg flex items-center justify-center hover:text-white py-3 sm:py-4 lg:py-6 transition-all duration-300"
              >
                <FaPhoneAlt className="mr-2 text-sm sm:text-base lg:text-lg" />
                020 8146 6698
              </Button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="default"
                className="w-full border-white text-body-dark hover:text-white bg-white hover:bg-primary font-medium text-sm sm:text-base lg:text-lg flex items-center justify-center py-3 sm:py-4 lg:py-6 transition-all duration-300"
              >
                <FaShieldAlt className="mr-2 text-sm sm:text-base lg:text-lg" />
                Our Services
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 mt-8 lg:mt-0">
          <BookNow />
        </div>
      </div>
    </section>
  );
}
