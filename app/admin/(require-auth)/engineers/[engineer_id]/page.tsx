import React from "react";
import EditCustomerForm from "../../customers/[customer_id]/_components/edit-user-form";
import { getEngineerById } from "../actions";
import SingleEntryNotFound from "@/components/single-entry-notfound";

export default async function EditEngineerPage({
  params,
}: {
  params: {
    engineer_id: string;
  };
}) {
  const { engineer_id } = params;
  const engineer = await getEngineerById(engineer_id);

  if (!engineer) {
    return <SingleEntryNotFound entryId={engineer_id} name="engineer" />;
  }

  return (
    <>
      <EditCustomerForm user={engineer} />
    </>
  );
}
