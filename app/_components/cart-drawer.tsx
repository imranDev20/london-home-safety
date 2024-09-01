"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useOrderStore from "@/hooks/use-order-store";
import { ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

export default function CartDrawer() {
  const { cartItems, removeItem } = useOrderStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button className="p-3 relative">
          <div className="rounded-full text-sm bg-secondary w-5 h-5 flex justify-center items-center absolute right-0 top-0 text-body-dark">
            {cartItems.length || 0}
          </div>
          <FaCartShopping className="text-2xl text-white" />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-5">
          <SheetTitle className="font-medium flex items-center">
            <ShoppingBasket className="mr-2" /> {cartItems.length} items
          </SheetTitle>
        </SheetHeader>
        <Separator />

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-5">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div key={item?.id} className="group">
                    <div className="flex justify-between items-center py-3 px-2 transition-all duration-200">
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800 transition-colors duration-200 min-h-[48px]">
                          {item?.name}
                        </h3>
                        <p className="text-sm font-semibold text-primary mt-1">
                          £{item?.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="text-gray-400 p-2 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <X size={18} />
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
                  Looks like you haven’t added anything to your cart yet.
                </p>
                <Link href="/book-now">
                  <Button className="mt-6" onClick={() => setSheetOpen(false)}>
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {cartItems.length > 0 && (
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">
                £
                {cartItems
                  .reduce((sum, item) => sum + item?.price, 0)
                  .toFixed(2)}
              </span>
            </div>

            <Link href="/cart">
              <Button className="w-full" onClick={() => setSheetOpen(false)}>
                Checkout Now
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
