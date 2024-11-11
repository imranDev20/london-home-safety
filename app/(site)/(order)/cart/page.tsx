"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useOrderStore from "@/hooks/use-order-store";
import { X, ShoppingCart, Home, Wrench, Plus, Minus } from "lucide-react";
import Link from "next/link";
import OrderSummary from "../_components/order-summary";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, removeItem, updateItemQuantity } = useOrderStore();
  const router = useRouter();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Update handleQuantityChange to handle minQuantity as a fallback value
  const handleQuantityChange = (
    itemId: string,
    newQuantity: number,
    minQuantity: number = 1
  ) => {
    if (newQuantity >= minQuantity) {
      updateItemQuantity(itemId, newQuantity);
    }
  };

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
                      <h3 className="font-semibold text-lg">{item.name}</h3>

                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <Wrench className="w-5 h-5 mr-2 text-primary" />
                          <span className="text-gray-900">
                            {item.serviceName || ""}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Home className="w-5 h-5 mr-2 text-primary" />
                          <span className="text-gray-900 capitalize">
                            {`For ${item.propertyType
                              .toLowerCase()
                              .replace("_", " ")} Property`}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4 mt-4">
                        <div
                          className="flex items-stretch h-8 gap-1"
                          style={{ width: "120px" }}
                        >
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity - 1,
                                item.minQuantity ?? 1
                              )
                            }
                            disabled={item.quantity <= (item.minQuantity ?? 1)}
                            className="flex-1 flex items-center justify-center text-[#1A7EDB] border border-[#1A7EDB] rounded-md transition-colors duration-200 ease-in-out hover:bg-white active:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent px-1"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min={item.minQuantity ?? 1}
                            value={item.quantity}
                            onChange={(e) => {
                              const newValue =
                                parseInt(e.target.value) ||
                                (item.minQuantity ?? 1);
                              handleQuantityChange(
                                item.id,
                                newValue,
                                item.minQuantity ?? 1
                              );
                            }}
                            className="w-10 text-center bg-transparent rounded-md focus:outline-none text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:bg-white"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="flex-1 flex items-center justify-center text-[#1A7EDB] border border-[#1A7EDB] rounded-md transition-colors duration-200 ease-in-out hover:bg-white active:bg-white px-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end ml-4 min-h-[100px]">
                      <p className="font-bold text-primary text-lg">
                        £{item.totalPrice.toFixed(2)}
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

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-medium">
                    £{item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total:</span>
                <span>
                  £{totalPrice.toFixed(2)}{" "}
                  <span className="text-body font-normal text-sm">
                    (inc. Tax)
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-20">
              <Link href="/book-now" className="mt-10 block">
                <Button
                  className="w-full mb-3 h-11 text-base"
                  variant="outline"
                >
                  Continue Booking
                </Button>
              </Link>
              <Link href="/checkout">
                <Button className="w-full h-11 text-base" variant="default">
                  Checkout Now
                </Button>
              </Link>
              {/* <OrderSummary
  parkingOption="FREE"
  isInCongestionZone={false}
  showProceedButton={true}
  onProceedClick={() => router.push('/checkout')}
/> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
