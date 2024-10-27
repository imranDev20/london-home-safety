import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { ContentLayout } from "../../_components/content-layout";
import PackageForm from "../_components/package-form";
import { getPackageById } from "../actions";

export default async function EditPackagePage({
  params: { package_id },
}: {
  params: {
    package_id: string;
  };
}) {
  const packageData = await getPackageById(package_id);

  if (!packageData.success || !packageData.data) {
    return <div>Package not found or an error occurred.</div>;
  }

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Packages", href: "/admin/packages" },
    {
      label: `Edit ${packageData.data.name}`,
      href: `/admin/packages/${packageData.data.id}`,
      isCurrentPage: true,
    },
  ];

  return (
    <ContentLayout title={`Edit ${packageData.data.name}`}>
      <DynamicBreadcrumb items={breadcrumbItems} />
      <PackageForm packageDetails={packageData.data} />
    </ContentLayout>
  );
}
