import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./order-table-row";
import { getOrders } from "../actions";

export default async function OrderList() {
  const orders = await getOrders();

  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Cost</TableHead>
                <TableHead className="hidden md:table-cell w-[23%]">
                  Address
                </TableHead>
                <TableHead className="hidden md:table-cell w-[18%]">
                  Created at
                </TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <OrderTableRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
