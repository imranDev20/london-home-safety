import BookNow from "@/components/common/book-now";
import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import {} from "@radix-ui/react-icons";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        style={{ objectFit: "cover" }}
        quality={20}
      />

      <div className="container mx-auto grid grid-cols-12 my-auto gap-5 z-10 relative max-w-screen-xl">
        <div className="col-span-8">
          <h1 className=" text-5xl font-bold leading-relaxed  mb-4">
            Safeguarding London&apos;s
            <span className="text-secondary"> Homes </span>
            with Premier{" "}
            <span className="text-secondary">Safety Solutions</span>
          </h1>

          <Button className="bg-secondary text-black font-medium text-lg">
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
