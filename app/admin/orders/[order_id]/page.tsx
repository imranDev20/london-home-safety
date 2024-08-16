import { getOrdersById } from "../actions";
import EditOrderForm from "./_components/edit-order-form";

export default async function AdminEditOrderPage({
  params: { order_id },
}: {
  params: {
    order_id: string;
  };
}) {
  const order = await getOrdersById(order_id);

  return <EditOrderForm orderDetails={order} />;
}
