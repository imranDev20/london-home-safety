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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
import { CreateOrderFormInput } from "../schema";
import { Package } from "@prisma/client";
import { useFieldArray } from "react-hook-form";

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cartItems",
  });

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
            <div key={field.id} className="grid gap-4 sm:grid-cols-12 mb-4">
              <div className="col-span-8">
                <FormField
                  control={control}
                  name={`cartItems.${index}.packageId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service {index + 1}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);

                          const pkg = packages.find((p) => p.id === value);

                          if (!pkg) return;

                          const quantity = pkg.isAdditionalPackage
                            ? pkg.minQuantity ?? 1
                            : 1;

                          setValue(`cartItems.${index}.quantity`, quantity);
                          setValue(
                            `cartItems.${index}.price`,
                            calculatePackagePrice(pkg, quantity)
                          );
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {packages?.map((pkg) => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              {pkg.serviceName} - {pkg.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedPackage?.isAdditionalPackage && (
                  <div className="mt-2">
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
                            className="h-8 w-20 text-center border rounded-md"
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
