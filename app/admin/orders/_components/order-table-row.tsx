"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { OrderWithRelation } from "@/types/order";

export default function OrderTableRow({ order }: { order: OrderWithRelation }) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/admin/orders/${order.id}`)}
      className="hover:cursor-pointer"
    >
      <TableCell className="font-medium flex">
        <Avatar className="mr-3">
          <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{order.user.name}</p>
          <p className="text-xs text-gray-500 font-normal">
            {order.user.email}
          </p>
        </div>
      </TableCell>
      <TableCell>{order.invoiceId || "N/A"}</TableCell>
      <TableCell>
        <Badge variant="outline">{order.status || "N/A"}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        £
        {order.totalPrice ? (
          <NumericFormat
            displayType="text"
            value={order.totalPrice}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            renderText={(value) => <>{value}</>}
          />
        ) : (
          0
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {order.user.address ? (
          <>
            {order.user.address?.street}, {order.user.address?.city}{" "}
            {order.user.address?.postcode}
          </>
        ) : (
          "N/A"
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {dayjs(new Date(order.createdAt)).format("DD-MM-YYYY HH:mm A")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
