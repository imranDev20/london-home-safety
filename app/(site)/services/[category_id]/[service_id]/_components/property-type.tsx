"use client";

import { Button } from "@/components/ui/button";
import { PropertyType } from "@prisma/client";
import { Building, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface PropertyButtonProps {
  type: PropertyType;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const PropertyButton: React.FC<PropertyButtonProps> = ({
  type,
  icon: Icon,
  label,
  onClick,
  isActive,
}) => (
  <Button
    variant="outline"
    className={`flex-1 py-6 flex flex-col items-center justify-center border-2 transition-all duration-200 h-auto ${
      isActive
        ? "bg-primary/10 border-primary"
        : "hover:bg-primary/10 hover:border-primary"
    }`}
    onClick={onClick}
  >
    <div>
      <Icon className="w-8 h-8 mb-2" />
    </div>
    <span>{label}</span>
  </Button>
);

export default function PropertyTypeCompo({
  propertyType,
}: {
  propertyType?: PropertyType;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const propertyTypes: {
    type: PropertyType;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
  }[] = [
    { type: "RESIDENTIAL", icon: Home, label: "Residential" },
    { type: "COMMERCIAL", icon: Building, label: "Commercial" },
  ];

  return (
    <div className="flex space-x-4">
      {propertyTypes.map((property) => (
        <PropertyButton
          key={property.type}
          type={property.type}
          icon={property.icon}
          label={property.label}
          onClick={() => {
            router.push(`${pathname}?property_type=${property.type}`, {
              scroll: false,
            });
          }}
          isActive={
            propertyType === property.type ||
            (propertyType === undefined && property.type === "RESIDENTIAL")
          }
        />
      ))}
    </div>
  );
}
