"use client";

import React from "react";
import LhsLogo from "@/components/icons/lhs-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NON_INVERTED_ROUTES } from "@/lib/constants";
import { NAV_ITEMS } from "@/shared/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarCheck, FaChevronDown } from "react-icons/fa6";
import CartDrawer from "./cart-drawer";
import Hamburger from "./hamburger";
import LhsLogoBlack from "@/images/icons/lhs-logo-black";

export default function Header() {
  const pathname = usePathname();

  const isTransparent = !NON_INVERTED_ROUTES.some((route) =>
    pathname.startsWith(`/${route}`)
  );

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    if (path === "/services") {
      return pathname.startsWith("/services");
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`${
          isTransparent ? "bg-transparent" : "bg-white"
        } top-0 left-0 w-full z-50 transition-all duration-300  ${
          isTransparent ? "text-white" : "text-black"
        }`}
      >
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 flex justify-between items-center py-3 md:py-0">
          <div className="block md:hidden relative z-20 w-12">
            <Hamburger />
          </div>

          <Link href="/" className="py-4 relative z-20">
            {isTransparent ? <LhsLogo /> : <LhsLogoBlack />}
          </Link>

          <div className="hidden md:flex items-center relative z-20">
            <nav>
              <ul className="flex gap-3 md:gap-5 lg:gap-7">
                {NAV_ITEMS.map((navItem) => {
                  if (navItem.path === "/services") {
                    return (
                      <li key={navItem.path} className="group relative">
                        <Link
                          href={navItem.path}
                          className={`py-5 px-3 block w-full font-medium ${
                            isActive(navItem.path)
                              ? isTransparent
                                ? "text-secondary"
                                : "text-primary"
                              : isTransparent
                              ? "hover:text-secondary text-white"
                              : "hover:text-primary text-body-dark"
                          } flex items-center`}
                        >
                          {navItem.label}
                          <FaChevronDown className="ml-1 text-xs" />
                        </Link>

                        <div className="hidden group-hover:block absolute left-0 -translate-x-1/2 w-[90vw] max-w-6xl bg-white shadow-lg z-5 rounded-lg">
                          <div className="container py-8 px-4 md:px-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                              {navItem.children?.map((category) => (
                                <div key={category.path} className="space-y-4">
                                  <h3 className="text-lg font-semibold text-primary">
                                    <Link href={`/services${category.path}`}>
                                      {category.label}
                                    </Link>
                                  </h3>
                                  {category.children && (
                                    <ul className="space-y-2">
                                      {category.children.map((subItem) => {
                                        console.log();
                                        return (
                                          <li key={subItem.path}>
                                            <Link
                                              href={`/services${category.path}${subItem.path}`}
                                              className={`text-sm text-body-dark hover:text-primary ${
                                                isActive(
                                                  `/services${category.path}${subItem.path}`
                                                )
                                                  ? "text-primary"
                                                  : ""
                                              }`}
                                            >
                                              {subItem.label}{" "}
                                              {subItem.abbr
                                                ? `(${subItem.abbr})`
                                                : ""}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={navItem.label}>
                      <Link
                        href={navItem.path}
                        className={`py-5 inline-block px-3 font-medium ${
                          isActive(navItem.path)
                            ? isTransparent
                              ? "text-secondary"
                              : "text-primary"
                            : isTransparent
                            ? "hover:text-secondary text-white"
                            : "hover:text-primary text-body-dark"
                        }`}
                      >
                        {navItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="ml-4 md:ml-8 lg:ml-16 flex items-center gap-3 md:gap-4 lg:gap-7">
              <Link href="/book-now" className="hidden md:block">
                <Button
                  className={`py-2 md:py-3 lg:py-5 text-sm md:text-base bg-secondary hover:bg-body-dark text-body-dark hover:text-white flex items-center`}
                >
                  <FaCalendarCheck className="mr-2" />
                  Book Now
                </Button>
              </Link>

              <div className="hidden md:block">
                <CartDrawer />
              </div>
            </div>
          </div>

          <div className="block md:hidden relative z-20">
            <CartDrawer />
          </div>
        </div>
      </header>

      {!isTransparent && <Separator />}
    </>
  );
}
