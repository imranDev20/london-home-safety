import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }: { service: NavLeafItem }) {
  const { description, image, path, label, categoryPath } = service;

  return (
    <Card className="relative bg-blue-50 rounded-lg shadow-lg  w-96">
      <Image
        src={image}
        alt="Electrical Repairs"
        className="w-full h-60 object-cover rounded-t-lg"
        loading="lazy"
      />
      <div className="absolute inset-x-0 -bottom-28 mx-4 p-6 bg-sky-50 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold   mb-2">{label}</h3>
        <p className="text-body mb-4">{description}</p>
        <Link href={`/services${categoryPath}${path}`}>
          <Button className="bg-primary text-white font-bold w-[80%]  mt-6  rounded hover:bg-secondary hover:text-black transition">
            Learn More
          </Button>
        </Link>
      </div>
    </Card>
  );
}
