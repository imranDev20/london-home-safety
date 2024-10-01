"use client";

import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  COMMERCIAL_TYPE_OPTIONS,
  RESIDENTIAL_TYPE_OPTIONS,
  SERVICE_CATEGORY_OPTION,
  SERVICE_TYPE_OPTIONS,
} from "@/lib/constants";
import { kebabToNormal } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPackage, updatePackage } from "../actions";
import { PackageFormInputType, packageSchema } from "../schema";
import { Package } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="shadow-md mb-6">
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 grid-cols-12">{children}</div>
    </CardContent>
  </Card>
);

const priceTypes = ["FIXED", "FROM", "RANGE"];

export default function PackageForm({
  packageDetails,
}: {
  packageDetails?: Package;
}) {
  const form = useForm<PackageFormInputType>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      description: "",
      isAdditionalPackage: packageDetails?.isAdditionalPackage ?? false,
      type: packageDetails?.type || undefined,
      category: packageDetails?.category || undefined,
      price: "",
      minQuantity: "",
      extraUnitPrice: "",
      priceType: packageDetails?.priceType || "FIXED",
      serviceName: packageDetails?.serviceName || "",
      propertyType: "RESIDENTIAL",
      residentialType: packageDetails?.residentialType || undefined,
      commercialType: packageDetails?.commercialType || undefined,
      unitType: "",
    },
  });

  const { control, handleSubmit, watch, reset } = form;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (packageDetails) {
      reset({
        name: packageDetails.name,
        description: packageDetails.description || "",
        isAdditionalPackage: packageDetails.isAdditionalPackage,
        type: packageDetails.type || undefined,
        category: packageDetails.category || undefined,
        price: packageDetails.price.toString(),
        minQuantity: packageDetails?.minQuantity?.toString() ?? "",
        extraUnitPrice: packageDetails?.extraUnitPrice?.toString() ?? "",
        priceType: packageDetails.priceType || "FIXED",
        serviceName: packageDetails.serviceName || "",
        propertyType: packageDetails.propertyType || "RESIDENTIAL",
        residentialType: packageDetails.residentialType || undefined,
        commercialType: packageDetails.commercialType || undefined,
        unitType: packageDetails.unitType || "",
      });
    }
  }, [packageDetails, reset]);

  const onSubmit: SubmitHandler<PackageFormInputType> = async (data) => {
    startTransition(async () => {
      const result = packageDetails
        ? await updatePackage(packageDetails.id, data)
        : await createPackage(data);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        });
        router.push("/admin/packages");
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  const isUpdateMode = !!packageDetails;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-7">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {isUpdateMode
                  ? `Edit ${packageDetails.name}`
                  : "Create New Package"}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base block sm:hidden">
                Please fill out the details below to create a package.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/packages">
                <Button
                  variant="outline"
                  type="button"
                  className="h-9 w-full text-sm font-medium flex"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </Link>
              <LoadingButton
                type="submit"
                disabled={isPending}
                loading={isPending}
                size="sm"
                className="h-9 w-full text-sm font-medium flex"
              >
                {!isPending && <Check className="mr-2 h-4 w-4" />}
                {isUpdateMode ? "Update Package" : "Create Package"}
              </LoadingButton>
            </div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base hidden sm:block">
            Please fill out the details below to create a package.
          </p>
        </div>

        <FormSection title="Basic Information">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Package Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter package name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter package price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="priceType"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Price Type
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      if (value) {
                        field.onChange(value);
                      }
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priceTypes.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="minQuantity"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Minimum Quantity
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter minimum quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="extraUnitPrice"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Unit Price
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter unit price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="isAdditionalPackage"
            render={({ field }) => (
              <FormItem className="col-span-12  flex flex-row items-start space-x-3 space-y-0 rounded-md  p-4">
                
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    Additional Package
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Service Details">
          <FormField
            control={control}
            name="serviceName"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel className="text-sm font-medium">
                  Service Name
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ALL_SERVICES.map((service) => (
                      <SelectItem key={service.label} value={service.label}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel className="text-sm font-medium">
                  Package Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_CATEGORY_OPTION.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {kebabToNormal(category.replace(/_/g, " "))}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel className="text-sm font-medium">
                  Package Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SERVICE_TYPE_OPTIONS.map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {kebabToNormal(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-12">
                <FormLabel className="text-sm font-medium">
                  Package Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-24"
                    placeholder="Type your message here."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <FormSection title="Property Information">
          <FormField
            control={control}
            name="propertyType"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Property Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                    <SelectItem value="COMMERCIAL">Commercial</SelectItem>

                    <SelectItem value="HMO">
                      HMO&apos;s & Rental Homes
                    </SelectItem>
                    <SelectItem value="COMMUNAL_AREA">Communal Area</SelectItem>
                    <SelectItem value="BUSINESS_SECTOR">
                      Business Sectors
                    </SelectItem>

                    <SelectItem value="NOT_APPLICABLE">
                      Not Aapplicable
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watch("propertyType") === "RESIDENTIAL" && (
            <FormField
              control={control}
              name="residentialType"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel className="text-sm font-medium">
                    Residential Type (Optional)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select residential type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RESIDENTIAL_TYPE_OPTIONS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {kebabToNormal(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {watch("propertyType") === "COMMERCIAL" && (
            <FormField
              control={control}
              name="commercialType"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel className="text-sm font-medium">
                    Commercial Type (Optional)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commercial type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMMERCIAL_TYPE_OPTIONS.map((type) => (
                        <SelectItem key={type} value={type}>
                          {kebabToNormal(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={control}
            name="unitType"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel className="text-sm font-medium">
                  Unit Type (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter unit type"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>
      </form>
    </Form>
  );
}
