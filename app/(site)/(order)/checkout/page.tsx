"use client";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Coins,
  HelpCircle,
  ParkingCircleOff,
  ParkingSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckoutFormInput, checkoutFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useOrderStore from "@/hooks/use-order-store";
import { useEffect } from "react";
import { ParkingOptions } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import RequiredIndicator from "@/components/custom/required-indicator";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary from "../_components/order-summary";
import DateSchedule from "./_components/date-schedule";
import CheckoutEmptyState from "./_components/checkout-empty-state";
import AddressAutocomplete from "./_components/address-autocomplete";

const parkingOptions = [
  {
    id: "FREE",
    label: "Free Parking",
    price: "+£0.00",
    icon: ParkingSquare,
    color: "text-green-600",
  },
  {
    id: "NO",
    label: "No Parking Available",
    price: `+£${PARKING_FEE}.00`,
    icon: ParkingCircleOff,
    color: "text-red-600",
  },
  {
    id: "PAID",
    label: "Paid Parking Available",
    price: `+£${PARKING_FEE}.00`,
    icon: Coins,
    color: "text-amber-600",
  },
];

const congestionZoneOptions = [
  {
    id: "yes",
    label: "Yes",
    price: `+£${CONGESTION_FEE}.00`,
    icon: AlertTriangle,
    color: "text-amber-600",
  },
  {
    id: "no",
    label: "No",
    price: "+£0.00",
    icon: CheckCircle,
    color: "text-green-600",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { customerDetails, setCustomerDetails, cartItems } = useOrderStore();

  const form = useForm<CheckoutFormInput>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      addressSource: "search",
      postcode: "",
      date: undefined,
      timeSlotId: "",
      parkingOption: "FREE",
      isInCongestionZone: false,
    },
  });

  const {
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (customerDetails) {
      reset({
        firstName: customerDetails.firstName ?? "",
        lastName: customerDetails.lastName ?? "",
        email: customerDetails.email ?? "",
        phone: customerDetails.phoneNumber ?? "",
        street: customerDetails.address.street ?? "",
        city: customerDetails.address.city ?? "",
        postcode: customerDetails.address.postcode ?? "",
        addressSource: customerDetails.address.source ?? "",
        date: new Date(customerDetails.orderDate ?? ""),
        timeSlotId: customerDetails.timeSlotId ?? "",
        parkingOption: customerDetails.parkingOptions ?? "FREE",
        isInCongestionZone: customerDetails.isCongestionZone ?? false,
      });
    }
  }, [reset, customerDetails]);

  const parkingOption = form.watch("parkingOption");
  const isInCongestionZone = form.watch("isInCongestionZone");

  const handleParkingChange = (value: ParkingOptions) => {
    form.setValue("parkingOption", value);
  };

  const handleCongestionChange = (value: string) => {
    form.setValue("isInCongestionZone", value === "yes");
  };

  const infoItems = [
    "Contact details for access (if different from main contact)",
    "Location of key safe or special entry instructions",
    "Presence and location of safety equipment",
    "Any known hazards or areas requiring special attention",
    "Parking instructions or restrictions",
    "Any other relevant details for our service team",
  ];

  const onCheckoutSubmit: SubmitHandler<CheckoutFormInput> = async (data) => {
    setCustomerDetails({
      address: {
        street: data.street ?? "",
        city: data.city ?? "",
        postcode: data.postcode ?? "",
        source: data.addressSource,
      },
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phone,
      orderDate: new Date(data.date),
      timeSlotId: data.timeSlotId,
      parkingOptions: data.parkingOption,
      isCongestionZone: data.isInCongestionZone,
      orderNotes: data.orderNotes,
    });

    toast({
      title: "Success",
      description: "Your checkout information has been successfully submitted.",
      variant: "success",
    });
    router.push("/payment");
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form errors:", errors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
    }
  }, [errors, toast]);

  return (
    <CheckoutEmptyState>
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <Form {...form}>
          <form
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            onSubmit={form.handleSubmit(onCheckoutSubmit)}
          >
            <div className="lg:col-span-8 space-y-8">
              {/* User Information */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">User Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Name <RequiredIndicator />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name <RequiredIndicator />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <RequiredIndicator />
                        </FormLabel>
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
                      <FormItem>
                        <FormLabel>
                          Phone <RequiredIndicator />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Address */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Address</h2>
                <div className="space-y-6">
                  {/* Ideal postcode prediction */}
                  <AddressAutocomplete />
                </div>
              </Card>

              {/* Congestion Zone */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Congestion Zone</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {congestionZoneOptions.map((option) => (
                    <div key={option.id}>
                      <label
                        htmlFor={`congestion${option.id}`}
                        className={cn(
                          "block cursor-pointer rounded-lg border-2 bg-white p-4 transition-all duration-200 ease-in-out",
                          isInCongestionZone === (option.id === "yes")
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-blue-300"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <option.icon
                            className={cn("w-6 h-6", option.color)}
                          />
                          <div
                            className={cn("text-sm font-medium", option.color)}
                          >
                            {option.price}
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium">
                          {option.label}
                        </p>
                        <input
                          type="radio"
                          name="congestionOption"
                          value={option.id}
                          id={`congestion${option.id}`}
                          className="sr-only"
                          checked={isInCongestionZone === (option.id === "yes")}
                          onChange={() => handleCongestionChange(option.id)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Parking Options */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Parking Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {parkingOptions.map((option) => (
                    <div key={option.id}>
                      <label
                        htmlFor={option.id}
                        className={cn(
                          "block cursor-pointer rounded-lg border-2 bg-white p-4 transition-all duration-200 ease-in-out",
                          parkingOption === option.id
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-blue-300"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <option.icon
                            className={cn("w-6 h-6", option.color)}
                          />
                          <div
                            className={cn("text-sm font-medium", option.color)}
                          >
                            {option.price}
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium">
                          {option.label}
                        </p>
                        <input
                          type="radio"
                          name="parkingOption"
                          value={option.id}
                          id={option.id}
                          className="sr-only"
                          checked={parkingOption === option.id}
                          onChange={() =>
                            handleParkingChange(option.id as ParkingOptions)
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </Card>

              {/* date component */}
              <DateSchedule />

              {/* Order Notes */}
              <Card className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-6">
                    Additional Information
                  </h2>
                  <Popover>
                    <PopoverTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <ul className="list-disc pl-4 space-y-1">
                        {infoItems.map((item, index) => (
                          <li key={index} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>

                <FormField
                  control={form.control}
                  name="orderNotes"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between"></div>
                      <Textarea
                        className="w-full"
                        {...field}
                        rows={6}
                        placeholder="Enter any additional property information here..."
                      />
                      <FormDescription className="text-sm text-muted-foreground">
                        Include details about access, safety equipment, hazards,
                        and any other relevant information.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4 space-y-6">
              <OrderSummary
                isInCongestionZone={isInCongestionZone}
                parkingOption={parkingOption}
                showProceedButton={true}
                onProceedClick={form.handleSubmit(onCheckoutSubmit)}
              />
            </div>
          </form>
        </Form>
      </div>
    </CheckoutEmptyState>
  );
}
