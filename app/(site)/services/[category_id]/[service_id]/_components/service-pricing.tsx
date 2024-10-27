"use client";

import React from "react";
import { Package, PropertyType } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { Home, Building, Users, BanknoteIcon, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface PricingCardProps {
  propertyType: PropertyType;
  packages: Package[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  propertyType,
  packages,
}) => {
  const controls = useAnimation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }, true);

  React.useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getIcon = () => {
    switch (propertyType) {
      case "RESIDENTIAL":
        return <Home className="w-6 h-6 mr-2" />;
      case "COMMERCIAL":
        return <Building className="w-6 h-6 mr-2" />;
      case "HMO":
        return <Users className="w-6 h-6 mr-2" />;
      case "COMMUNAL_AREA":
        return <BanknoteIcon className="w-6 h-6 mr-2" />;
      case "BUSINESS_SECTOR":
        return <Building className="w-6 h-6 mr-2" />;
      default:
        return <HelpCircle className="w-6 h-6 mr-2" />;
    }
  };

  const getTitle = () => {
    if (propertyType === "NOT_APPLICABLE") {
      return packages[0].serviceName;
    }
    return propertyType.replace("_", " ");
  };

  const getDescription = () => {
    switch (propertyType) {
      case "RESIDENTIAL":
        return "Safe living spaces for you and your loved ones";
      case "COMMERCIAL":
        return "Secure environments for your business to thrive";
      case "HMO":
        return "Comprehensive safety for houses in multiple occupation";
      case "COMMUNAL_AREA":
        return "Ensuring safety in shared living spaces";
      case "BUSINESS_SECTOR":
        return "Tailored solutions for your business premises";
      default:
        return "Safety solutions for all property types";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className={cn(
        "bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full",
        propertyType === "NOT_APPLICABLE" ? "mx-auto max-w-xl w-full" : ""
      )}
    >
      <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          {getIcon()}
          {getTitle()}
        </h3>
        <p className="mt-2 text-blue-100">{getDescription()}</p>
      </div>
      <div className="p-6 flex-grow">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className={`flex justify-between items-center py-4 gap-5 ${
              index !== 0 ? "border-t border-gray-200" : ""
            }`}
          >
            <div>
              <h4 className="font-semibold text-gray-800">{pkg.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                £{pkg.price}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600 mt-auto">
        All prices include VAT
      </div>
    </motion.div>
  );
};

interface ServicePricingSectionProps {
  packages: Package[];
}

const ServicePricingSection: React.FC<ServicePricingSectionProps> = ({
  packages,
}) => {
  const controls = useAnimation();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 }, true);

  React.useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (packages.length === 0) {
    return null;
  }

  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.propertyType]) {
      acc[pkg.propertyType] = [];
    }
    acc[pkg.propertyType].push(pkg);
    return acc;
  }, {} as Record<PropertyType, Package[]>);

  const propertyTypes = Object.keys(groupedPackages) as PropertyType[];

  const getGridColumns = () => {
    switch (propertyTypes.length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "md:grid-cols-2";
      default:
        return "md:grid-cols-3";
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Explore Our
            <span className="text-primary block mt-2 relative">
              Pricing Options
              <svg
                className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
                viewBox="0 0 200 9"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the package that best suits your needs. Our pricing is
            straightforward and competitive, ensuring you get the best value for
            your safety investment.
          </p>
        </motion.div>
        <div className={`grid ${getGridColumns()} gap-8`}>
          {propertyTypes.map((propertyType) => (
            <PricingCard
              key={propertyType}
              propertyType={propertyType}
              packages={groupedPackages[propertyType]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePricingSection;
