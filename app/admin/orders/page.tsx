import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { ContentLayout } from "../_components/content-layout";
import OrderList from "./_components/order-list";
import OrderTableHeader from "./_components/order-table-header";
import { OrderPagination } from "./_components/order-pagination";
import { Suspense } from "react";
import OrdersLoading from "./_components/orders-loading";
import { getOrders } from "./actions";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Orders", href: "/admin/orders", isCurrentPage: true },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: string;
  };
}) {
  const { search, page } = searchParams;
  const { orders, pagination } = await getOrders(
    parseInt(page) || 1,
    10,
    search
  );

  console.log(page);

  return (
    <ContentLayout title="Orders">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <OrderTableHeader />
      <Suspense fallback={<OrdersLoading />}>
        <OrderList orders={orders} pagination={pagination} />
      </Suspense>

      <OrderPagination orders={orders} pagination={pagination} />
    </ContentLayout>
  );
}
