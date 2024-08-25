import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/hero-image-new.jpeg";
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

export default function AboutUsHome() {
  return (
    <section className="container max-w-screen-xl mx-auto grid grid-cols-12 gap-20 my-20 px-16">
      <div className="col-span-12 lg:col-span-6 flex items-center gap-3 max-h-[500px]">
        <div className="relative flex-1 h-5/6">
          <Image
            src={BackgroundImage}
            alt="Large Image"
            fill
            loading="lazy"
            className="rounded-xl w-full h-full"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 h-full">
          <div className="flex-1 relative">
            <Image
              src={BackgroundImage}
              alt="Small Image 1"
              fill
              loading="lazy"
              className="rounded-xl w-full h-full"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div className="flex-1 relative">
            <Image
              src={BackgroundImage}
              alt="Small Image 2"
              fill
              loading="lazy"
              className="rounded-xl w-full h-full"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="absolute">
          <p className="text-lg font-medium">TrustPilot</p>
        </div>
      </div>

      <div className="col-span-6">
        <h2 className="text-4xl font-bold mb-7 leading-normal">
          About London Home Safety Limited
        </h2>

        <p className="text-body leading-loose">
          At London Home Safety Limited, we are dedicated to safeguarding homes
          across London with our premier safety solutions. With years of
          experience and a team of certified professionals, we provide reliable
          and comprehensive services to ensure the safety and well-being of your
          home. Our commitment to excellence and customer satisfaction sets us
          apart as the trusted choice for home safety in London.
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

        <div className="flex items-center gap-7">
          <Button
            className="bg-primary hover:bg-secondary hover:text-black py-6 text-md"
            size="lg"
            asChild
          >
            <Link href="/about">More About Us</Link>
          </Button>
          <div className="flex items-center">
            <HiPhone className="text-4xl text-body mr-2" />
            <div>
              <p className="text-sm text-body">Call Us Anytime</p>
              <Link href="tel:+020 8146 6698">
                <p className="text-xl font-semibold text-body-dark hover:underline">
                  020 8146 6698
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
