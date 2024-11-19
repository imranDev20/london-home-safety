import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAddressServiceable } from "@/lib/geo-validation";

interface PostcodeSearchProps {
  onAddressSelect: (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => void;
  renderAddressItem: (
    address: Address,
    serviceability: ServiceabilityStatus
  ) => React.ReactNode;
  buttonContent?: React.ReactNode;
  commandGroupHeading?: string;
}

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

type ServiceabilityMap = {
  [key: string]: ServiceabilityStatus;
};

const fetchAddressPredictions = async (
  postcode: string
): Promise<Address[]> => {
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

export default function PostcodeSearch({
  onAddressSelect,
  renderAddressItem,
  commandGroupHeading = "Suggested addresses",
}: PostcodeSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const [serviceabilityMap, setServiceabilityMap] = useState<ServiceabilityMap>(
    {}
  );

  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["address", debouncedSearchTerm],
    queryFn: () => fetchAddressPredictions(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    async function checkAddresses() {
      const updatedServiceability: ServiceabilityMap = {};

      await Promise.all(
        predictions.map(async (address) => {
          setServiceabilityMap((prev) => ({
            ...prev,
            [address.postcode]: { isServiceable: false, isChecking: true },
          }));

          try {
            const result = await isAddressServiceable(address.postcode);
            updatedServiceability[address.postcode] = {
              isServiceable: result.isServiceable,
              isChecking: false,
            };
          } catch (error) {
            updatedServiceability[address.postcode] = {
              isServiceable: false,
              isChecking: false,
            };
          }
        })
      );

      setServiceabilityMap((prev) => ({
        ...prev,
        ...updatedServiceability,
      }));
    }

    if (predictions.length > 0) {
      checkAddresses();
    }
  }, [predictions]);

  const handleSelect = async (address: Address) => {
    const currentServiceability = serviceabilityMap[address.postcode] || {
      isServiceable: false,
      isChecking: true,
    };

    if (currentServiceability.isChecking) {
      try {
        const result = await isAddressServiceable(address.postcode);
        const updatedServiceability = {
          isServiceable: result.isServiceable,
          isChecking: false,
        };
        setServiceabilityMap((prev) => ({
          ...prev,
          [address.postcode]: updatedServiceability,
        }));
        onAddressSelect(address, updatedServiceability);
      } catch (error) {
        const failedServiceability = {
          isServiceable: false,
          isChecking: false,
        };
        setServiceabilityMap((prev) => ({
          ...prev,
          [address.postcode]: failedServiceability,
        }));
        onAddressSelect(address, failedServiceability);
      }
    } else {
      onAddressSelect(address, currentServiceability);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14 px-4 text-left font-normal bg-white"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="h-5 w-5" />
            {searchTerm || "Enter your postcode..."}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0")} align="start">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search address by postcode..."
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value.toUpperCase())}
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
            <CommandGroup heading={commandGroupHeading}>
              {predictions.map((address: Address, i: number) => (
                <CommandItem
                  key={i}
                  value={address.postcode + " " + address.street}
                  onSelect={() => handleSelect(address)}
                  className="flex items-center gap-2 py-3"
                >
                  {renderAddressItem(
                    address,
                    serviceabilityMap[address.postcode] || {
                      isServiceable: false,
                      isChecking: true,
                    }
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
