"use client";

import React from "react";
import { motion } from "framer-motion";
import LondonMap from "./london-map";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import PostcodeSearch from "./postcode-search";

interface Address {
  street: string;
  city: string;
  postcode: string;
  district: string;
  country: string;
}

interface ServiceabilityStatus {
  isServiceable: boolean;
  isChecking: boolean;
}

export default function CoverageAreas() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(
    null
  );
  const [selectedServiceability, setSelectedServiceability] =
    React.useState<ServiceabilityStatus | null>(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.0,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddressSelect = (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => {
    setSelectedAddress(address);
    setSelectedServiceability(serviceability);

    console.log(address);
  };

  const renderAddressItem = (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => (
    <>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full",
          serviceability.isChecking
            ? "bg-muted"
            : serviceability.isServiceable
            ? "bg-green-100"
            : "bg-red-100"
        )}
      >
        {serviceability.isChecking ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : serviceability.isServiceable ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{address.street}</span>
        <span className="text-sm text-muted-foreground">
          {address.city}, {address.postcode}
        </span>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center mb-8 sm:mb-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Coverage Area
          <span className="text-primary block mt-2 relative">
            Greater London
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
        </motion.h2>

        <motion.p
          className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We provide comprehensive safety services throughout Greater London,
          ensuring your property&apos;s safety across all 32 boroughs and the
          City of London.
        </motion.p>

        <div className="max-w-xl mx-auto mb-12">
          <PostcodeSearch
            onAddressSelect={handleAddressSelect}
            renderAddressItem={renderAddressItem}
            commandGroupHeading="Coverage Check"
          />

          {selectedServiceability && (
            <Alert
              variant={
                selectedServiceability.isChecking
                  ? "default"
                  : selectedServiceability.isServiceable
                  ? "default"
                  : "destructive"
              }
              className={cn(
                "mt-4",
                selectedServiceability.isServiceable &&
                  !selectedServiceability.isChecking &&
                  "bg-green-50 text-green-900 border-green-200"
              )}
            >
              <div className="flex items-center gap-2">
                {selectedServiceability.isChecking ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertDescription>
                      Checking service availability...
                    </AlertDescription>
                  </>
                ) : selectedServiceability.isServiceable ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-900">
                      Great news! We provide services in{" "}
                      {selectedAddress?.district}.
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      We apologize, but we currently don&apos;t provide services
                      in {selectedAddress?.district}. We only operate in select
                      London boroughs.
                    </AlertDescription>
                  </>
                )}
              </div>
            </Alert>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <LondonMap
            activeDistrict={selectedAddress?.district?.toLowerCase()}
          />
        </div>
      </div>
    </section>
  );
}
