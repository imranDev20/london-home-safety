import { Package, PropertyType } from "@prisma/client";
import { create } from "zustand";

type CartItem = {
  id: string;
  package: Package;
  quantity: number;
  price: number;
};

interface PackageState {
  selectedPackage: CartItem | null;
  propertyType: PropertyType;
  setPackage: (item: CartItem | null) => void;
  setPropertyType: (type: PropertyType) => void;
  reset: () => void;
}

const usePackageStore = create<PackageState>((set) => ({
  selectedPackage: null,
  propertyType: "RESIDENTIAL",
  setPackage: (pack) => set({ selectedPackage: pack }),
  setPropertyType: (type) => set({ propertyType: type }),
  reset: () => set({ selectedPackage: null, propertyType: "RESIDENTIAL" }),
}));

export default usePackageStore;
