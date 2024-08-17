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
import TableEmpty from "@/components/table-empty";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function OrderList() {
  const { orders, pagination } = await getOrders();

  // await sleep(10000);

  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Invoice</TableHead>
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

            {orders.length > 0 ? (
              <TableBody>
                {orders.map((order) => (
                  <OrderTableRow key={order.id} order={order} />
                ))}
              </TableBody>
            ) : (
              <TableEmpty colSpan={7} />
            )}
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{orders.length}</strong> of{" "}
            <strong>{pagination.totalCount}</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
