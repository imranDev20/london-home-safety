import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { ContentLayout } from "../_components/content-layout";
import { Suspense } from "react";
import { getPackages } from "./actions";
import PackageTableHeader from "./_components/package-table-header";
import ServiceLoading from "./_components/package-loading";
import { ServicePagination } from "./_components/package-pagination";
import ServiceList from "./_components/package-list";
import { PackageType } from "@prisma/client";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Packages", href: "/admin/packages", isCurrentPage: true },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: string;
    filter_status: PackageType;
  };
}) {
  const { search, page, filter_status } = searchParams;
  const { services, pagination } = await getPackages(
    parseInt(page) || 1,
    10,
    search,
    filter_status
  );

  return (
    <ContentLayout title="Services">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <PackageTableHeader />
      <Suspense fallback={<ServiceLoading />}>
        <ServiceList services={services} pagination={pagination} />
      </Suspense>
      <ServicePagination services={services} pagination={pagination} />
    </ContentLayout>
  );
}
