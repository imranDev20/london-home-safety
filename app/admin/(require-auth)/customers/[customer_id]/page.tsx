import { getCustomerById, getOrdersByUsers } from "../actions";
import EditCustomerForm from "./_components/edit-customer-form";

export default async function AdminCustomerDetailsPage({
  params,
}: {
  params: {
    customer_id: string;
  };
}) {
  const { customer_id } = params;
  const customer = await getCustomerById(customer_id);

  return (
    <>
      <EditCustomerForm user={customer} />
    </>
  );
}
