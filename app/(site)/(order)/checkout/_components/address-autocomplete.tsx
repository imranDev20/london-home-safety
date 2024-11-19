import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckoutFormInput } from "../schema";
import useOrderStore from "@/hooks/use-order-store";
import { isAddressServiceable } from "@/lib/geo-validation";
import PostcodeSearch from "@/app/(site)/_components/postcode-search";

interface Address {
  street: string;
  city: string;
  postcode: string;
  district: string;
  country: string;
}

interface ServiceabilityStatus {
  isServiceable: boolean;
  isChecking: boolean;
}

export default function AddressAutocomplete() {
  const form = useFormContext<CheckoutFormInput>();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedServiceability, setSelectedServiceability] =
    useState<ServiceabilityStatus>({
      isServiceable: false,
      isChecking: false,
    });
  const [manualPostcodeStatus, setManualPostcodeStatus] =
    useState<ServiceabilityStatus>({
      isServiceable: false,
      isChecking: false,
    });

  const updateForm = (address: Address) => {
    form.setValue("street", address.street, { shouldValidate: true });
    form.setValue("city", address.city, { shouldValidate: true });
    form.setValue("postcode", address.postcode, { shouldValidate: true });
    form.setValue("addressSource", "search", { shouldValidate: true });
  };

  const handleAddressSelect = (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => {
    setSelectedAddress(address);
    setSelectedServiceability(serviceability);
    updateForm(address);
  };

  const renderAddressItem = (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => (
    <>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full",
          selectedAddress?.postcode === address.postcode
            ? "bg-primary/10"
            : "bg-muted"
        )}
      >
        {serviceability.isChecking ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : serviceability.isServiceable ? (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-medium">{address.street}</span>
        <span className="text-sm text-muted-foreground">
          {address.city}, {address.postcode}
        </span>
      </div>
    </>
  );

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postcode = form.getValues("postcode");

    if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(postcode)) {
      form.setError("postcode", {
        type: "manual",
        message: "Please enter a valid UK postcode",
      });
      return;
    }

    setManualPostcodeStatus({ isServiceable: false, isChecking: true });
    try {
      const result = await isAddressServiceable(postcode);
      setManualPostcodeStatus({
        isServiceable: result.isServiceable,
        isChecking: false,
      });

      if (!result.isServiceable) {
        form.setError("postcode", {
          type: "manual",
          message: "We only provide services within Greater London",
        });
      } else {
        // Clear any existing errors when postcode is valid
        form.clearErrors("postcode");
      }
    } catch (error) {
      setManualPostcodeStatus({
        isServiceable: false,
        isChecking: false,
      });
      form.setError("postcode", {
        type: "manual",
        message: "Error validating postcode. Please try again.",
      });
    }
  };

  const formatAddress = (address: Address): string => {
    return `${address.street}, ${address.city}, ${address.postcode}`;
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="addressSource"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Tabs
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedAddress(null);
                  setManualPostcodeStatus({
                    isServiceable: false,
                    isChecking: false,
                  });
                }}
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="search">Find Address</TabsTrigger>
                  <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="space-y-4">
                  <PostcodeSearch
                    onAddressSelect={handleAddressSelect}
                    renderAddressItem={renderAddressItem}
                    buttonContent={
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        {selectedAddress ? (
                          <span className="text-foreground">
                            {formatAddress(selectedAddress)}
                          </span>
                        ) : (
                          "Enter your postcode..."
                        )}
                      </div>
                    }
                  />

                  <Card className="p-6 bg-muted/50">
                    <div className="space-y-4">
                      {selectedAddress && (
                        <Alert
                          variant={
                            selectedServiceability.isChecking
                              ? "default"
                              : selectedServiceability.isServiceable
                              ? "default"
                              : "destructive"
                          }
                          className={cn(
                            selectedServiceability.isServiceable &&
                              !selectedServiceability.isChecking &&
                              "bg-green-50 text-green-900 border-green-200"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {selectedServiceability.isChecking ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <AlertDescription>
                                  Checking service availability...
                                </AlertDescription>
                              </>
                            ) : selectedServiceability.isServiceable ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-900">
                                  Great news! We provide services in your area.
                                </AlertDescription>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4" />
                                <AlertDescription>
                                  We apologize, but we currently don&apos;t
                                  provide services in your area. We only operate
                                  in Greater London.
                                </AlertDescription>
                              </>
                            )}
                          </div>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Street Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={!selectedAddress}
                                  readOnly
                                  className="bg-background disabled:opacity-50"
                                  placeholder="Search your postcode to auto-fill address"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                  City/Town
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!selectedAddress}
                                    readOnly
                                    className="bg-background disabled:opacity-50"
                                    placeholder="Auto-filled from postcode"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postcode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                  Postcode
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={!selectedAddress}
                                    readOnly
                                    className="bg-background disabled:opacity-50"
                                    placeholder="Auto-filled from postcode"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="manual">
                  <Card className="p-6">
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="House number and street name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                City/Town
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="City/Town"
                                  disabled={!manualPostcodeStatus.isServiceable}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                                Postcode
                              </FormLabel>
                              <FormControl>
                                <div className="space-y-2">
                                  <Input
                                    {...field}
                                    placeholder="Postcode"
                                    onChange={(e) => {
                                      const value =
                                        e.target.value.toUpperCase();
                                      field.onChange(value);
                                      if (
                                        value &&
                                        /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(
                                          value
                                        )
                                      ) {
                                        handleManualSubmit(e);
                                      }
                                    }}
                                  />
                                  {manualPostcodeStatus.isChecking && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      <span>Validating postcode...</span>
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
