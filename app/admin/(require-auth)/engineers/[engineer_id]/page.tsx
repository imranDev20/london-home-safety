import React from "react";
import EditCustomerForm from "../../customers/[customer_id]/_components/edit-user-form";
import { getEngineerById } from "../actions";

export default async function EditEngineerPage({
  params,
}: {
  params: {
    engineer_id: string;
  };
}) {
  const { engineer_id } = params;
  const engineer = await getEngineerById(engineer_id);
  console.log(engineer_id);

  return (
    <>
      <EditCustomerForm user={engineer} />
    </>
  );
}
