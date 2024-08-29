"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa6";
import CartDrawer from "./cart-drawer";
import { NAV_ITEMS } from "@/shared/data";
import { AlignJustify, X } from "lucide-react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;

      setIsVisible(isScrollingUp || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      {/* Mobile header - scrollable */}
      <header
        className={`md:hidden bg-white fixed top-0 left-0 w-[100vw] z-50 shadow-md transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="md:container mx-auto px-4 py-2 flex justify-between items-center w-full">
          <div className="text-lg font-semibold">LoGo</div>
          <button
            className="text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <AlignJustify />}
          </button>
        </div>
      </header>

      {/* Desktop header */}
      <header
        className={`bg-white fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden md:block ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${prevScrollPos > 0 ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto max-w-full px-4 md:px-8 lg:px-16 flex justify-between items-center">
          <div className="text-lg font-semibold">LoGo</div>

          <div className="flex items-center relative z-20">
            <nav>
              <ul className="flex gap-3 md:gap-5 lg:gap-7">
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
            </nav>

            <div className="ml-4 md:ml-8 lg:ml-16 flex items-center gap-3 md:gap-4 lg:gap-7">
              <Link href="/book-now">
                <Button className="py-2 md:py-3 lg:py-5 text-sm md:text-base bg-secondary hover:bg-black text-black hover:text-white flex items-center">
                  <FaCalendarCheck className="mr-2" />
                  Book Now
                </Button>
              </Link>

              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white fixed top-[48px] left-0 w-[100vw] h-[calc(100vh-48px)] overflow-y-auto z-40">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {NAV_ITEMS.map((navItem) => (
                <li key={navItem.path}>
                  <Link
                    href={navItem.path}
                    className="block py-2 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/book-now" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full py-2 text-sm bg-secondary hover:bg-black text-black hover:text-white flex items-center justify-center">
                <FaCalendarCheck className="mr-2" />
                Book Now
              </Button>
            </Link>
            <CartDrawer />
          </div>
        </div>
      )}
    </>
  );
}
