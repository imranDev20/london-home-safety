import { generateInvoiceId } from "@/lib/generate-invoice";
import { getEngineers, getServices, getUsers } from "../[order_id]/actions";
import CreateOrderForm from "./_components/create-order-form";

export default async function AdminCreateOrderPage() {
  const users = await getUsers();
  const engineers = await getEngineers();
  const services = await getServices();
  const invoiceId = await generateInvoiceId();

  return (
    <CreateOrderForm
      users={users}
      engineers={engineers}
      services={services}
      invoiceId={invoiceId}
    />
  );
}
