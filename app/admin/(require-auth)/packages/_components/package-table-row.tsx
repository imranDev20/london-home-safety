"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Package } from "@prisma/client";
import { deletePackage } from "../actions";

export default function PackageTableRow({ pack }: { pack: Package }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop the propagation to prevent routing

    startTransition(async () => {
      const result = await deletePackage(pack.id);

      if (result.success) {
        toast({
          title: "Service Deleted",
          description: result.message,
          variant: "success",
        });
      } else {
        toast({
          title: "Error Deleting Service",
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
      <Link href={`/admin/packages/${pack.id}`} className="contents">
        <TableCell className="w-[25%]">{pack.name}</TableCell>
        <TableCell className="w-[10%]">£{pack.price}</TableCell>
        <TableCell className="">{pack.serviceName || "N/A"}</TableCell>
        <TableCell className="">{pack.type || "N/A"}</TableCell>
        <TableCell className="hidden md:table-cell">
          {pack.propertyType || "N/A"}
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
