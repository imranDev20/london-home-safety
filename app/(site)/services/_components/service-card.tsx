import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
export default function ServiceCard({ service }: { service: NavLeafItem }) {
  const { description, image, path, label, categoryPath } = service;

  return (
    <Card className="relative bg-blue-50 rounded-lg shadow-lg  w-96">
      <Image
        src={image}
        alt="Electrical Repairs"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="absolute inset-x-0 -bottom-28 mx-4 p-6 bg-sky-50 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{label}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button className="bg-blue-500 text-white font-bold w-[80%]  mt-6  rounded hover:bg-yellow-500 hover:text-black transition">
          Learn More
        </Button>
      </div>
    </Card>
  );
}
