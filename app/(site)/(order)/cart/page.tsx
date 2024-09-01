"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useOrderStore from "@/hooks/use-order-store";
import { X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeItem } = useOrderStore();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-7 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description || "No description available"}
                    </p>

                    <p className="font-bold text-primary">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-4">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link href="/book-now">
                <Button variant="outline" className="mt-2">
                  Start Shopping
                </Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Order summary section remains unchanged */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-semibold">£{totalPrice.toFixed(2)}</span>
            </div>
            <Textarea
              placeholder="Add a note to your order"
              className="mb-4"
              rows={4}
            />
            <Separator className="my-4" />
            <Link href="/book-now">
              <Button className="w-full mb-3" variant="outline">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full" variant="default">
                Checkout Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
