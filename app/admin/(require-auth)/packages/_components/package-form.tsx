"use client";

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
  ArrowLeft,
  Building2,
  ChevronsUpDown,
  ClipboardList,
  Package2,
  Save,
  Tags,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPackage, updatePackage } from "../actions";
import { PackageFormInputType, packageSchema } from "../schema";
import { Package } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { ALL_SERVICES } from "@/shared/data";
import { cn } from "@/lib/utils";

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
      isAdditionalPackage: false,
      type: undefined,
      category: undefined,
      price: "",
      minQuantity: "",
      extraUnitPrice: "",
      priceType: packageDetails?.priceType || "FIXED",
      serviceName: packageDetails?.serviceName || "",
      propertyType: packageDetails?.propertyType || "RESIDENTIAL",
      unitType: "",
    },
  });

  const { handleSubmit, reset } = form;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const [isServicePopoverOpen, setIsServicePopoverOpen] = useState(false);

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
    <div className="space-y-6 mt-7">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/packages"
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">
              {packageDetails
                ? `Edit Package ${packageDetails.name}`
                : "Create New Package"}
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/packages">
            <Button variant="outline">Cancel</Button>
          </Link>
          <LoadingButton type="submit" form="package-form" loading={isPending}>
            {!isPending && <Save className="mr-2 h-4 w-4" />}
            {packageDetails ? "Update Package" : "Create Package"}
          </LoadingButton>
        </div>
      </div>

      <Form {...form}>
        <form
          id="package-form"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Basic Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package2 className="h-5 w-5 text-primary" />
                Basic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Package Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter package name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Service Name
                      </FormLabel>
                      <FormControl>
                        <Popover
                          open={isServicePopoverOpen}
                          onOpenChange={setIsServicePopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between h-10"
                            >
                              {field.value || "Select service"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Search service..." />
                              <CommandList>
                                <CommandEmpty>No service found.</CommandEmpty>
                                <CommandGroup>
                                  {ALL_SERVICES.map((service) => (
                                    <CommandItem
                                      key={service.label}
                                      value={service.label}
                                      onSelect={() => {
                                        field.onChange(service.label);
                                        setIsServicePopoverOpen(false);
                                      }}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === service.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        <span className="font-medium">
                                          {service.label}{" "}
                                          {service.abbr
                                            ? `(${service.abbr})`
                                            : ""}
                                        </span>
                                      </div>
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
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Base Price (£)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the package..."
                        className="h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Pricing Options Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-5 w-5 text-primary" />
                Pricing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="priceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Type</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          if (val) field.onChange(val);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select price type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FIXED">Fixed Price</SelectItem>
                          <SelectItem value="FROM">Starting From</SelectItem>
                          <SelectItem value="RANGE">Price Range</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAdditionalPackage"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2 space-y-0 mt-2">
                      <FormControl>
                        <Checkbox
                          id="isAdditionalPackage"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                      </FormControl>
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel
                          htmlFor="isAdditionalPackage"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Additional Package
                        </FormLabel>
                        <p className="text-sm text-muted-foreground mt-3">
                          Enable this for packages that can have multiple
                          quantities
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("isAdditionalPackage") && (
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="minQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="extraUnitPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extra Unit Price (£)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Property Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Property Type
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          if (val) field.onChange(val);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="RESIDENTIAL">
                            Residential
                          </SelectItem>
                          <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                          <SelectItem value="HMO">
                            HMO&apos;s & Rental Homes
                          </SelectItem>
                          <SelectItem value="COMMUNAL_AREA">
                            Communal Area
                          </SelectItem>
                          <SelectItem value="BUSINESS_SECTOR">
                            Business Sectors
                          </SelectItem>
                          <SelectItem value="NOT_APPLICABLE">
                            NOT APPLICABLE
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Service Category
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          if (val) field.onChange(val);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ELECTRICAL">Electrical</SelectItem>
                          <SelectItem value="FIRE">Fire Safety</SelectItem>
                          <SelectItem value="GAS">Gas Safety</SelectItem>
                          <SelectItem value="HEALTH_SAFETY">
                            Health & Safety
                          </SelectItem>
                          <SelectItem value="PROPERTY_MANAGEMENT">
                            Property Management
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Service Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Service Type
                      </FormLabel>
                      <Select
                        onValueChange={(val) => {
                          if (val) field.onChange(val);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CERTIFICATE">
                            Certificate
                          </SelectItem>
                          <SelectItem value="REPAIR">Repair</SelectItem>
                          <SelectItem value="INSTALLATION">
                            Installation
                          </SelectItem>
                          <SelectItem value="INSPECTION">Inspection</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., bedrooms, items" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
