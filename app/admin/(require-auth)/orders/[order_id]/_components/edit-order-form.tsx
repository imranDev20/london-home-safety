"use client";

import { ContentLayout } from "@/app/admin/(require-auth)/_components/content-layout";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ORDER_STATUS_OPTIONS } from "@/lib/constants";
import { cn, kebabToNormal } from "@/lib/utils";
import { StaffWithRelations } from "@/types/engineers";
import { OrderWithRelation } from "@/types/order";

import dayjs from "dayjs";
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
  Mail,
  Map,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { updateOrder, updateOrderStatus } from "../actions";
import ServiceTableRow from "./service-table-row";
import generateInvoice from "../../actions";

export default function EditOrderForm({
  orderDetails,
  engineers,
}: {
  orderDetails: OrderWithRelation | null;
  engineers: StaffWithRelations[] | null;
}) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    {
      label: `Edit ${orderDetails?.invoiceId}`,
      href: `/admin/orders/${orderDetails?.invoiceId}`,
      isCurrentPage: true,
    },
  ];

  const { toast } = useToast();
  const [openAssignedEngineers, setOpenAssignedEngineers] =
    useState<boolean>(false);
  const [selectedEngineer, setSelectedEngineer] = useState<string>(
    orderDetails?.assignedEngineerId ?? ""
  );
  const [status, setStatus] = useState<string>(orderDetails?.status ?? "");
  const [isEngineerPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const downloadInvoice = async () => {
    setLoading(true);
    try {
      if (orderDetails?.id) {
        const response = await generateInvoice(orderDetails?.id);
        console.log(`response`, response);

        if (response?.success && response.data) {
          const blob = new Blob([response?.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `invoice_${orderDetails?.invoiceId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Failed to download invoice");
        }
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Edit Order">
      <DynamicBreadcrumb items={breadcrumbItems} />

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
          {orderDetails?.status || status}
        </Badge>

        <div className="hidden md:flex ml-auto gap-4">
          <Select
            value={status}
            onValueChange={(value) => {
              startTransition(async () => {
                if (orderDetails?.id) {
                  setStatus(value);
                  const result = await updateOrderStatus(
                    orderDetails?.id,
                    value
                  );
                  if (result.success) {
                    toast({
                      title: "Success",
                      description: result.message,
                      variant: "success",
                    });
                  } else {
                    toast({
                      title: "Error",
                      description: result.message,
                      variant: "destructive",
                    });
                  }
                }
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <SelectItem value={option} key={option}>
                    {kebabToNormal(option)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={() => downloadInvoice()}
            disabled={loading}
            type="button"
          >
            {loading ? "Generating..." : "Download Invoice"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <div>
            <h2 className="font-semibold text-lg mb-4">Assigned Engineers</h2>
            <div className="flex gap-4">
              <Popover
                open={openAssignedEngineers}
                onOpenChange={setOpenAssignedEngineers}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openAssignedEngineers}
                    className={cn(
                      "w-[400px] justify-between",
                      !selectedEngineer && "text-muted-foreground"
                    )}
                  >
                    {selectedEngineer
                      ? engineers?.find(
                          (engineer) => engineer.id === selectedEngineer
                        )?.name
                      : "Select engineer"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search engineer..." />
                    <CommandList>
                      <CommandEmpty>No engineer found.</CommandEmpty>
                      <CommandGroup>
                        {engineers?.map((engineer) => (
                          <CommandItem
                            value={engineer.id}
                            key={engineer.id}
                            onSelect={() => {
                              setSelectedEngineer(engineer?.id);
                              startTransition(async () => {
                                if (orderDetails?.id) {
                                  const updateEngineer = await updateOrder(
                                    orderDetails?.id,
                                    engineer.id
                                  );
                                  if (updateEngineer.success) {
                                    setOpenAssignedEngineers(false);
                                    toast({
                                      title: "Success",
                                      description: updateEngineer.message,
                                      variant: "success",
                                    });
                                  } else {
                                    toast({
                                      title: "Error",
                                      description: updateEngineer.message,
                                      variant: "destructive",
                                    });
                                  }
                                }
                              });
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                engineer.id === selectedEngineer
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {engineer.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button variant="outline" type="button" className="flex gap-2">
                <Mail size={14} />
                Send Email
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Property Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails?.services.map((service) => (
                  <ServiceTableRow service={service} key={service?.id} />
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
                  <span>
                    {orderDetails?.date
                      ? dayjs(new Date(orderDetails.date)).format("DD MMM YYYY")
                      : "Date not available"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>
                    <Clock size={20} />
                  </span>
                  <span>{orderDetails?.inspectionTime ?? ""}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="">
              <h2 className="font-semibold text-lg mb-4">Customer Details</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex">
                    <Avatar className="mr-3">
                      <AvatarFallback>
                        {orderDetails?.user?.name?.charAt(0) ?? "A"}
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
                      {orderDetails?.user?.address?.city
                        ? orderDetails?.user?.address?.city + " "
                        : ""}
                      {orderDetails?.user?.address?.postcode}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg mb-4">Property Details</h2>
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
                  <div className="text-sm  font-semibold ps-2 mt-2 flex gap-2">
                    <span>
                      <CarFront className="text-gray-500" size={20} />
                    </span>
                    <span>
                      {orderDetails?.parkingOptions === "PAID"
                        ? "Paid parking available"
                        : orderDetails?.parkingOptions === "NO"
                        ? "No parking available"
                        : "Free parking available"}
                    </span>
                  </div>
                  <div className="text-sm  font-semibold ps-2 mt-2 flex gap-2">
                    <span>
                      <Copyright className="text-gray-500" size={20} />
                    </span>
                    <span>
                      {orderDetails?.isCongestionZone
                        ? "In Congestion Zone"
                        : "Outside Congestion Zone"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg mb-4">Order Activity</h2>
              <Card>
                <CardContent className="p-4"></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
