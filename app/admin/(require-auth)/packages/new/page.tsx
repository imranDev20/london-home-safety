import React from "react";
import PackageForm from "../_components/package-form";
import { ContentLayout } from "../../_components/content-layout";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

export default function AdminCreateServicePage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Packages", href: "/admin/packages" },
    {
      label: "Create Package",
      href: "/admin/packages/new",
      isCurrentPage: true,
    },
  ];

  return (
    <ContentLayout title="Create Package">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <PackageForm />
    </ContentLayout>
  );
}
