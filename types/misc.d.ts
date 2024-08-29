import { PropertyType } from "@prisma/client";
import { OrderWithRelation } from "./order";

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
    type: PropertyType;
    unit: string;

    description: string;

    packages?: {
      id: string;
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

export type SendEmailToEngineerData = {
  subject: string;
  content: string;
  receiver: string;
  orderDetails:  OrderWithRelation | null;
};