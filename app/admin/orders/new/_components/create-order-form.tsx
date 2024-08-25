"use client";

import { ContentLayout } from "@/app/admin/_components/content-layout";
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openServiceComboBox, setOpenServiceComboBox] =
    useState<boolean>(false);
  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray<CreateOrderFormInput>({
    control,
    name: "services",
  });
  const {toast} = useToast();
  const router = useRouter();
  const onCreateOrderSubmit: SubmitHandler<CreateOrderFormInput> = async (
    data
  ) => {
    console.log(`data`, data);
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
        <form onSubmit={handleSubmit(onCreateOrderSubmit)}>
          <div className="flex items-center gap-4 mb-5 mt-7">
            <Link href="/admin/orders">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Order
            </h1>
            <FormField
              control={control}
              name="invoiceId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <LoadingButton
                type="submit"
                disabled={isPending}
                size="sm"
                loading={isPending}
                className="text-xs font-semibold h-8"
              >
                Save Order
              </LoadingButton>
            </div>
          </div>

          <div className="grid grid-cols-[800px] items-center justify-center">
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
                <CardDescription>Please provide user details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 grid-cols-2">
                  <FormField
                    control={control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
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
                                className="w-[350px] justify-between"
                              >
                                {field.value ? (
                                  users?.find((user) => user.id === field.value)
                                    ?.email
                                ) : (
                                  <p className="text-muted-foreground">
                                    Select a user
                                  </p>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[350px] p-0">
                              <Command>
                                <CommandInput placeholder="Search users..." />
                                <CommandList>
                                  <CommandEmpty>No users found.</CommandEmpty>
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
                  <CreateUserForOrder />
                </div>
                <div className="grid gap-3 grid-cols-1  mt-4">
                  <h1 className="font-semibold">Assigned Engineer</h1>
                  <FormField
                    control={control}
                    name="assignedEngineer"
                    render={({ field }) => (
                      <FormItem>
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
                                  <p className="text-muted-foreground">
                                    Select a engineer
                                  </p>
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full  p-0">
                              <Command>
                                <CommandInput placeholder="Search engineer..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No engineer found.
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
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                  <h1 className="font-semibold col-span-2">Date & Time</h1>
                  <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
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
                  <FormField
                    control={control}
                    name="inspectionTime"
                    render={({ field }) => (
                      <FormItem>
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
                              04:00 AM - 08:00 PM
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="font-semibold mb-4">
                      Select Parking Options
                    </h1>
                    <FormField
                      control={form.control}
                      name="isParkingAvailable"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
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
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="false" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold mb-4">
                      Is property in congestion zone?
                    </h1>
                    <FormField
                      control={control}
                      name="isCongestionZone"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
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
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="false" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <h1 className="font-semibold mb-4">Services</h1>
                  <div className="">
                    {serviceFields.map((field, index) => (
                      <div key={field.id} className="grid gap-3 sm:grid-cols-8">
                        <div className="grid gap-3 col-span-7">
                          <FormField
                            control={control}
                            name={`services.${index}.serviceId`}
                            render={({ field }) => (
                              <FormItem className="my-2">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {services?.map((service) => (
                                        <SelectItem
                                          key={service.id}
                                          value={service.id}
                                        >
                                          {service.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3 col-span-1">
                          <Button
                            variant="ghost"
                            type="button"
                            disabled={serviceFields.length <= 1}
                            onClick={() => removeService(index)}
                          >
                            <Trash className="w-4 h-4 text-primary" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Button
                        type="button"
                        onClick={() => appendService({ serviceId: "" })}
                        className="mt-4"
                      >
                        Add New Service
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold mb-4">Payment Method</h1>
                  <FormField
                    control={control}
                    name="PaymentMethod"
                    render={({ field }) => (
                      <FormItem>
                       
                        <Select
                          onValueChange={field.onChange}                         
                        >
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
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
}
