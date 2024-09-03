"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NAV_ITEMS } from "@/shared/data";
import { FaCalendarCheck } from "react-icons/fa6";
import { Menu, ChevronRight } from "lucide-react";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenMenus([]);
  };

  const renderMenuItems = (items: typeof NAV_ITEMS, level = 0) => {
    return items.map((item) => (
      <li
        key={item.path}
        className={`${
          level > 0 ? "ml-4" : ""
        } transition-all duration-200 ease-in-out`}
      >
        {item.children ? (
          <div>
            <button
              onClick={() => toggleMenu(item.label)}
              className="flex items-center justify-between w-full py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out"
            >
              {item.label}
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                  openMenus.includes(item.label) ? "rotate-90" : ""
                }`}
              />
            </button>
            <ul
              className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openMenus.includes(item.label)
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {item.children.map((child) => (
                <li
                  key={child.path}
                  className="transition-all duration-200 ease-in-out"
                >
                  {child.children ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(child.label)}
                        className="flex items-center justify-between w-full py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out ml-4"
                      >
                        {child.label}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                            openMenus.includes(child.label) ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <ul
                        className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                          openMenus.includes(child.label)
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {child.children.map((grandChild) => (
                          <li
                            key={grandChild.path}
                            className="transition-all duration-200 ease-in-out"
                          >
                            <Link
                              href={`/services${child.path}${grandChild.path}`}
                              className="block py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-all duration-200 ease-in-out ml-8"
                              onClick={closeMenu}
                            >
                              {grandChild.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={`/services${child.path}`}
                      className="block py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-all duration-200 ease-in-out ml-4"
                      onClick={closeMenu}
                    >
                      {child.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Link
            href={item.path}
            className="block py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-all duration-200 ease-in-out"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        )}
      </li>
    ));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <nav className="h-full flex flex-col">
          <div className="p-4 border-b">
            <span className="text-lg font-semibold text-primary">Menu</span>
          </div>
          <div className="flex-grow overflow-y-auto py-4">
            <ul className="space-y-1 px-3">{renderMenuItems(NAV_ITEMS)}</ul>
          </div>
          <div className="p-4 border-t mt-auto">
            <Link href="/book-now" onClick={closeMenu}>
              <Button className="w-full bg-primary hover:bg-primary-darker text-white">
                <FaCalendarCheck className="mr-2" />
                Book Now
              </Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
