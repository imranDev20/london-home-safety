"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NAV_ITEMS } from "@/shared/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarCheck } from "react-icons/fa6";
import CartDrawer from "./cart-drawer";

export default function Header() {
  const pathname = usePathname();

  const nonInvertedRoutes = [""];
  const isTransparent = !nonInvertedRoutes.some((route) =>
    new RegExp(`^${route.replace(/\[.*?\]/g, "[^/]+")}$`).test(pathname)
  );

  return (
    <>
      <header
        className={`${
          isTransparent ? "bg-transparent" : "bg-white"
        } top-0 left-0 w-full z-50 transition-all duration-300  ${
          isTransparent ? "text-white" : "text-black"
        }`}
      >
        <div className="container mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 flex justify-between items-center py-2 md:py-0">
          <div className="text-lg font-medium test-white relative z-20">
            LOGO
          </div>

          <div className="flex items-center relative z-20">
            <nav className="hidden md:block">
              <ul className="flex gap-3 md:gap-5 lg:gap-7">
                {NAV_ITEMS.map((navItem) => {
                  const isActive = pathname === navItem.path;

                  if (navItem.path === "/services") {
                    return (
                      <li key={navItem.path} className="group/first relative">
                        <Link
                          href={navItem.path}
                          className={`py-5 px-3 block w-full font-medium ${
                            isActive
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

                        <ul
                          className={`hidden group-hover/first:block absolute ${
                            isTransparent ? "bg-white" : "bg-white"
                          } shadow-lg rounded-md z-20 top-full left-1/2 -translate-x-1/2 min-w-56`}
                        >
                          {navItem.children?.map((navFChild) => (
                            <li
                              key={navFChild.path}
                              className="group/second relative px-5 py-1 last-of-type:pb-3 hover:bg-gray-100 over"
                            >
                              <Link
                                href={`/services${navFChild.path}`}
                                className="block py-1 text-body-dark hover:text-primary font-medium"
                              >
                                {navFChild.label}
                              </Link>

                              <ul className="hidden group-hover/second:block absolute top-0 left-[98%] bg-white z-20 min-w-72 shadow-lg rounded-md">
                                {navFChild.children?.map((navSChild) => (
                                  <li
                                    key={navSChild.path}
                                    className="px-5 py-1 last-of-type:pb-3"
                                  >
                                    <Link
                                      href={`/services${navFChild.path}${navSChild.path}`}
                                      className="py-1 block text-body-dark hover:text-primary font-medium"
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
                        className={`py-5 inline-block px-3 font-medium ${
                          isActive
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
              <Link href="/book-now">
                <Button
                  className={`py-2 md:py-3 lg:py-5 text-sm md:text-base bg-secondary hover:bg-body-dark text-body-dark hover:text-white flex items-center`}
                >
                  <FaCalendarCheck className="mr-2" />
                  Book Now
                </Button>
              </Link>

              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      {!isTransparent && <Separator />}
    </>
  );
}
