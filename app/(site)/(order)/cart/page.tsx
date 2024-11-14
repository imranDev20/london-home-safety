"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useOrderStore from "@/hooks/use-order-store";
import {
  X,
  ShoppingCart,
  Home,
  Wrench,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderSummary from "../_components/order-summary";

const EmptyCartCard = () => (
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
);

export default function CartPage() {
  const { cartItems, removeItem, updateItemQuantity } = useOrderStore();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const minQuantity = item.package.minQuantity ?? 1;

    // Ensure newQuantity is not less than minQuantity
    if (newQuantity >= minQuantity) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="container mx-auto py-8 max-w-screen-xl px-4 md:px-8 lg:px-16 min-h-[calc(100vh_-_300px)] flex flex-col justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-screen-xl px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-5 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex h-full">
                    <div className="flex-grow space-y-3">
                      <h3 className="font-semibold text-lg">
                        {item.package.name}
                      </h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <Wrench className="w-5 h-5 mr-2 text-primary" />
                          <span className="text-gray-900">
                            {item.package.serviceName || ""}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Home className="w-5 h-5 mr-2 text-primary" />
                          <span className="text-gray-900 capitalize">
                            {`For ${item.package.propertyType
                              ?.toLowerCase()
                              .replace("_", " ")} Property`}
                          </span>
                        </div>
                      </div>

                      {item.package.isAdditionalPackage && (
                        <div className="flex items-center gap-4 pt-2">
                          <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                            Quantity:
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
                    </div>
                    <div className="flex flex-col justify-between items-end ml-4 min-h-[100px]">
                      <p className="font-bold text-primary text-lg">
                        £{item.price.toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="hover:bg-red-100 hover:text-red-600 transition-shadow duration-300"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyCartCard />
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
