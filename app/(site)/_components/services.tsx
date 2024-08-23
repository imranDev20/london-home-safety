import { ALL_SERVICES } from "@/shared/data";
import ServiceCard from "./service-card";

export default function Services() {
  return (
    <section className="py-20 bg-section-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-10 text-3xl sm:text-4xl font-bold">
          Discover Our Wide Range of Safety Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
          {ALL_SERVICES.map((item) => (
            <ServiceCard
              key={item.label}
              title={item.label}
              price={79.99}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
