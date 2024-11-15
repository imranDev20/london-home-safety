import { getOrderById } from "../actions";
import EditOrderForm from "./_components/edit-order-form";
import { getEngineersForOrder } from "./actions";
import NoOrderFound from "./_components/no-order-found";
import { ContentLayout } from "../../_components/content-layout";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

export default async function AdminEditOrderPage({
  params: { order_id },
}: {
  params: {
    order_id: string;
  };
}) {
  const order = await getOrderById(order_id);
  const engineers = await getEngineersForOrder();

  if (!order) {
    return <NoOrderFound />;
  }

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    {
      label: `Edit ${order.invoice}`,
      href: `/admin/orders/${order.invoice}`,
      isCurrentPage: true,
    },
  ];

  return (
    <ContentLayout title={`Edit Order ${order.invoice}`}>
      <DynamicBreadcrumb items={breadcrumbItems} />
      <EditOrderForm orderDetails={order} engineers={engineers} />
    </ContentLayout>
  );
}
