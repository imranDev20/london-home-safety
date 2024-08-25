"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CheckoutFormInput, checkoutFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const form = useForm<CheckoutFormInput>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      postcode: "",
      date: new Date(),
      time: undefined,
      parkingOption: "free",
      isInCongestionZone: false,
    },
  });

  const parkingOption = form.watch("parkingOption");
  const isInCongestionZone = form.watch("isInCongestionZone");

  const handleParkingChange = (value: string) => {
    form.setValue("parkingOption", value as "free" | "no" | "paid");
  };

  const handleCongestionChange = (value: string) => {
    form.setValue("isInCongestionZone", value === "yes");
  };

  const parkingFee = parkingOption === "free" ? 0 : 5;
  const congestionFee = isInCongestionZone ? 5 : 0;
  const totalPrice = 460 + parkingFee + congestionFee;

  const onCheckoutSubmit: SubmitHandler<CheckoutFormInput> = async (data) => {
    console.log(data);

    router.push("/payment");
  };

  return (
    <div className="container max-w-screen-xl mx-auto pt-5 pb-20">
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-5"
          onSubmit={form.handleSubmit(onCheckoutSubmit)}
        >
          <div className="col-span-8 space-y-5">
            {/* User Information */}
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">User Information</h2>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Address */}
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">Address</h2>

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Postcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Congestion Zone */}
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">Congestion Zone</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="congestionYes"
                    className={cn(
                      "block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200",
                      isInCongestionZone &&
                        "border-blue-500 ring-1 ring-blue-500"
                    )}
                  >
                    <div>
                      <p className="text-gray-700">Yes</p>
                      <p className="mt-1 text-gray-900">+£5.00</p>
                    </div>

                    <input
                      type="radio"
                      name="congestionOption"
                      value="yes"
                      id="congestionYes"
                      className="sr-only"
                      checked={isInCongestionZone}
                      onChange={() => handleCongestionChange("yes")}
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="congestionNo"
                    className={cn(
                      "block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200",
                      !isInCongestionZone &&
                        "border-blue-500 ring-1 ring-blue-500"
                    )}
                  >
                    <div>
                      <p className="text-gray-700">No</p>
                      <p className="mt-1 text-gray-900">+£0.00</p>
                    </div>

                    <input
                      type="radio"
                      name="congestionOption"
                      value="no"
                      id="congestionNo"
                      className="sr-only"
                      checked={!isInCongestionZone}
                      onChange={() => handleCongestionChange("no")}
                    />
                  </label>
                </div>
              </div>
            </Card>

            {/* Parking Options */}
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">Parking Options</h2>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="freeParking"
                    className={cn(
                      "block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200",
                      parkingOption === "free" &&
                        "border-blue-500 ring-1 ring-blue-500"
                    )}
                  >
                    <div>
                      <p className="text-gray-700">Free Parking</p>
                      <p className="mt-1 text-gray-900">+£0.00</p>
                    </div>

                    <input
                      type="radio"
                      name="parkingOption"
                      value="free"
                      id="freeParking"
                      className="sr-only"
                      checked={parkingOption === "free"}
                      onChange={() => handleParkingChange("free")}
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="noParking"
                    className={cn(
                      "block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200",
                      parkingOption === "no" &&
                        "border-blue-500 ring-1 ring-blue-500"
                    )}
                  >
                    <div>
                      <p className="text-gray-700">No Parking Available</p>
                      <p className="mt-1 text-gray-900">+£5.00</p>
                    </div>

                    <input
                      type="radio"
                      name="parkingOption"
                      value="no"
                      id="noParking"
                      className="sr-only"
                      checked={parkingOption === "no"}
                      onChange={() => handleParkingChange("no")}
                    />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="paidParking"
                    className={cn(
                      "block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200",
                      parkingOption === "paid" &&
                        "border-blue-500 ring-1 ring-blue-500"
                    )}
                  >
                    <div>
                      <p className="text-gray-700">Paid Parking Available</p>
                      <p className="mt-1 text-gray-900">+£5.00</p>
                    </div>

                    <input
                      type="radio"
                      name="parkingOption"
                      value="paid"
                      id="paidParking"
                      className="sr-only"
                      checked={parkingOption === "paid"}
                      onChange={() => handleParkingChange("paid")}
                    />
                  </label>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">
                Select Date and Time
              </h2>

              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>

                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "flex w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="morning">
                                8 AM - 12 PM
                              </SelectItem>
                              <SelectItem value="afternoon">
                                12 PM - 4 PM
                              </SelectItem>
                              <SelectItem value="evening">
                                4 PM - 8 PM
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="col-span-4 space-y-5">
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Service Price:</span>
                <span className="text-gray-900">£460.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Parking Fee:</span>
                <span className="text-gray-900">£{parkingFee}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Congestion Zone Fee:</span>
                <span className="text-gray-900">£{congestionFee}.00</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center text-xl font-semibold">
                <span>Total Price:</span>
                <span>£{totalPrice}.00</span>
              </div>
            </Card>

            <Button type="submit" className="w-full">
              Confirm and Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
