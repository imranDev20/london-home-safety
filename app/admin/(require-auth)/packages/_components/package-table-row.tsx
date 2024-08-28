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

import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import { useTransition } from "react";

import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

import { ServiceWithRelation } from "@/types/services";
import { deleteService } from "../actions";

export default function ServiceTableRow({
  service: service,
}: {
  service: ServiceWithRelation;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // Stop the propagation to prevent routing

    startTransition(async () => {
      const result = await deleteService(service.id);

      if (result.success) {
        toast({
          title: "Service Deleted",
          description: result.message,
          variant: "success",
        });
      } else {
        // Handle error (e.g., show an error message)
        toast({
          title: "Error Deleting Service",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <TableRow
      onClick={() => router.push(`/admin/packages/${service.id}`)}
      className={`cursor-pointer ${isPending ? "opacity-30" : "opacity-100"}`}
    >
      <TableCell>
        <div className="flex justify-center">
          <Checkbox />
        </div>
      </TableCell>

      <TableCell className="w-[25%]">{service.name}</TableCell>
      <TableCell className="">
        <Badge variant="outline">{service.category || "N/A"}</Badge>
      </TableCell>
      <TableCell className="">{service.type || "N/A"}</TableCell>
      <TableCell className="hidden md:table-cell">
        {service.unitType || "N/A"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {service.propertyType || "N/A"}
      </TableCell>
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
