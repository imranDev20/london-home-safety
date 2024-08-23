import BookNow from "@/app/_components/book-now";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={20}
        loading="eager"
      />

      <div className="absolute inset-0 bg-[rgba(6,44,100,0.9)] mix-blend-multiply"></div>

      <div className="container mx-auto grid grid-cols-12 my-auto gap-10 z-10 relative max-w-screen-xl px-16">
        <div className="col-span-8">
          <h1 className="text-5xl font-bold leading-relaxed mb-4 text-white">
            Safeguarding London&apos;s
            <span className="text-secondary"> Homes </span>
            with Premier <span className="text-secondary">Safety</span>{" "}
            Solutions
          </h1>

          <p className="text-white text-xl font-normal mb-10 leading-relaxed">
            Welcome to London Home Safety Limited, your trusted partner for
            comprehensive safety solutions in the heart of London. With years of
            experience and a team of certified professionals, we provide
            top-notch services to ensure the safety and well-being of your home.
          </p>

          <Button
            size="lg"
            className="bg-secondary hover:bg-white text-black font-medium text-lg flex items-center py-6"
          >
            <FaPhoneAlt className="mr-2 text-lg" />
            020 8146 6698
          </Button>
        </div>

        <div className="col-span-4">
          <BookNow />
        </div>
      </div>
    </section>
  );
}
