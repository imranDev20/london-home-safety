import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function CategoryServiceDetails({
  service,
  index,
}: {
  service: NavLeafItem;
  index: number;
}) {
  const DotIcon = () => (
    <span className="w-5 h-5 flex justify-center items-center bg-secondary/20 rounded-full">
      <span className="w-2 h-2 bg-secondary inline-block rounded-full" />
    </span>
  );
  return (
    <div
      className={`flex ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } mt-16 gap-8`}
    >
      <Image
        width={500}
        className="rounded-2xl"
        src={backgroundImage}
        alt="serviceImage"
        loading="lazy"
      />
      <div>
        <h2 className="text-3xl font-semibold mb-4 mt-2">{service.label}</h2>
        <p className=" leading-loose text-body mb-3">
          {service.detailedDesc?.details}
        </p>

        {service.detailedDesc?.points.map((point) => (
          <div className="flex items-center" key={point}>
            {" "}
            <DotIcon />
            <span className="ml-3 leading-loose text-lg">{point}</span>{" "}
          </div>
        ))}

        <Link href={`/services${service.categoryPath}${service.path}`}>
          <Button className="bg-white shadow-none  font-bold mt-4 text-blue-700 hover:bg-primary/20">
            Learn More
            <HiOutlineArrowRight className="text-xl ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
