import { getCustomers, getEngineers, getPackages } from "../[order_id]/actions";
import CreateOrderForm from "./_components/create-order-form";
import { ContentLayout } from "../../_components/content-layout";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

export default async function AdminCreateOrderPage() {
  const customers = await getCustomers();
  const engineers = await getEngineers();
  const packages = await getPackages();

  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Orders",
      href: "/admin/orders",
    },
    {
      label: "Create Order",
      isCurrentPage: true,
    },
  ];

  return (
    <ContentLayout title="Create Order">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <CreateOrderForm
        customers={customers}
        engineers={engineers}
        packages={packages}
      />
    </ContentLayout>
  );
}
