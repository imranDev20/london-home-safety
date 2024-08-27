// CreateServiceForm.tsx
"use client";

import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  COMMERCIAL_TYPE_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  RESIDENTIAL_TYPE_OPTIONS,
  SERVICE_CATEGORY_OPTION,
  SERVICE_TYPE_OPTIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { kebabCaseToNormalText } from "@/shared/function";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { ContentLayout } from "../../../_components/content-layout";
import { createService } from "../../actions";
import { ServiceFormInputType, serviceSchema } from "../../schema";

export default function CreateServiceForm() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Services", href: "/admin/services" },
    {
      label: "Create Service",
      href: "/admin/services/new",
      isCurrentPage: true,
    },
  ];
  const form = useForm<ServiceFormInputType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "", // Empty string for required string fields
      type: "CERTIFICATE", // Providing a default, or leave as ""
      category: "ELECTRICAL", // Providing a default, or leave as ""
      description: "", // Empty string for optional description
      propertyType: "RESIDENTIAL", // Providing a default, or leave as ""
      residentialType: undefined, // Providing a default, or leave as ""
      commercialType: undefined, // Providing a default, or leave as ""
      unitType: "", // Empty string for optional unitType
      issuedDate: undefined, // Use null for optional date fields
      expiryDate: undefined, // Use null for optional date fields
      packages: [
        {
          name: "", // Empty string for required package name
          description: "", // Empty string for optional package description
          unitCount: 1, // Default value of 1 as required by schema
          price: "", // Empty string for required price
        },
      ], // Initialize packages array with one default package
    },
  });

  const { control, handleSubmit, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packages",
  });

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onCreateServiceSubmit: SubmitHandler<ServiceFormInputType> = async (data) => {
    startTransition(async () => {
      const result = await createService(data);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        });
        router.push("/admin/services");
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <ContentLayout title="Create Service">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onCreateServiceSubmit)} className="space-y-8 mt-7">
          <div className="mb-8 flex justify-between">
            <div className="">
              <h1 className="text-2xl font-bold mb-2">
                Create New Service
              </h1>
              <p className="text-gray-600">
                Please fill out the details below to create a service.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/admin/services">
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </Link>

              <LoadingButton
                type="submit"
                disabled={isPending}
                loading={isPending}
                className="py-2 text-xs h-8"
                size="sm"
              >
                Create Service
              </LoadingButton>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>
                Enter the details of the new service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_TYPE_OPTIONS.map((service, index) => (
                            <SelectItem key={index} value={service}>
                              {kebabCaseToNormalText(service)}
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
                    <FormItem>
                      <FormLabel>Service Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_CATEGORY_OPTION.map((category, index) => (
                            <SelectItem key={index} value={category}>
                              {kebabCaseToNormalText(category)}
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
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
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
                          {PROPERTY_TYPE_OPTIONS.map((property, index) => (
                            <SelectItem key={index} value={property}>
                              {kebabCaseToNormalText(property)}
                            </SelectItem>
                          ))}
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
                      <FormItem>
                        <FormLabel>Residential Type</FormLabel>
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
                            {RESIDENTIAL_TYPE_OPTIONS.map(
                              (residential, index) => (
                                <SelectItem key={index} value={residential}>
                                  {kebabCaseToNormalText(residential)}
                                </SelectItem>
                              )
                            )}
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
                      <FormItem>
                        <FormLabel>Commercial Type</FormLabel>
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
                            {COMMERCIAL_TYPE_OPTIONS.map(
                              (commercial, index) => (
                                <SelectItem key={index} value={commercial}>
                                  {kebabCaseToNormalText(commercial)}
                                </SelectItem>
                              )
                            )}
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
                    <FormItem>
                      <FormLabel>Unit Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="issuedDate"
                  render={({ field }) => {
                    const propertyType = watch("propertyType"); // Watch for changes in propertyType

                    return propertyType === "COMMERCIAL" || "RESIDENTIAL" ? (
                      <FormItem className="flex flex-col mt-3">
                        <FormLabel>Issued Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <FormItem className="flex flex-col">
                        <FormLabel>Issued Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    ); // Return null if the propertyType is not "COMMERCIAL"
                  }}
                />

                <FormField
                  control={control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Packages</CardTitle>
              <CardDescription>
                Add one or more packages for this service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-4 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-4"
                >
                  <FormField
                    control={control}
                    name={`packages.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Package Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`packages.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`packages.${index}.unitCount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Count</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`packages.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mt-8"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({ name: "", description: "", unitCount: 1, price: "" })
                }
              >
                Add Package
              </Button>
            </CardContent>
          </Card>


        </form>
      </Form>
    </ContentLayout>
  );
}
