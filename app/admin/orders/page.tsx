import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { ContentLayout } from "../_components/content-layout";
import OrderList from "./_components/order-list";
import OrderTableHeader from "./_components/order-table-header";
import { OrderPagination } from "./_components/order-pagination";
import { Suspense } from "react";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders", isCurrentPage: true },
];

export default function AdminOrdersPage() {
  return (
    <ContentLayout title="Orders">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <OrderTableHeader />
      <Suspense fallback="Loading...">
        <OrderList />
      </Suspense>
      <OrderPagination />
    </ContentLayout>
  );
}
