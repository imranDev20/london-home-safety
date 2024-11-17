import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Loader2, Search, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUPPORTED_BOROUGHS } from "@/lib/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckoutFormInput } from "../schema";
import useOrderStore from "@/hooks/use-order-store";

interface Address {
  street: string;
  city: string;
  postcode: string;
  district: string;
  country: string;
}

const fetchAddressPredictions = async (postcode: string) => {
  if (!postcode || postcode.length < 2) return [];

  const response = await fetch(
    `https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}?api_key=${process.env.NEXT_PUBLIC_IDEAL_POSTCODES_API_KEY}`
  );

  if (!response.ok) throw new Error("Failed to fetch predictions");

  const data = await response.json();

  return (data.result || []).map((item: any) => ({
    street: item.line_1 + (item.line_2 ? `, ${item.line_2}` : ""),
    city: item.post_town,
    postcode: item.postcode,
    district: item.district,
    country: item.country,
  }));
};

export default function AddressAutocomplete() {
  const form = useFormContext<CheckoutFormInput>();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
  const { customerDetails } = useOrderStore();

  useEffect(() => {
    if (searchTerm) {
      setIsServiceable(null);
    }
  }, [searchTerm]);

  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["address", debouncedSearchTerm],
    queryFn: () => fetchAddressPredictions(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  const isInServiceArea = (district: string): boolean => {
    if (!district) return false;
    return SUPPORTED_BOROUGHS.includes(district.toLowerCase());
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.postcode}`;
  };

  const handleSelect = (address: Address) => {
    const serviceableStatus = isInServiceArea(address.district);
    setIsServiceable(serviceableStatus);
    setSelectedAddress(address);

    form.setValue("street", address.street, { shouldValidate: true });
    form.setValue("city", address.city, { shouldValidate: true });
    form.setValue("postcode", address.postcode, { shouldValidate: true });
    form.setValue("addressSource", "search", { shouldValidate: true });
    setOpen(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postcode = form.getValues("postcode");

    if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(postcode)) {
      form.setError("postcode", {
        type: "manual",
        message: "Please enter a valid UK postcode",
      });
      return;
    }

    fetchAddressPredictions(postcode).then((results) => {
      if (results && results.length > 0) {
        const isValidArea = isInServiceArea(results[0].district);
        setIsServiceable(isValidArea);
      } else {
        setIsServiceable(false);
      }
    });
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
                  setIsServiceable(null);
                  setSearchTerm("");
                }}
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="search">Find Address</TabsTrigger>
                  <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="space-y-4">
                  <div className="relative">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between h-14 px-4 text-left font-normal"
                        >
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
                          <Search className="h-5 w-5 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[600px] p-0" align="start">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput
                            placeholder="Search address by postcode..."
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                          />
                          <CommandList>
                            <CommandEmpty className="py-6 text-center text-sm">
                              {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Searching addresses...
                                </div>
                              ) : searchTerm.length < 2 ? (
                                "Enter at least 2 characters..."
                              ) : (
                                "No addresses found."
                              )}
                            </CommandEmpty>
                            <CommandGroup heading="Suggested addresses">
                              {predictions.map(
                                (address: Address, i: number) => (
                                  <CommandItem
                                    key={i}
                                    value={formatAddress(address)}
                                    onSelect={() => handleSelect(address)}
                                    className="flex items-center gap-2 py-3"
                                  >
                                    <div
                                      className={cn(
                                        "flex h-6 w-6 items-center justify-center rounded-full",
                                        selectedAddress?.postcode ===
                                          address.postcode
                                          ? "bg-primary/10"
                                          : "bg-muted"
                                      )}
                                    >
                                      <CheckCircle2
                                        className={cn(
                                          "h-4 w-4",
                                          selectedAddress?.postcode ===
                                            address.postcode
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                        )}
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {address.street}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {address.city}, {address.postcode}
                                      </span>
                                    </div>
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {(selectedAddress ||
                    (form.watch("addressSource") === "search" &&
                      customerDetails.address.street !== "")) && (
                    <div className="space-y-4">
                      {isServiceable !== null && (
                        <Alert
                          variant={isServiceable ? "default" : "destructive"}
                          className={cn(
                            isServiceable &&
                              "bg-green-50 text-green-900 border-green-200"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {isServiceable ? (
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
