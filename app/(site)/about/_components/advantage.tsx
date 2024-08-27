import EngineerIcon from "@/components/icons/engineer";
import { Card } from "@/components/ui/card";
import { ADVANTAGES } from "@/shared/data";
export default function Advantage() {
  return (
    <section className="bg-[#EAF3FB] py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 pt-10">
          Why Choose London Home Safety Limited
        </h2>
        <p className="text-center text-gray-500 mb-14 leading-relaxed md:text-md max-w-[918px] mx-auto">
          We pride ourselves on delivering exceptional service and unparalleled
          expertise. Our certified professionals, competitive pricing, rapid
          response times, and flexible scheduling make us the trusted choice for
          all your home safety needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt">
          {ADVANTAGES?.map((advantage) => (
            <Card
              key={advantage.id}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <advantage.Icon width={50} height={50} className="fill-primary mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">
               {
                advantage.advantageName
               }
              </h3>
              <p className="text-body">{advantage.advantageDetail}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
