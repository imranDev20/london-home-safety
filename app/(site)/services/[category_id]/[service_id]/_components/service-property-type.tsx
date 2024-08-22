import { Button } from "@/components/ui/button";
import { ALL_SERVICES } from "@/shared/data";

export default function ServicePropertyType({
  categoryId,
  serviceId,
}: {
  categoryId: string;
  serviceId: string;
}) {
  const currentService = ALL_SERVICES.find((service) =>
    service.path.includes(serviceId)
  );

  const propertyTypePriceDetails = currentService?.pricingDetails;

  function simplifyPrices(
    unit: string,
    prices: { unitCount: string | number; price: number }[]
  ) {
    const priceMap = new Map();

    prices.forEach((price) => {
      const priceKey = price.price;

      if (!priceMap.has(priceKey)) {
        priceMap.set(priceKey, []);
      }

      priceMap.get(priceKey).push(price.unitCount);
    });

    const simplifiedPrices = Array.from(priceMap).map(([price, units]) => {
      if (units.length === 1 && units[0] === "Studio Flat") {
        return { unitRange: "Studio Flat", price };
      }

      const minUnit = Math.min(
        ...units.filter((unit: string | number) => typeof unit === "number")
      );
      const maxUnit = Math.max(
        ...units.filter((unit: string | number) => typeof unit === "number")
      );
      const unitRange = `${minUnit}-${maxUnit} ${unit}s`;
      return { unitRange, price };
    });

    return simplifiedPrices;
  }

  return (
    <div className="bg-sky-50 pb-16">
      <h1 className="text-3xl font-bold text-center pt-16 mb-10">
        Pricing for Every Home and Business
      </h1>
      <div className="flex max-w-5xl mx-auto bg-white p-10 text-center shadow-lg rounded-2xl">
        {propertyTypePriceDetails &&
          propertyTypePriceDetails.map((item, index) => {
            const simplifiedPricesArray = simplifyPrices(
              item.unit,
              item.prices
            );
            return (
              <div key={item.type} className=" ">
                <h2 className="text-3xl font-bold mb-2">
                  {item.type} {currentService.abbr || currentService.label}
                </h2>
                <p className="font-semibold text-gray-500">
                  Ensure your home&apos;s electrical installations are safe and
                  compliant.
                </p>
                <Button className="bg-yellow-400 my-4 text-black font-bold hover:bg-black hover:text-white">
                  Book Now
                </Button>
                <hr />
                <h3 className="text-xl font-bold mt-6">
                  Pricing Based on Number of {item.unit}s
                </h3>
                <p className="text-sm text-gray-500">
                  {" "}
                  <span className="text-red-600 mb-1">*</span>Prices are all tax
                  inclusive
                </p>

                <div className="mt-6 text-xl ">
                  {simplifiedPricesArray.map((priceDetail) => (
                    <p className="mt-4" key={priceDetail.unitRange}>
                      {priceDetail.unitRange}{" "}
                      <span className="ml-2 text-blue-600 font-semibold">
                        £{priceDetail.price}
                      </span>{" "}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
