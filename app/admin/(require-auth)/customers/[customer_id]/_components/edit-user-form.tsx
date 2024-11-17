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
import { Prisma } from "@prisma/client";
import {
  AlertCircle,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";

export type CustomerWithOrders = Prisma.UserGetPayload<{
  include: {
    address: true;
    orders: {
      include: {
        cartItems: true;
      };
    };
  };
}>;

export type EngineerWithAssignedOrders = Prisma.UserGetPayload<{
  include: {
    address: true;
    assignedOrders: {
      include: {
        cartItems: true;
      };
    };
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
      label: `Edit ${user.firstName} ${user.lastName}`,
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
  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PENDING" ||
      order.status === "IN_PROGRESS" ||
      order.status === "CONFIRMED"
  );
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

  // Add Expertise for Engineers
  if (user.role === "STAFF") {
    infoItems.push({
      icon: Wrench,
      label: "Expertise",
      value: (user as EngineerWithAssignedOrders).expertise || "N/A",
    });
  }

  return (
    <ContentLayout
      title={`${user.role === "STAFF" ? "Engineer" : "Customer"}: ${
        user.firstName
      } ${user.lastName}`}
    >
      <DynamicBreadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title={user.role === "CUSTOMER" ? "Total Spent" : "Total Earned"}
          value={`£${totalSpent.toFixed(2)}`}
        />
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
            {orders.length > 0 ? (
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
                      <TableCell>{order.invoice}</TableCell>
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
            ) : (
              <EmptyStateUI />
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </CardTitle>
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

function StatCard({ title, value }: { title: string; value: string | number }) {
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

function OrderStatusBadge({ status }: { status: string }) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  } as const;

  return (
    <Badge
      className={`${
        statusColors[status as keyof typeof statusColors]
      } px-2 py-1 text-xs font-medium`}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}

function EmptyStateUI() {
  return (
    <div className="text-center py-12">
      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders</h3>
      <p className="mt-1 text-sm text-gray-500">
        This user hasn&apos;t placed any orders yet.
      </p>
    </div>
  );
}
