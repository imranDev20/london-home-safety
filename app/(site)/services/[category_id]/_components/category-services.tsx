import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import Image from "next/image";

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
        <div className="grid grid-cols-3 gap-6">
          {services.map((item) => (
            <div key={item.path}>
              <div className=" h-[480px]  bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt="itemImage"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <hr className="my-6  " />
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm leading-tight">
                        Starts <br />
                        From
                      </span>
                      <span className="text-blue-600 text-3xl ml-4 font-bold">
                        £180
                      </span>
                    </div>
                    <button className="mt-4 bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-black hover:text-white  ">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
