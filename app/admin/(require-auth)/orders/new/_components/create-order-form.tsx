"use client";

import { ContentLayout } from "@/app/admin/(require-auth)/_components/content-layout";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CustomerWithRelation } from "@/types/customer";
import { StaffWithRelations } from "@/types/engineers";
import { ServiceWithRelation } from "@/types/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createOrder } from "../../actions";
import { CreateOrderFormInput, createOrderSchema } from "../schema";
import CreateUserForOrder from "./create-user";

export default function CreateOrderForm({
  users,
  engineers,
  services,
  invoiceId,
}: {
  users: CustomerWithRelation[];
  engineers: StaffWithRelations[];
  services: ServiceWithRelation[];
  invoiceId: string;
}) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    { label: "Create Order", href: "/admin/orders/new", isCurrentPage: true },
  ];

  const form = useForm<CreateOrderFormInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      services: [
        {
          serviceId: "",
        },
      ],
      invoiceId: invoiceId,
    },
  });

  const { control, handleSubmit } = form;
  const [isPending, startTransition] = useTransition();
  const [openUserComboBox, setOpenUserComboBox] = useState<boolean>(false);
  const [openEngineerComboBox, setOpenEngineerComboBox] =
    useState<boolean>(false);

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray<CreateOrderFormInput>({
    control,
    name: "services",
  });

  const { toast } = useToast();
  const router = useRouter();
  const onCreateOrderSubmit: SubmitHandler<CreateOrderFormInput> = async (
    data
  ) => {
    startTransition(async () => {
      const result = await createOrder(data);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        });
        router.push("/admin/orders");
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
    <ContentLayout title="Create Order">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onCreateOrderSubmit)}
          className="space-y-8 mt-7"
        >
          <div className="mb-8 flex justify-between">
            <div className="">
              <h1 className="text-2xl font-bold mb-2">
                Create New Inspection Order
              </h1>
              <p className="text-gray-600">
                Please fill out the details below to create a new inspection
                order.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/admin/orders">
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </Link>

              <LoadingButton
                onClick={() => handleSubmit(onCreateOrderSubmit)()}
                disabled={isPending}
                loading={isPending}
                className="py-2 text-xs h-8"
                size="sm"
              >
                Create Order
              </LoadingButton>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Provide the customer's details or create a new customer profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-12">
                <div className="col-span-4">
                  <FormField
                    control={control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Customer</FormLabel>
                        <FormControl>
                          <Popover
                            open={openUserComboBox}
                            onOpenChange={setOpenUserComboBox}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openUserComboBox}
                                className="w-full justify-between"
                              >
                                {field.value ? (
                                  users?.find((user) => user.id === field.value)
                                    ?.email
                                ) : (
                                  <span className="text-muted-foreground">
                                    Select a customer
                                  </span>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[350px] p-0">
                              <Command>
                                <CommandInput placeholder="Search customers..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No customers found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {users?.map((user) => (
                                      <CommandItem
                                        key={user.id}
                                        value={user.email}
                                        onSelect={() => {
                                          field.onChange(user.id);
                                          setOpenUserComboBox(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === user.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {user.email}
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

                <div className="col-span-2 mt-8">
                  <CreateUserForOrder />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inspection Details</CardTitle>
              <CardDescription>
                Specify the date, time, and assigned engineer for the
                inspection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-12">
                <div className="col-span-3">
                  <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
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
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <FormField
                    control={control}
                    name="inspectionTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inspection time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MORNING">
                              08:00 AM - 12:00 PM
                            </SelectItem>
                            <SelectItem value="AFTERNOON">
                              12:00 PM - 04:00 PM
                            </SelectItem>
                            <SelectItem value="EVENING">
                              04:00 PM - 08:00 PM
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6"></div>

                <div className="col-span-3">
                  <FormField
                    control={control}
                    name="assignedEngineer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Engineer</FormLabel>
                        <FormControl>
                          <Popover
                            open={openEngineerComboBox}
                            onOpenChange={setOpenEngineerComboBox}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openEngineerComboBox}
                                className="w-full justify-between"
                              >
                                {field.value ? (
                                  engineers?.find(
                                    (engineer) => engineer.id === field.value
                                  )?.email
                                ) : (
                                  <span className="text-muted-foreground">
                                    Select an engineer
                                  </span>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                              <Command>
                                <CommandInput placeholder="Search engineers..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No engineers found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {engineers?.map((engineer) => (
                                      <CommandItem
                                        key={engineer.id}
                                        value={engineer.email}
                                        onSelect={() => {
                                          field.onChange(engineer.id);
                                          setOpenEngineerComboBox(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === engineer.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {engineer.email}
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>
                Provide details about the property and parking situation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-12">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="isParkingAvailable"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is Parking Available?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            value={field.value ? "true" : "false"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-3">
                  <FormField
                    control={control}
                    name="isCongestionZone"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is Property in Congestion Zone?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            value={field.value ? "true" : "false"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                Select the services to be performed during the inspection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {serviceFields.map((field, index) => (
                <div key={field.id} className="grid gap-4 sm:grid-cols-12 mb-4">
                  <div className="col-span-3">
                    <FormField
                      control={control}
                      name={`services.${index}.serviceId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service {index + 1}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services?.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeService(index)}
                      disabled={serviceFields.length === 1}
                      className="mt-8"
                    >
                      <Trash className="h-4 w-4 " />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => appendService({ serviceId: "" })}
              >
                Add Service
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Choose the preferred payment method for this order.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12">
                <div className="col-span-3">
                  <FormField
                    control={control}
                    name="PaymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CASH_TO_ENGINEER">
                              Cash To Engineer
                            </SelectItem>
                            <SelectItem value="BANK_TRANSFER">
                              Bank Transfer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </ContentLayout>
  );
}
