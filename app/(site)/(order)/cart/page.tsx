"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCartStore from "@/hooks/use-cart-store";
import { X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem } = useCartStore();

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto max-w-screen-xl grid grid-cols-12 px-16 gap-5 pt-5 pb-20">
      <div className="col-span-8">
        {items.length > 0 ? (
          <div className="space-y-5">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-5 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-primary font-bold">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-gray-500 p-1 border border-transparent hover:border-primary rounded-lg w-7 h-7 transition-all"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={16} />
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <ShoppingCart className="text-gray-400 mb-5" size={64} />
            <h2 className="text-2xl font-bold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/book-now">
              <Button size="lg" variant="default">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="col-span-4">
        <Card className="px-5 py-6">
          <div className="flex justify-between items-center">
            <p className="text-body text-base">Total:</p>
            <p className="text-lg font-semibold">£{totalPrice.toFixed(2)}</p>
          </div>
          <Separator className="my-7" />

          <Textarea rows={7} placeholder="Add a note..." />

          <Separator className="my-7" />

          <Button
            className="mt-5 block w-full border border-primary/80 hover:border-primary text-primary hover:text-primary"
            variant="outline"
          >
            Continue Shopping
          </Button>

          <Button
            className="mt-3 block w-full border border-primary/80 hover:border-primary"
            variant="default"
          >
            Checkout Now
          </Button>
        </Card>
      </div>
    </div>
  );
}
