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
  const { customerDetails } = useOrderStore();

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

    setSelectedServiceability({ isServiceable: false, isChecking: true });
    try {
      const result = await isAddressServiceable(postcode);
      setSelectedServiceability({
        isServiceable: result.isServiceable,
        isChecking: false,
      });
    } catch (error) {
      setSelectedServiceability({
        isServiceable: false,
        isChecking: false,
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

                  {(selectedAddress ||
                    (form.watch("addressSource") === "search" &&
                      customerDetails.address.street !== "")) && (
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
                                  in select London boroughs.
                                </AlertDescription>
                              </>
                            )}
                          </div>
                        </Alert>
                      )}

                      <Card className="p-6 bg-muted/50">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    readOnly
                                    className="bg-background"
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
                                  <FormLabel>City/Town</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      readOnly
                                      className="bg-background"
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
                                  <FormLabel>Postcode</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      readOnly
                                      className="bg-background"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="manual">
                  <Card className="p-6">
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address*</FormLabel>
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
                              <FormLabel>City/Town*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="City/Town" />
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
                              <FormLabel>Postcode*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Postcode"
                                  onChange={(e) =>
                                    field.onChange(e.target.value.toUpperCase())
                                  }
                                />
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
