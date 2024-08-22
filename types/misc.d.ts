export type ChildrenProp = {
  children: React.ReactNode;
};

export type NavItem = {
  label: string;
  path: string;
  children?: NavItem[];
  abbr?: string;
  Icon?: typeof SvgIcon;
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
