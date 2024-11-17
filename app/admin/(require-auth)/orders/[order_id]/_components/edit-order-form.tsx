"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTION } from "@/lib/constants";
import { calculateSubtotal, calculateTotal, toTitleCase } from "@/lib/utils";
import { StaffWithRelations } from "@/types/engineers";
import { OrderWithRelation } from "@/types/order";

import dayjs from "dayjs";
import {
  Bed,
  Building,
  CalendarClock,
  CalendarDays,
  CarFront,
  ChevronLeft,
  Clock,
  Copyright,
  CreditCard,
  Download,
  Home,
  Loader2,
  Map,
  Package,
  Phone,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { sendOrderStatusEmail } from "../../../customers/actions";
import generateInvoice from "../../actions";
import { updateOrder } from "../actions";
import PackageTableRow from "./package-table-row";

import { LoadingButton } from "@/components/ui/loading-button";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import EngineerSelection from "./engineer-selection";

export default function EditOrderForm({
  orderDetails,
  engineers,
}: {
  orderDetails: OrderWithRelation;
  engineers: StaffWithRelations[] | null;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState<OrderStatus>(orderDetails.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    orderDetails.paymentStatus
  );
  const [isPending, startTransition] = useTransition();

  const subtotal = calculateSubtotal(orderDetails);
  const total = calculateTotal(orderDetails);

  const handleUpdateOrderStatus = (value: OrderStatus) => {
    startTransition(async () => {
      if (!orderDetails?.id) return;

      // Update local state and order status
      setStatus(value);
      const result = await updateOrder({
        orderId: orderDetails.id,
        orderStatus: value,
      });

      // Show update result toast
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "success" : "destructive",
      });

      // Send email notifications for specific status changes
      if (["CONFIRMED", "COMPLETED", "CANCELLED"].includes(value)) {
        const emailResult = await sendOrderStatusEmail({
          receiver: orderDetails.user.email,
          orderDetails: {
            ...orderDetails,
            status: value,
          },
        });

        // Only show toast if email fails
        if (!emailResult.success) {
          toast({
            title: "Warning",
            description: "Order updated but email notification failed to send",
            variant: "destructive",
          });
        }
      }
    });
  };

  const handleUpdatePaymentStatus = (value: PaymentStatus) => {
    startTransition(async () => {
      if (orderDetails?.id) {
        setPaymentStatus(value);
        const result = await updateOrder({
          orderId: orderDetails?.id,
          paymentStatus: value,
        });
        toast({
          title: result.success ? "Success" : "Error",
          description: result.message,
          variant: result.success ? "success" : "destructive",
        });
      }
    });
  };

  const handleDownloadInvoice = async () => {
    try {
      setIsLoading(true);
      const response = await generateInvoice(orderDetails.id);

      if (!response?.data) {
        throw new Error();
      }

      const binaryString = atob(response.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob from the binary data
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${orderDetails.invoice}`;
      a.click();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 mt-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/orders">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to Orders</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{`Edit Order #${orderDetails.invoice}`}</h1>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Select
              value={status as OrderStatus}
              onValueChange={(value) => {
                if (value) {
                  handleUpdateOrderStatus(value as OrderStatus);
                }
              }}
              disabled={isPending}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Update Status" />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ORDER_STATUS_OPTIONS.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <LoadingButton
              onClick={handleDownloadInvoice}
              disabled={isLoading}
              loading={isLoading}
              className="h-9 text-sm font-medium flex whitespace-nowrap"
            >
              {!isLoading && <Download className="mr-2 h-4 w-4" />}
              Download Invoice
            </LoadingButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EngineerSelection
            engineers={engineers}
            orderDetails={orderDetails}
          />

          {/* Order items */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Items</h2>
              {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 ">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-gray-500">
                            Service Name
                          </TableHead>
                          <TableHead className="text-gray-500">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderDetails.cartItems.map((cartItem) => (
                          <PackageTableRow
                            cartItem={cartItem}
                            key={cartItem?.id}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm text-gray-500">
                          Payment Method
                        </span>
                      </div>
                      <span className="font-medium">
                        {toTitleCase(
                          orderDetails.paymentMethod.replaceAll("_", " ")
                        )}
                      </span>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm text-gray-500">
                          Payment Status
                        </span>
                      </div>
                      <Select
                        value={paymentStatus as PaymentStatus}
                        onValueChange={(value) => {
                          if (value) {
                            handleUpdatePaymentStatus(value as PaymentStatus);
                          }
                        }}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          {isPending ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Updating...</span>
                            </div>
                          ) : (
                            <SelectValue placeholder="Update Payment Status" />
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {PAYMENT_STATUS_OPTION.map((option) => (
                              <SelectItem value={option} key={option}>
                                {option.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">£{subtotal}</span>
                    </div>
                    {orderDetails.isCongestionZone && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          Congestion Zone Fee
                        </span>
                        <span className="font-medium">
                          £{CONGESTION_FEE.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {orderDetails.parkingOptions !== "FREE" && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Parking Fee</span>
                        <span className="font-medium">
                          £{PARKING_FEE.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-lg">£{total}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                    <Package className="h-8 w-8 text-primary" />
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

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
              <p className="text-gray-700">
                {orderDetails?.orderNotes || "No notes available"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Schedule Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Schedule Info</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Appointment Date
                    </p>
                    <p className="font-medium">
                      {orderDetails?.date
                        ? dayjs(new Date(orderDetails.date)).format(
                            "DD MMM YYYY"
                          )
                        : "Date not available"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Session</p>
                    <p className="font-medium">
                      {orderDetails?.timeSlot?.slotType ?? "Time not set"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <CalendarClock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Order Placed</p>
                    <p className="font-medium">
                      {dayjs(new Date(orderDetails.createdAt)).format(
                        "DD MMM YYYY, HH:mm A"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Customer Details</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white">
                        {orderDetails?.user?.name?.charAt(0) ?? "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{`${orderDetails?.user.firstName} ${orderDetails.user.lastName}`}</p>
                    <p className="text-sm text-gray-500">
                      {orderDetails?.user.email}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-medium">
                      {orderDetails?.user?.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Map className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="font-medium">
                      {orderDetails?.user?.address?.street &&
                        `${orderDetails.user.address.street}, `}
                      {orderDetails?.user?.address?.city &&
                        `${orderDetails.user.address.city} `}
                      {orderDetails?.user?.address?.postcode}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Property Details</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    {orderDetails?.propertyType === "RESIDENTIAL" ? (
                      <Home className="h-5 w-5 text-primary" />
                    ) : (
                      <Building className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Property Type</p>
                    <p className="font-medium">
                      {toTitleCase(orderDetails?.propertyType) || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <CarFront className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">Parking Status</p>
                    <p className="font-medium">
                      {orderDetails?.parkingOptions === "PAID"
                        ? "Paid Parking Available"
                        : orderDetails?.parkingOptions === "NO"
                        ? "No Parking Available"
                        : "Free Parking Available"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Copyright className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Congestion Zone
                    </p>
                    <p className="font-medium">
                      {orderDetails?.isCongestionZone
                        ? "In Congestion Zone"
                        : "Outside Congestion Zone"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
