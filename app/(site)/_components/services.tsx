import { ALL_SERVICES } from "@/shared/data";
import ServiceCard from "./service-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Services() {
  return (
    <section className="py-16 sm:py-20 bg-section-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-16">
        <h2 className="text-center mb-8 sm:mb-10 text-2xl sm:text-3xl lg:text-4xl font-bold">
          Discover Our Wide Range of Safety Solutions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ALL_SERVICES.slice(0, 5).map((item) => (
            <ServiceCard
              key={item.label}
              title={item.label}
              Icon={item.Icon}
              price={79.99}
              className="h-full"
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <Button
            className="bg-primary hover:bg-secondary hover:text-black py-4 sm:py-6 text-base sm:text-lg"
            size="lg"
            asChild
          >
            <Link href="/book-now">See All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
