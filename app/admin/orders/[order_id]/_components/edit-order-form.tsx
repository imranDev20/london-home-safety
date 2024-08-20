"use client";

import { ContentLayout } from "@/app/admin/_components/content-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { OrderIdWithRelation } from "@/types/order";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormInput } from "../../schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  Clock,
  Copyright,
  House,
  Map,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { StaffWithRelations } from "@/types/engineers";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServiceTableRow from "./service-table-row";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function EditOrderForm({
  orderDetails,
  engineers,
}: {
  orderDetails: OrderIdWithRelation | null;
  engineers: StaffWithRelations[] | null;
}) {
  const [isPending, startTransaction] = useTransition();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    {
      label: `Edit ${orderDetails?.invoiceId}`,
      href: `/admin/orders/${orderDetails?.invoiceId}`,
      isCurrentPage: true,
    },
  ];

  const form = useForm<OrderFormInput>({
    defaultValues: {},
  });

  const { handleSubmit, reset, control } = form;

  const onEditOrderSubmit: SubmitHandler<OrderFormInput> = async () => {};
  const [openAssignedEngineers, setOpenAssignedEngineers] =
    useState<boolean>(false);
  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const;
  return (
    <ContentLayout title="Edit Order">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onEditOrderSubmit)}>
          <div className="flex items-center gap-4 mb-5 mt-7">
            <Link href="/admin/orders">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {`Edit ${orderDetails?.invoiceId}`}
            </h1>

            <Badge variant="outline" className="ml-auto sm:ml-0">
              {orderDetails?.status}
            </Badge>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                Discard
              </Button>

              <LoadingButton
                type="submit"
                disabled={isPending}
                size="sm"
                loading={isPending}
                className="text-xs font-semibold h-8"
              >
                Save Changes
              </LoadingButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Assigned Engineers
                </h2>
                {/* <FormField
                        control={control}
                        name="assignedEngineer"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Language</FormLabel>
                            <Popover 
                            open={openAssignedEngineers}
                            onOpenChange={setOpenAssignedEngineers}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openAssignedEngineers}
                                    className={cn(
                                      "w-[200px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? languages.find(
                                          (language) =>
                                            language.value === field.value
                                        )?.label
                                      : "Select language"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search language..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No language found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {languages.map((language) => (
                                        <CommandItem
                                          value={language.label}
                                          key={language.value}
                                          onSelect={() => {
                                            form.setValue(
                                              "assignedEngineer",
                                              language.value
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              language.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {language.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>                         
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
              </div>
              <div className="grid gap-3">
                <h2 className="font-semibold text-lg mb-4">Order Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails?.services.map((service) => (
                      <ServiceTableRow service={service} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <div className="">
                <h2 className="font-semibold text-lg mb-4">Schedule Info</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2 mb-4">
                      <span>
                        <CalendarDays size={20} />
                      </span>
                      <span></span>
                    </div>
                    <div className="flex gap-2">
                      <span>
                        <Clock size={20} />
                      </span>
                      <span></span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="">
                <h2 className="font-semibold text-lg mb-4">Orders Note</h2>
                <Card className="h-[200px]">
                  <CardContent className="p-3">
                    {orderDetails?.orderNotes}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="gird auto-rows-max items-star gap-4 lg:col-span-3 ">
              <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="">
                  <h2 className="font-semibold text-lg mb-4">
                    Customer Details
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex">
                        <Avatar className="mr-3">
                          <AvatarFallback>
                            {orderDetails?.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {orderDetails?.user.name}
                          </p>
                          <p className="text-xs text-gray-500 font-normal">
                            {orderDetails?.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-normal ps-2 mt-2">
                        <span>
                          <Phone size={20} />{" "}
                        </span>
                        {/* <span>{ orderDetails?.user?.phone}</span> */}
                      </div>
                      <div className="text-xs text-gray-500 font-semibold ps-2 mt-2 flex gap-2">
                        <span>
                          <Map size={20} />{" "}
                        </span>
                        <span>
                          {orderDetails?.user?.address?.street
                            ? orderDetails?.user?.address?.street + ", "
                            : ""}
                          {orderDetails?.user?.address?.city}
                          {" " + orderDetails?.user?.address?.postcode}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="">
                  <h2 className="font-semibold text-lg mb-4">
                    Property Details
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-xs text-gray-500 font-normal ps-2 mt-2">
                        <span>
                          <House size={20} />{" "}
                        </span>
                        {/* <span>{ orderDetails?.}</span> */}
                      </div>
                      <div className="text-xs text-gray-500 font-normal ps-2 mt-2 flex gap-2">
                        <span>
                          <Building2 size={20} />
                        </span>
                        <span></span>
                      </div>
                      <div className="text-xs text-gray-500 font-normal ps-2 mt-2 flex gap-2">
                        <span>
                          <CarFront size={20} />
                        </span>
                        <span></span>
                      </div>
                      <div className="text-xs text-gray-500 font-normal ps-2 mt-2 flex gap-2">
                        <span>
                          <Copyright size={20} />
                        </span>
                        <span></span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="">
                  <h2 className="font-semibold text-lg mb-4">
                  Order Activity
                  </h2>
                  <Card>
                    <CardContent className="p-4">
                   
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
}
