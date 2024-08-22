import { TableCell, TableRow } from "@/components/ui/table";
import { ServiceWithRelation } from "@/types/services";
import React from "react";

export default function ServiceTableRow({
  service,
}: {
  service: ServiceWithRelation;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{service.name}</TableCell>
      <TableCell>{service.category}</TableCell>
      <TableCell>{service.unitType}</TableCell>
      <TableCell >{service.propertyType}</TableCell>
    </TableRow>
  );
}
