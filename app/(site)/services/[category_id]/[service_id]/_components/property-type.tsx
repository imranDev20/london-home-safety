"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building,
  Users,
  Hotel,
  Warehouse,
  Briefcase,
} from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PropertyButtonProps {
  type: string;
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

interface PropertyTypeCompoProps {
  propertyType?: string;
  availableTypes: string[];
}

export default function PropertyTypeCompo({
  propertyType: initialPropertyType,
  availableTypes,
}: PropertyTypeCompoProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getDefaultPropertyType = () => {
    if (initialPropertyType && availableTypes.includes(initialPropertyType)) {
      return initialPropertyType;
    }
    if (availableTypes.includes("RESIDENTIAL")) {
      return "RESIDENTIAL";
    }
    if (availableTypes.includes("HMO")) {
      return "HMO";
    }
    return availableTypes[0];
  };

  const [selectedType, setSelectedType] = useState(getDefaultPropertyType());

  const propertyTypes = [
    { type: "RESIDENTIAL", icon: Home, label: "Residential" },
    { type: "COMMERCIAL", icon: Building, label: "Commercial" },
    { type: "HMO", icon: Hotel, label: "HMOs" },
    { type: "RENTAL_HOME", icon: Home, label: "Rental Homes" },
    { type: "COMMUNAL_AREA", icon: Users, label: "Communal Area" },
    { type: "BUSINESS_SECTOR", icon: Briefcase, label: "Business Sectors" },
    { type: "WAREHOUSE", icon: Warehouse, label: "Warehouse" },
  ];

  const filteredTypes = propertyTypes.filter((type) =>
    availableTypes.includes(type.type)
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("property_type", selectedType);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedType, pathname, router, searchParams]);

  if (filteredTypes.length === 0 || availableTypes.includes("NOT_APPLICABLE")) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {filteredTypes.map((property) => (
        <PropertyButton
          key={property.type}
          type={property.type}
          icon={property.icon}
          label={property.label}
          onClick={() => setSelectedType(property.type)}
          isActive={selectedType === property.type}
        />
      ))}
    </div>
  );
}
