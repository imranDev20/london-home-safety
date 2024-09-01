import BookNow from "@/app/_components/book-now";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative flex items-center py-10 lg:py-0 min-h-[1000px] lg:min-h-screen -mt-[65px] ">
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={20}
        loading="eager"
      />

      <div className="absolute inset-0 bg-[rgba(6,44,100,0.9)] mix-blend-multiply"></div>

      <div className="container mx-auto grid grid-cols-12 gap-10 z-10 relative max-w-screen-xl px-4 sm:px-8 lg:px-16">
        <div className="col-span-12 lg:col-span-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight lg:leading-relaxed mb-4 text-white">
            Safeguarding London&apos;s
            <span className="text-secondary"> Homes </span>
            with Premier <span className="text-secondary">Safety</span>{" "}
            Solutions
          </h1>

          <p className="text-white text-lg sm:text-xl font-normal mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
            Welcome to London Home Safety Limited, your trusted partner for
            comprehensive safety solutions in the heart of London. With years of
            experience and a team of certified professionals, we provide
            top-notch services to ensure the safety and well-being of your home.
          </p>

          <Link href="tel:+020 8146 6698">
            <Button
              size="lg"
              className="bg-secondary hover:bg-white text-black font-medium text-base sm:text-lg flex items-center py-4 sm:py-5 lg:py-6"
            >
              <FaPhoneAlt className="mr-2 text-base sm:text-lg" />
              020 8146 6698
            </Button>
          </Link>
        </div>

        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <BookNow />
        </div>
      </div>
    </section>
  );
}

{
  /* <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={20}
        loading="eager"
      /> */
}
