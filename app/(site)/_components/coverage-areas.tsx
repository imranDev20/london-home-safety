"use client";

import React from "react";
import { motion } from "framer-motion";
import LondonMap from "./london-map";
import { Search, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { SUPPORTED_BOROUGHS } from "@/lib/constants";

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

export default function CoverageAreas() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const sectionRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.0,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isInServiceArea = (district: string): boolean => {
    if (!district) return false;
    return SUPPORTED_BOROUGHS.includes(district.toLowerCase());
  };

  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["address", debouncedSearchTerm],
    queryFn: () => fetchAddressPredictions(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  const handleSelect = (address: Address) => {
    const district = address.district;
    setSelectedDistrict(district);
    setOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center mb-8 sm:mb-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Coverage Area
          <span className="text-primary block mt-2 relative">
            Greater London
            <svg
              className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
              viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
              />
            </svg>
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We provide comprehensive safety services throughout Greater London,
          ensuring your property&apos;s safety across all 32 boroughs and the
          City of London.
        </motion.p>

        <div className="max-w-xl mx-auto mb-12">
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
            <PopoverContent className="w-[600px] p-0" align="start">
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
                  <CommandGroup heading="Coverage Check">
                    {predictions.map((address: Address, i: number) => (
                      <CommandItem
                        key={i}
                        value={address.postcode + " " + address.street}
                        onSelect={() => handleSelect(address)}
                        className="flex items-center gap-2 py-3"
                      >
                        <div
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full",
                            isInServiceArea(address.district)
                              ? "bg-green-100"
                              : "bg-red-100"
                          )}
                        >
                          {isInServiceArea(address.district) ? (
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
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedDistrict && (
            <Alert
              variant={
                isInServiceArea(selectedDistrict) ? "default" : "destructive"
              }
              className={cn(
                "mt-4",
                isInServiceArea(selectedDistrict) &&
                  "bg-green-50 text-green-900 border-green-200"
              )}
            >
              <div className="flex items-center gap-2">
                {isInServiceArea(selectedDistrict) ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-900">
                      Great news! We provide services in {selectedDistrict}.
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      We apologize, but we currently don&apos;t provide services
                      in {selectedDistrict}. We only operate in select London
                      boroughs.
                    </AlertDescription>
                  </>
                )}
              </div>
            </Alert>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <LondonMap activeDistrict={selectedDistrict?.toLowerCase()} />
        </div>
      </div>
    </section>
  );
}
