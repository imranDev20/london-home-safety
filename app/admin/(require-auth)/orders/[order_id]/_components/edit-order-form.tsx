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
  Bed,
  Building,
  Building2,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronsUpDown,
  Clock,
  Copyright,
  Home,
  House,
  Mail,
  Map,
  Package,
  Phone,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { updateOrder, updateOrderStatus } from "../actions";
import ServiceTableRow from "./service-table-row";
import generateInvoice from "../../actions";
import SendEmailDialog from "./send-email-dialog";

export default function EditOrderForm({
  orderDetails,
  engineers,
}: {
  orderDetails: OrderWithRelation | null;
  engineers: StaffWithRelations[] | null;
}) {
  const { toast } = useToast();
  const [openAssignedEngineers, setOpenAssignedEngineers] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(
    orderDetails?.assignedEngineerId ?? ""
  );
  const [status, setStatus] = useState(orderDetails?.status ?? "");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    {
      label: `Edit ${orderDetails?.invoiceId}`,
      href: `/admin/orders/${orderDetails?.invoiceId}`,
      isCurrentPage: true,
    },
  ];

  const downloadInvoice = async () => {
    setLoading(true);
    try {
      if (orderDetails?.id) {
        const response = await generateInvoice(orderDetails.id);
        if (response?.success && response.data) {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `invoice_${orderDetails.invoiceId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          toast({
            title: "Error",
            description: "Failed to download invoice",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast({
        title: "Error",
        description: "Failed to download invoice",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = (value: string) => {
    startTransition(async () => {
      if (orderDetails?.id) {
        setStatus(value);
        const result = await updateOrderStatus(orderDetails.id, value);
        toast({
          title: result.success ? "Success" : "Error",
          description: result.message,
          variant: result.success ? "success" : "destructive",
        });
      }
    });
  };

  const handleSelectEngineer = (engineerId: string) => {
    setSelectedEngineer(engineerId);
    startTransition(async () => {
      if (orderDetails?.id) {
        const result = await updateOrder(orderDetails.id, engineerId);
        setOpenAssignedEngineers(false);
        toast({
          title: result.success ? "Success" : "Error",
          description: result.message,
          variant: result.success ? "success" : "destructive",
        });
      }
    });
  };

  return (
    <ContentLayout title="Edit Order">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {`Edit ${orderDetails?.invoiceId}`}
          </h1>
          <Badge variant="outline">{orderDetails?.status || status}</Badge>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={status} onValueChange={handleUpdateOrderStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
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
          <Button onClick={downloadInvoice} disabled={loading || isPending}>
            {loading ? "Generating..." : "Download Invoice"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Assigned Engineers</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Popover
                  open={openAssignedEngineers}
                  onOpenChange={setOpenAssignedEngineers}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openAssignedEngineers}
                      className="w-full sm:w-[400px] justify-between"
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
                              onSelect={() => handleSelectEngineer(engineer.id)}
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

                <SendEmailDialog />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              {orderDetails?.services && orderDetails.services.length > 0 ? (
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
                    {orderDetails.services.map((service) => (
                      <ServiceTableRow service={service} key={service?.id} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No services added
                  </h3>
                  <p className="text-sm text-gray-500">
                    There are no services associated with this order.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Schedule Info</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {orderDetails?.date
                      ? dayjs(new Date(orderDetails.date)).format("DD MMM YYYY")
                      : "Date not available"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm">
                    {orderDetails?.inspectionTime ?? "Time not set"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
              <p className="text-gray-700">
                {orderDetails?.orderNotes || "No notes available"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarFallback>
                  {orderDetails?.user?.name?.charAt(0) ?? "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{orderDetails?.user.name}</p>
                <p className="text-sm text-gray-500">
                  {orderDetails?.user.email}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{orderDetails?.user?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-gray-500 mt-1" />
                <span>
                  {orderDetails?.user?.address?.street &&
                    `${orderDetails.user.address.street}, `}
                  {orderDetails?.user?.address?.city &&
                    `${orderDetails.user.address.city} `}
                  {orderDetails?.user?.address?.postcode}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                {orderDetails?.propertyType === "RESIDENTIAL" ? (
                  <Home className="h-5 w-5 text-gray-500" />
                ) : (
                  <Building className="h-5 w-5 text-gray-500" />
                )}
                <span>{orderDetails?.propertyType || "N/A"}</span>
              </div>
              {orderDetails?.propertyType === "RESIDENTIAL" && (
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-500" />
                  <span>{orderDetails?.residentialType || "N/A"}</span>
                </div>
              )}
              {orderDetails?.propertyType === "COMMERCIAL" && (
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-gray-500" />
                  <span>{orderDetails?.commercialType || "N/A"}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CarFront className="h-5 w-5 text-gray-500" />
                <span>
                  {orderDetails?.parkingOptions === "PAID"
                    ? "Paid parking available"
                    : orderDetails?.parkingOptions === "NO"
                    ? "No parking available"
                    : "Free parking available"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Copyright className="h-5 w-5 text-gray-500" />
                <span>
                  {orderDetails?.isCongestionZone
                    ? "In Congestion Zone"
                    : "Outside Congestion Zone"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Activity</h2>
            {/* Add order activity content here */}
            <p className="text-gray-500">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

// <Card>
//   <CardContent className="p-6">
//     <h2 className="text-xl font-semibold mb-4">Assigned Engineer</h2>
//     <div className="space-y-4">
//       <div className="flex items-center space-x-3">
//         <Avatar className="h-10 w-10">
//           <AvatarFallback>
//             {selectedEngineer
//               ? engineers?.find(e => e.id === selectedEngineer)?.name.charAt(0)
//               : 'E'}
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <p className="text-sm font-medium">
//             {selectedEngineer
//               ? engineers?.find(e => e.id === selectedEngineer)?.name
//               : 'No engineer assigned'}
//           </p>
//           {selectedEngineer && (
//             <p className="text-xs text-gray-500">
//               {engineers?.find(e => e.id === selectedEngineer)?.email}
//             </p>
//           )}
//         </div>
//       </div>

//       <Popover open={openAssignedEngineers} onOpenChange={setOpenAssignedEngineers}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={openAssignedEngineers}
//             className="w-full justify-between"
//           >
//             {selectedEngineer
//               ? "Change Engineer"
//               : "Assign Engineer"}
//             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[300px] p-0">
//           <Command>
//             <CommandInput placeholder="Search engineers..." />
//             <CommandList>
//               <CommandEmpty>No engineer found.</CommandEmpty>
//               <CommandGroup>
//                 {engineers?.map((engineer) => (
//                   <CommandItem
//                     key={engineer.id}
//                     value={engineer.id}
//                     onSelect={() => handleSelectEngineer(engineer.id)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         engineer.id === selectedEngineer ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                     {engineer.name}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>

//       {selectedEngineer && (
//         <Button variant="outline" className="w-full" onClick={() => handleSelectEngineer("")}>
//           <UserMinus className="mr-2 h-4 w-4" />
//           Remove Assignment
//         </Button>
//       )}

//       <Button variant="outline" className="w-full">
//         <Mail className="mr-2 h-4 w-4" />
//         Send Email to Engineer
//       </Button>
//     </div>
//   </CardContent>
// </Card>
