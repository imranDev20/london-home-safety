"use client";

import React, { useEffect, useRef, useState } from "react";
import { Package, PropertyType } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { Check, Home, Building } from "lucide-react";

interface PricingCardProps {
  propertyType: PropertyType;
  packages: Package[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  propertyType,
  packages,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center">
          {propertyType === "RESIDENTIAL" ? (
            <>
              <Home className="w-6 h-6 mr-2" />
              Residential
            </>
          ) : (
            <>
              <Building className="w-6 h-6 mr-2" />
              Commercial
            </>
          )}
        </h3>
        <p className="mt-2 text-blue-100">
          {propertyType === "RESIDENTIAL"
            ? "Safe living spaces for you and your loved ones"
            : "Secure environments for your business to thrive"}
        </p>
      </div>
      <div className="p-6 flex-grow">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className={`flex justify-between items-center py-4 ${
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
              <p className="text-sm text-gray-500">per service</p>
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
  residentialPackages: Package[];
  commercialPackages: Package[];
}

const ServicePricingSection: React.FC<ServicePricingSectionProps> = ({
  residentialPackages,
  commercialPackages,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const featureVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
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
        <div className="grid md:grid-cols-2 gap-8">
          <PricingCard
            propertyType="RESIDENTIAL"
            packages={residentialPackages}
          />
          <PricingCard
            propertyType="COMMERCIAL"
            packages={commercialPackages}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicePricingSection;
