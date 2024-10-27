import { Button } from "@/components/ui/button";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

const DotIcon = () => (
  <span
    className="w-5 h-5 flex justify-center items-center bg-secondary/20 rounded-full"
    aria-hidden="true"
  >
    <span className="w-2 h-2 bg-secondary inline-block rounded-full" />
  </span>
);

export default function CategoryServiceDetails({
  service,
  index,
}: {
  service: NavLeafItem;
  index: number;
}) {
  return (
    <article
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 items-center`}
    >
      <div className="w-full md:w-1/2">
        <Image
          width={500}
          height={300}
          className="rounded-2xl w-full h-96 object-cover"
          src={service.image || "/images/placeholder-service.jpg"}
          alt={`Illustration of ${service.label} service`}
          loading="lazy"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-semibold mb-4 mt-2">{service.label}</h2>
        <p className="leading-loose text-body mb-3">
          {service.detailedDesc?.details}
        </p>

        {service.detailedDesc?.points &&
          service.detailedDesc.points.length > 0 && (
            <ul className="space-y-2 mb-4">
              {service.detailedDesc.points.map((point, pointIndex) => (
                <li className="flex items-center" key={pointIndex}>
                  <DotIcon />
                  <span className="ml-3 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          )}

        <Link href={`/services${service.categoryPath}${service.path}`} passHref>
          <Button
            variant="ghost"
            className="font-bold mt-4 text-primary hover:text-primary hover:bg-primary/20 group transition-all duration-300 ease-in-out"
          >
            Learn More
            <HiOutlineArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
