import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash, Check, ChevronsUpDown } from "lucide-react";
import { CreateOrderFormInput } from "../schema";
import { Package } from "@prisma/client";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ServicesInfoProps {
  packages: Package[];
}

function calculatePackagePrice(pack: Package, quantity: number): number {
  if (!pack.isAdditionalPackage) return pack.price;

  const minQuantity = pack.minQuantity ?? 1;
  const extraUnitsCount = Math.max(0, quantity - minQuantity);
  const extraPrice = extraUnitsCount * (pack.extraUnitPrice ?? 0);
  return pack.price + extraPrice;
}

export default function ServicesInfo({ packages }: ServicesInfoProps) {
  const { control, watch, setValue, getValues } =
    useFormContext<CreateOrderFormInput>();
  const [openPopoverIndexes, setOpenPopoverIndexes] = useState<{
    [key: number]: boolean;
  }>({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cartItems",
  });

  const togglePopover = (index: number, value: boolean) => {
    setOpenPopoverIndexes((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>
          Select the services to be performed during the inspection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => {
          const selectedPackage = packages.find(
            (p) => p.id === watch(`cartItems.${index}.packageId`)
          );

          return (
            <div key={field.id} className="grid gap-4 sm:grid-cols-12 mb-6">
              <div className="col-span-8">
                <FormField
                  control={control}
                  name={`cartItems.${index}.packageId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service {index + 1}</FormLabel>
                      <FormControl>
                        <Popover
                          open={openPopoverIndexes[index]}
                          onOpenChange={(value) => togglePopover(index, value)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverIndexes[index]}
                              className="w-full justify-between"
                            >
                              {field.value ? (
                                (() => {
                                  const selectedPackage = packages?.find(
                                    (pkg) => pkg.id === field.value
                                  );
                                  return selectedPackage
                                    ? `${selectedPackage.serviceName} - ${selectedPackage.name}`
                                    : null;
                                })()
                              ) : (
                                <span className="text-muted-foreground">
                                  Select a service
                                </span>
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search services..." />
                              <CommandList>
                                <CommandEmpty>No services found.</CommandEmpty>
                                <CommandGroup>
                                  {packages?.map((pkg) => (
                                    <CommandItem
                                      key={pkg.id}
                                      value={pkg.serviceName + " " + pkg.name}
                                      onSelect={() => {
                                        field.onChange(pkg.id);
                                        const quantity = pkg.isAdditionalPackage
                                          ? pkg.minQuantity ?? 1
                                          : 1;
                                        setValue(
                                          `cartItems.${index}.quantity`,
                                          quantity
                                        );
                                        setValue(
                                          `cartItems.${index}.price`,
                                          calculatePackagePrice(pkg, quantity)
                                        );
                                        togglePopover(index, false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === pkg.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {pkg.serviceName} - {pkg.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedPackage?.isAdditionalPackage && (
                  <div className="mt-2 space-y-2">
                    <FormLabel>Quantity</FormLabel>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (!selectedPackage) return;

                          const currentQuantity = getValues(
                            `cartItems.${index}.quantity`
                          );

                          const newQuantity = Math.max(
                            selectedPackage.minQuantity ?? 1,
                            currentQuantity - 1
                          );
                          setValue(`cartItems.${index}.quantity`, newQuantity);

                          setValue(
                            `cartItems.${index}.price`,
                            calculatePackagePrice(selectedPackage, newQuantity)
                          );
                        }}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <FormField
                        control={control}
                        name={`cartItems.${index}.quantity`}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            min={selectedPackage.minQuantity || 1}
                            onChange={(e) => {
                              const value = Math.max(
                                selectedPackage.minQuantity || 1,
                                parseInt(e.target.value) ||
                                  selectedPackage.minQuantity ||
                                  1
                              );
                              field.onChange(value);
                              setValue(
                                `cartItems.${index}.price`,
                                calculatePackagePrice(selectedPackage, value)
                              );
                            }}
                            className="h-8 w-20 text-center border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        )}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (!selectedPackage) return;
                          const currentQuantity = getValues(
                            `cartItems.${index}.quantity`
                          );
                          const newQuantity = currentQuantity + 1;
                          setValue(`cartItems.${index}.quantity`, newQuantity);
                          setValue(
                            `cartItems.${index}.price`,
                            calculatePackagePrice(selectedPackage, newQuantity)
                          );
                        }}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-1">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="mt-8"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          variant="default"
          size="sm"
          className="mt-2"
          onClick={() => append({ packageId: "", quantity: 1, price: 0 })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </CardContent>
    </Card>
  );
}
