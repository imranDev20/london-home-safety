import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import Image from "next/image";

export default function AboutCta() {
  return (
    <div className="relative  py-16 flex items-center justify-center bg-blue-800">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
        loading="lazy"
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          How Can We Help You?
        </h1>
        <p className="text-lg md:text-xl mb-8 w-2/3 mx-auto my-10">
          London Home Safety collaborates with vetted professionals who are
          registered with official UK bodies. Our tradespeople are highly
          skilled and experienced in their respective fields. We value customer
          feedback to ensure the best hassle-free experience for you.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className=" bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-300 font-bold hover:text-black">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
