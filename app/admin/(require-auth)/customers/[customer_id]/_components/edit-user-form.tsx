"use client";

import { ContentLayout } from "@/app/admin/(require-auth)/_components/content-layout";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Order, Prisma } from "@prisma/client";
import { AlertCircle, Calendar, Mail, MapPin, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type CustomerWithOrders = Prisma.UserGetPayload<{
  include: {
    address: true;
    orders: true;
  };
}>;

export type EngineerWithAssignedOrders = Prisma.UserGetPayload<{
  include: {
    address: true;
    assignedOrders: true;
  };
}>;

export default function EditCustomerForm({
  user,
}: {
  user: CustomerWithOrders | EngineerWithAssignedOrders;
}) {
  const orders =
    user?.role === "CUSTOMER"
      ? (user as CustomerWithOrders)?.orders
      : (user as EngineerWithAssignedOrders)?.assignedOrders;

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    {
      label: user.role === "CUSTOMER" ? "Customers" : "Engineers",
      href: user.role === "CUSTOMER" ? "/admin/customers" : "/admin/engineers",
    },
    {
      label: `Edit ${user.name}`,
      href:
        user.role === "CUSTOMER"
          ? `/admin/customers/${user.id}`
          : `/admin/engineers/${user.id}`,
      isCurrentPage: true,
    },
  ];

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  );
  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const cancelledOrders = orders.filter(
    (order) => order.status === "CANCELLED"
  );

  const infoItems = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone || "N/A" },
    {
      icon: MapPin,
      label: "Address",
      value: user.address
        ? `${user.address.street}, ${user.address.city}, ${user.address.postcode}`
        : "N/A",
    },
    {
      icon: Calendar,
      label: "Joined",
      value: format(new Date(user.createdAt), "dd MMMM yyyy"),
    },
  ];

  return (
    <ContentLayout
      title={`${user.role === "STAFF" ? "Engineer" : "Customer"}: ${user.name}`}
    >
      <DynamicBreadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard title="Total Spent" value={`£${totalSpent.toFixed(2)}`} />
        <StatCard title="Completed Orders" value={completedOrders.length} />
        <StatCard title="Pending Orders" value={pendingOrders.length} />
        <StatCard title="Cancelled Orders" value={cancelledOrders.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.invoiceId}</TableCell>
                    <TableCell>
                      {format(new Date(order.date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>£{order.totalPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {infoItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <item.icon className="h-5 w-5 text-gray-400 mr-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

function LoadingState({ breadcrumbItems }: any) {
  return (
    <ContentLayout title="Loading Customer Details...">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[180px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-[100px] mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

function ErrorState({ breadcrumbItems, error }: any) {
  return (
    <ContentLayout title="Error Loading Customer Details">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 text-center mb-4">
            {error ||
              "We couldn't load the customer details. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}

function StatCard({ title, value }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function OrderStatusBadge({ status }: any) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  } as any;

  return (
    <Badge className={`${statusColors[status]} px-2 py-1 text-xs font-medium`}>
      {status.replace("_", " ")}
    </Badge>
  );
}
