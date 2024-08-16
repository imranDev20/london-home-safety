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
import { Order, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    user: true;
    _count: true;
  };
}>;

export default function OrderTableRow({ order }: { order: OrderWithRelation }) {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/orders/${order.id}`)}
      className="hover:cursor-pointer"
    >
      <TableCell className="font-medium flex">
        <Avatar className="mr-3">
          <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{order.user.name}</p>
          <p className="text-xs text-gray-500">{order.user.email}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{order.status || "N/A"}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">$499.99</TableCell>
      <TableCell className="hidden md:table-cell"></TableCell>
      <TableCell className="hidden md:table-cell">
        2023-07-12 10:42 AM
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
