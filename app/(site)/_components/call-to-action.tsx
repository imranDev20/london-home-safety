import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-[rgba(32,106,178,0.8)]"></div>

      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h2 className="text-2xl md:text-6xl font-bold mb-4 leading-loose">
          Take the First Step Towards <br /> Safety
        </h2>
        <p className="text-base md:text-xl mb-8 mx-auto my-10">
          Book your desired service today and experience the peace of mind that
          comes with a safe and secure home. Visit our services page to find out
          more and schedule an appointment.
        </p>

        <div className="flex gap-4 justify-center items-center max-w-16 mx-auto">
          <Button className="bg-black text-white px-6 rounded-md hover:bg-yellow-400 font-semibold hover:text-black text-lg py-6 flex-1">
            Book Now
          </Button>
          <Link href="tel:+020 8146 6698">
            <Button className="bg-white text-black px-6 rounded-md hover:bg-yellow-400 font-semibold text-lg py-6 flex-1">
              Call Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
// rgba(32, 106, 178, 0.8)
