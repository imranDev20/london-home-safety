import { PropertyType } from "@prisma/client";

export type ChildrenProp = {
  children: React.ReactNode;
};

export type NavItem = {
  label: string;
  path: string;
  children?: NavItem[];
  abbr?: string;
  Icon?: any;
  image?: StaticImageData;
  description?: string;
  detailedDesc?: {
    details: string;
    points: string[];
  };

  pricingDetails?: {
    type: string;
    unit: string;

    description: string;
    prices: {
      unitCount: string | number;
      price: number;
    }[];

    packages?: {
      name: string;
      price: number;
      propertyType?: PropertyType;
    }[];
  }[];

  pageContent?: {
    title: string;
    html: string;
  };

  faqs?: {
    ques: string;
    ans: string;
  }[];
};

export type NavLeafItem = Omit<NavItem, "children"> & {
  categoryPath?: string;
};
