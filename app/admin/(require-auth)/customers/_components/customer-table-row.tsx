"use client";

import Link from "next/link";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
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
import dayjs from "dayjs";

import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerWithRelation } from "@/types/customer";
import { deleteCustomer } from "../actions";

export default function CustomerTableRow({
  customer,
}: {
  customer: CustomerWithRelation;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop the propagation to prevent routing

    startTransition(async () => {
      const result = await deleteCustomer(customer.id);

      if (result.success) {
        toast({
          title: "Customer Deleted",
          description: result.message,
          variant: "success",
        });
      } else {
        toast({
          title: "Error Deleting Customer",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <TableRow className={`${isPending ? "opacity-30" : "opacity-100"}`}>
      <TableCell>
        <div className="flex justify-center">
          <Checkbox />
        </div>
      </TableCell>
      <Link href={`/admin/customers/${customer.id}`} className="contents">
        <TableCell className="w-[25%]">
          <div className="flex">
            <Avatar className="mr-3">
              <AvatarFallback>
                {customer?.firstName?.charAt(0) ?? "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {customer.firstName + " " + customer.lastName}
              </p>
              <p className="text-xs text-gray-500 font-normal">
                {customer.email}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {customer.phone ?? "N/A"}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {customer.address ? (
            <>
              {customer.address?.street}, {customer.address?.city}{" "}
              {customer.address?.postcode}
            </>
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {dayjs(new Date(customer.createdAt)).format("DD-MM-YYYY HH:mm A")}
        </TableCell>
      </Link>
      <TableCell className="w-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
