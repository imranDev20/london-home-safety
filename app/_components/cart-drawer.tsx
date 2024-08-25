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
import useCartStore from "@/hooks/use-cart-store";
import { ShoppingBasket, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

export default function CartDrawer() {
  const { items, removeItem } = useCartStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button className="p-3 relative">
          <div className="rounded-full text-sm bg-secondary w-5 h-5 flex justify-center items-center absolute right-0 top-0 ">
            {items.length || 0}
          </div>
          <FaCartShopping className="text-2xl text-body" />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-5">
          <SheetTitle className="font-medium flex items-center">
            <ShoppingBasket className="mr-2" /> {items.length} items
          </SheetTitle>
        </SheetHeader>
        <Separator />

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-5">
            {items.length > 0 ? (
              <>
                {items.map((item, index) => (
                  <div key={item?.id}>
                    <div className="flex justify-between items-start py-2">
                      <div>
                        <h3 className="font-medium">{item?.name}</h3>
                        <p className="text-sm text-primary">
                          £{item?.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="text-gray-500 p-1 border border-transparent hover:border hover:border-primary rounded-full transition-all"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {index < items.length - 1 && <Separator className="mt-2" />}
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

        {items.length > 0 && (
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">
                £{items.reduce((sum, item) => sum + item?.price, 0).toFixed(2)}
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
