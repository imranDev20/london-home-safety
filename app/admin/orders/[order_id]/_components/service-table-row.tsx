import { TableCell, TableRow } from "@/components/ui/table";
import { ServiceWithRelation } from "@/types/services";
import React from "react";

export default function ServiceTableRow({
  service,
}: {
  service: ServiceWithRelation;
}) {
  return (
    <TableRow key={service.id}>
      <TableCell className="font-medium">{service.name}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell className="text-right"></TableCell>
    </TableRow>
  );
}
