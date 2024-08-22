import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-blue-600">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        loading="lazy"
        className="opacity-30"
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Take the First Step Towards <br /> Safety
        </h1>
        <p className="text-lg md:text-xl mb-8 w-2/3 mx-auto my-10">
          Book your desired service today and experience the peace of mind that
          comes with a safe and secure home. Visit our services page to find out
          more and schedule an appointment.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-black text-white px-6 py-3 rounded-md hover:bg-yellow-400 font-semibold hover:text-black">
            Book Now
          </Button>
          <Button className="bg-white text-black px-6 py-3 rounded-md hover:bg-yellow-400 font-semibold">
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
}
