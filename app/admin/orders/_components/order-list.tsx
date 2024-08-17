import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./order-table-row";
import TableEmpty from "@/components/table-empty";
import { OrderWithRelation, Pagination } from "@/types/order";

export default async function OrderList({
  orders,
  pagination,
}: {
  orders: OrderWithRelation[];
  pagination: Pagination;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="p-0">
        {" "}
        {/* Remove padding from CardContent */}
        <div className="overflow-hidden">
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
          </Table>
        </div>
        <div className="overflow-auto h-[calc(100vh-380px)]">
          <Table>
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
        </div>
      </CardContent>
      {/* <CardFooter>
        <div className="text-xs text-muted-foreground pt-3">
          Showing <strong>{orders.length}</strong> of{" "}
          <strong>{pagination.totalCount}</strong> products
        </div>
      </CardFooter> */}
    </Card>
  );
}
