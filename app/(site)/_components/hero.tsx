import BookNow from "@/components/common/book-now";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import {} from "@radix-ui/react-icons";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[rgba(6,44,100,0.98)] h-screen">
      <Image
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        loading="lazy"
        placeholder="blur"
        objectFit="cover"
        className="opacity-20"
      />

      <div className="max-w-6xl mx-auto flex">
        <div className="relative px-4 pt-40  w-[70%]  ">
          <div className="text-white  ">
            <h1 className=" text-5xl font-bold leading-relaxed  mb-4">
              Safeguarding London&apos;s
              <span className="text-yellow-500"> Homes </span>
              with Premier{" "}
              <span className="text-yellow-500">Safety Solutions</span>
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Welcome to London Home Safety Limited, your trusted partner for
              comprehensive safety solutions in the heart of London. With years
              of experience and a team of certified professionals, we provide
              top-notch services to ensure the safety and well-being of your
              home.
            </p>

            {/* <PhoneIcon className="w-6 h-6 text-yellow-500 mr-2" /> */}
            <Button className="bg-yellow-500 text-black font-semibold text-lg">
              020 8146 6698
            </Button>
          </div>
        </div>
        <div className="w-[30%] mt-44">
          <BookNow />
        </div>
      </div>
    </section>
  );
}
