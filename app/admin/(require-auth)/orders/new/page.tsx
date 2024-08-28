import { generateInvoiceId } from "@/lib/generate-invoice";
import { getEngineers, getServices, getCustomers } from "../[order_id]/actions";
import CreateOrderForm from "./_components/create-order-form";

export default async function AdminCreateOrderPage() {
  const customers = await getCustomers();
  const engineers = await getEngineers();
  const services = await getServices();
  const invoiceId = await generateInvoiceId();

  return (
    <CreateOrderForm
      customers={customers}
      engineers={engineers}
      services={services}
      invoiceId={invoiceId}
    />
  );
}
