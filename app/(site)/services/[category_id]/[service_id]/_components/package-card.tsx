"use client";

import { Card } from "@/components/ui/card";
import usePackageStore from "@/hooks/use-package-store";
import useQueryString from "@/hooks/use-query-string";
import { Package, PropertyType } from "@prisma/client";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PackageCard({ pack }: { pack: Package }) {
  const { selectedPackage, setPackage } = usePackageStore();

  return (
    <Card
      key={pack.id}
      className="overflow-hidden border-2 transition-all duration-200 hover:border-primary"
    >
      <label
        htmlFor={pack.id}
        className="flex items-center cursor-pointer p-5 transition-all duration-200 ease-in-out hover:bg-gray-50"
      >
        <input
          type="radio"
          name="packageOption"
          value={pack.id}
          checked={selectedPackage?.id === pack.id}
          id={pack.id}
          className="sr-only peer"
          onChange={() => {
            setPackage(pack);
          }}
        />
        <div className="w-6 h-6 border-2 border-primary rounded-full mr-4 flex items-center justify-center peer-checked:bg-primary transition-all duration-200">
          <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="flex-grow">
          <p className="text-lg font-semibold text-gray-900">{pack.name}</p>
          <p className="text-sm text-gray-600 mt-1">
            {pack?.description ?? "Standard package description"}
          </p>
        </div>
        <div className="text-xl font-bold text-primary ml-4">£{pack.price}</div>
      </label>
    </Card>
  );
}
