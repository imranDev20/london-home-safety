import { ALL_SERVICES } from "@/shared/data";
import ServiceCard from "./service-card";
export default function ServiceItems() {
  return (
    <div className="max-w-6xl mx-auto mt-20 mb-44">
      <h1 className="text-4xl font-extrabold text-center">
        Comprehensive Safety Services for Your Home
      </h1>
      <div className="grid items-center justify-center px-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-36 gap-x-40  mt-10">
        {ALL_SERVICES.map((service) => (
          <ServiceCard key={service.path} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
}
