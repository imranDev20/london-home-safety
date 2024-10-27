import {
  Users,
  LayoutGrid,
  Package2,
  Network,
  ShoppingCart,
  Award,
  Blocks,
  PackagePlus,
  Users2,
  Plug,
  HardHat,
  Cog,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Management",
      menus: [
        {
          href: "/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/customers",
          label: "Customers",
          active: pathname.includes("/customers"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/packages",
          label: "Packages",
          active: pathname.includes("/packages"),
          icon: Plug,
          submenus: [],
        },
        {
          href: "/engineers",
          label: "Engineers",
          active: pathname.includes("/engineers"),
          icon: HardHat,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Configuration",
      menus: [
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Cog,
          submenus: [],
        },
      ],
    },
  ];
}
