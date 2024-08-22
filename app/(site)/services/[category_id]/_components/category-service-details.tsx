import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";

export default function CategoryServiceDetails({
  service,
  index,
}: {
  service: NavLeafItem;
  index: number;
}) {
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
      />
      <div>
        <h2 className="text-2xl font-bold mb-4 mt-2">{service.label}</h2>
        <p className="  text-gray-500 mb-3">{service.detailedDesc?.details}</p>
        {service.detailedDesc?.points.map((point) => (
          <div key={point}>
            {" "}
            <p className="text-lg">{point}</p>{" "}
          </div>
        ))}
        <Button className="bg-white shadow-none  font-bold mt-6 text-blue-700 hover:bg-blue-300">
          Learn More
        </Button>
      </div>
    </div>
  );
}
