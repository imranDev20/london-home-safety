import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import Image from "next/image";
import Link from "next/link";

export default function CategoryServices({
  categoryId: category,
}: {
  categoryId: string;
}) {
  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );
  return (
    <div className="bg-sky-50 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Expert {kebabCaseToNormalText(category)} for Peace of Mind
        </h1>
        <div className="grid grid-cols-3  gap-6">
          {services.map((item) => (
            <Card key={item.path}>
              <div className=" bg-white rounded-xl   overflow-hidden">
                <Image
                  src={item.image}
                  alt="itemImage"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />

                <div className="p-6 h-44 ">
                  <Link href={`/services${item.categoryPath}${item.path}`}>
                    <h4 className="text-xl font-semibold mb-4 hover:text-primary">
                      {item.label}
                    </h4>
                  </Link>
                  <p className="text-body  ">{item.description}</p>
                </div>
                <hr className="  " />
                <div className="flex justify-between items-center  px-6 py-6  ">
                  <div className="flex items-center">
                    <p className="text-sm inline-block  leading-none">
                      Starts <br /> From
                    </p>
                    <span className="text-blue-600 text-3xl ml-4 font-bold">
                      £180
                    </span>
                  </div>
                  <Link href={`/book-now`}>
                    <Button className="bg-secondary text-black font-semibold py-2 px-4 rounded hover:bg-black hover:text-white  ">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
