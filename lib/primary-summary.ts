// utils/priceSummary.ts
interface Package {
    id: string;
    price: number;
  }
  
  interface PriceSummaryInput {
    selectedPackages: { packageId: string; quantity?: number }[];
    packages: Package[];
    isCongestionZone: boolean;
    parkingOptions: string;
  }
  
  interface PriceSummaryOutput {
    subtotal: number;
    congestionCharge: number;
    parkingCharge: number;
    total: number;
  }
  
  export const calculatePriceSummary = ({
    selectedPackages,
    packages,
    isCongestionZone,
    parkingOptions,
  }: PriceSummaryInput): PriceSummaryOutput => {
    const subtotal = selectedPackages.reduce((total, pkg) => {
      const selectedPackage = packages.find((p) => p.id === pkg.packageId);
      return total + (selectedPackage?.price || 0);
    }, 0);
  
    const congestionCharge = isCongestionZone ? 5 : 0;
    const parkingCharge = parkingOptions !== "FREE" ? 5 : 0;
    const total = subtotal + congestionCharge + parkingCharge;
  
    return { subtotal, congestionCharge, parkingCharge, total };
  };
  