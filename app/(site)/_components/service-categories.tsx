import { NAV_ITEMS } from "@/shared/data";
import ServiceCategoryCard from "./service-category-card";

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-section-background">
      <div className="container mx-auto max-w-screen-xl px-16">
        <h2 className=" text-center mb-10 text-4xl font-bold ">
          Discover Our Wide Range of Safety Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-4  ">
          {NAV_ITEMS.find((item) => item.label === "Services")?.children?.map(
            (service) => (
              <ServiceCategoryCard key={service.path} service={service} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
