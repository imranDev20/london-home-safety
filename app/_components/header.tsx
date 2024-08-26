import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa6";
import CartDrawer from "./cart-drawer";
import { NAV_ITEMS } from "@/shared/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto max-w-screen-xl px-16 flex justify-between items-center">
        <div>LoGo</div>

        <div className="flex items-center relative z-20">
          <div>
            <ul className="flex gap-7">
              {NAV_ITEMS.map((navItem) => {
                if (navItem.path === "/services") {
                  return (
                    <li key={navItem.path} className="group/first relative">
                      <Link
                        href={navItem.path}
                        className="py-5 block w-full hover:text-primary"
                      >
                        {navItem.label}
                      </Link>

                      <ul className="hidden group-hover/first:block absolute bg-white shadow-md rounded-md z-20 top-full left-1/2 -translate-x-1/2 min-w-56">
                        {navItem.children?.map((navFChild) => (
                          <li
                            key={navFChild.path}
                            className="group/second relative px-5 py-1 last-of-type:pb-3"
                          >
                            <Link
                              href={`/services${navFChild.path}`}
                              className="block py-1 hover:text-primary"
                            >
                              {navFChild.label}
                            </Link>

                            <ul className="hidden group-hover/second:block absolute top-0 left-[98%] bg-white z-20 min-w-72 shadow-md rounded-md">
                              {navFChild.children?.map((navSChild) => (
                                <li
                                  key={navSChild.path}
                                  className="px-5 py-1 last-of-type:pb-3"
                                >
                                  <Link
                                    href={`/services${navFChild.path}${navSChild.path}`}
                                    className="py-1 block hover:text-primary"
                                  >
                                    {navSChild.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={navItem.label}>
                    <Link
                      href={navItem.path}
                      className="py-5 inline-block hover:text-primary"
                    >
                      {navItem.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ml-16 flex items-center gap-7">
            <Link href="/book-now">
              <Button className="py-5 text-base bg-secondary hover:bg-black  text-black hover:text-white flex items-center">
                <FaCalendarCheck className="mr-2" />
                Book Now
              </Button>
            </Link>

            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
