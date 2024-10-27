import { Package, PropertyType } from "@prisma/client";
import { create } from "zustand";

interface PackageState {
  selectedPackage: Package | null;
  propertyType: PropertyType;
  setPackage: (pack: Package | null) => void;
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
