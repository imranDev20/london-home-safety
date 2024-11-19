"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useOrderStore from "@/hooks/use-order-store";
import { useSheetStore } from "@/hooks/use-sheet-store";
import { NON_INVERTED_ROUTES } from "@/lib/constants";
import { Home, Minus, Plus, ShoppingBasket, Wrench, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export default function CartDrawer() {
  const { cartItems, removeItem, updateItemQuantity, calculatePrice } =
    useOrderStore();
  const { isOpen, setIsOpen } = useSheetStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const isTransparent = !NON_INVERTED_ROUTES.some((route) =>
    pathname.startsWith(`/${route}`)
  );

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const minQuantity = item.package.minQuantity ?? 1;

    if (newQuantity >= minQuantity) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const CartTrigger = (
    <Button
      onClick={() => setIsOpen(true)}
      variant="ghost"
      className={`p-3 relative ${
        isTransparent
          ? "text-white hover:bg-primary/50"
          : "text-body-dark hover:bg-secondary/20"
      }`}
    >
      <div
        className={`rounded-full text-sm w-5 h-5 flex justify-center items-center absolute right-0 top-0 bg-secondary text-body-dark`}
      >
        {cartItems.length || 0}
      </div>
      <FaCartShopping
        className={`text-2xl ${
          isTransparent ? "text-white" : "text-body-dark"
        }`}
      />
    </Button>
  );

  const CartContent = (
    <ScrollArea className="flex-grow">
      <div className="p-5">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={item.id} className="group">
                <div className="flex justify-between py-4 px-2 transition-all duration-200">
                  <div className="flex-grow space-y-2">
                    <h3 className="font-semibold text-gray-800 transition-colors duration-200">
                      {item.package.name}
                    </h3>
                    <div className="flex flex-col space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Wrench className="w-4 h-4 mr-2 text-primary" />
                        <span>{item.package.serviceName}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2 text-primary" />
                        <span className="capitalize">
                          {`For ${item.package.propertyType
                            ?.toLowerCase()
                            .replace("_", " ")} Property`}
                        </span>
                      </div>
                    </div>

                    {item.package.isAdditionalPackage && (
                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                          {item.package.unitType
                            ? `Quantity (${item.package.unitType}):`
                            : "Quantity:"}
                        </span>
                        <div className="relative flex items-stretch h-10 rounded-lg bg-gray-50/80 ring-1 ring-gray-200 p-1 hover:ring-primary/30 transition-all duration-200">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={
                              item.quantity <= (item.package.minQuantity ?? 1)
                            }
                            className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <input
                              type="number"
                              min={item.package.minQuantity ?? 1}
                              value={item.quantity}
                              onChange={(e) => {
                                const newValue = Math.max(
                                  parseInt(e.target.value) ||
                                    item.package.minQuantity ||
                                    1,
                                  item.package.minQuantity ?? 1
                                );
                                handleQuantityChange(item.id, newValue);
                              }}
                              className="w-12 h-full text-center bg-transparent font-medium text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 rounded-md transition-all duration-200"
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="font-bold text-primary mt-2">
                      £{item.price.toFixed(2)}
                      {item.package.isAdditionalPackage && (
                        <span className="text-sm font-normal text-gray-600 ml-1">
                          for {item.quantity} {item.package.unitType || "units"}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    className="text-gray-400 p-2 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 self-start"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
                {index < cartItems.length - 1 && (
                  <Separator className="my-2 opacity-50" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <MdShoppingCart className="text-6xl text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/book-now">
              <Button className="mt-6" onClick={() => setIsOpen(false)}>
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </ScrollArea>
  );

  const CartFooter = (
    <>
      {cartItems.length > 0 && (
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">
              £{cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span>
          </div>

          <Link href="/cart">
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Checkout Now
            </Button>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <>
      {CartTrigger}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="flex flex-col h-[85vh]">
            <DrawerHeader className="flex-shrink-0">
              <DrawerTitle>Your Shopping Cart</DrawerTitle>
            </DrawerHeader>
            {CartContent}
            <Separator className="flex-shrink-0" />
            {CartFooter}
            <DrawerFooter className="flex-shrink-0">
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className="flex flex-col p-0">
            <SheetHeader className="p-5 flex-shrink-0">
              <SheetTitle className="font-medium flex items-center">
                <ShoppingBasket className="mr-2" /> {cartItems.length} items
              </SheetTitle>
            </SheetHeader>
            <Separator className="flex-shrink-0" />
            {CartContent}
            <Separator className="flex-shrink-0" />
            {CartFooter}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
