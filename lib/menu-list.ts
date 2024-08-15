import {
  Users,
  LayoutGrid,
  Package2,
  Network,
  ShoppingCart,
  Award,
  Blocks,
  PackagePlus,
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
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/admin" || pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Some group",
      menus: [
        {
          href: "/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/services",
          label: "Services",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/engineers",
          label: "Engineers",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Others",
      menus: [
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}
