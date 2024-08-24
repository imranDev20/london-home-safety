import EicrOutlinedIcon from "@/images/icons/eicr-outlined.svg";
import FireAlarmBellOutlinedIcon from "@/images/icons/fire-alarm-bell.svg";
import GasOutlinedIcon from "@/images/icons/gas-outlined.svg";
import HealthHeartOutlinedIcon from "@/images/icons/health-heart-outlined.svg";
import ServiceCategoryCard from "./service-category-card";

const services = [
  {
    id: 1,
    serviceName: "Electrical Services",
    serviceDetail:
      "Ensure your home's electrical systems are safe and efficient with our expert services.",
    column: 6,
    Icon: EicrOutlinedIcon,
  },

  {
    id: 2,
    serviceName: "Gas Services",
    serviceDetail:
      "Keep your home warm and secure with our reliable gas safety solutions.",
    column: 6,
    Icon: GasOutlinedIcon,
  },
  {
    id: 3,
    serviceName: "Fire Services",
    serviceDetail:
      "Protect your property and loved ones with our advanced fire safety measures.",
    column: 6,
    Icon: FireAlarmBellOutlinedIcon,
  },

  {
    id: 4,
    serviceName: "Health & Safety",
    serviceDetail:
      "Maintain a safe and healthy living environment with our comprehensive safety solutions.",
    column: 6,
    Icon: HealthHeartOutlinedIcon,
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-section-background">
      <div className="container mx-auto max-w-screen-xl px-16">
        <h2 className=" text-center mb-10 text-4xl font-bold ">
          Discover Our Wide Range of Safety Solutions
        </h2>
        <div className="grid md:grid-cols-2 gap-4  ">
          {services.map((service) => (
            <ServiceCategoryCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
