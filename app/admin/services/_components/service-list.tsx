import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServiceTableRow from "./service-table-row";
import TableEmpty from "@/components/table-empty";
import {Pagination } from "@/types/order";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceWithRelation } from "@/types/services";

export default async function ServiceList({
  services: services,
  pagination,
}: {
  services: ServiceWithRelation[];
  pagination: Pagination;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent className="p-0">
        <div className="overflow-auto h-[calc(100vh-320px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <div className="flex justify-center items-center">
                    <Checkbox />
                  </div>
                </TableHead>
                <TableHead className="w-[25%]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell ">Property Type</TableHead>
                <TableHead className="hidden md:table-cell ">Residential Type</TableHead>
                <TableHead className="hidden md:table-cell ">Commercial Type</TableHead>
                <TableHead className="hidden md:table-cell ">Unit Type</TableHead>
                <TableHead className="hidden md:table-cell w-[17%]">
                  Created at
                </TableHead>
                <TableHead className="w-10">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            {services.length > 0 ? (
              <TableBody>
                {services.map((service) => (
                  <ServiceTableRow key={service.id} service={service} />
                ))}
              </TableBody>
            ) : (
              <TableEmpty colSpan={10} />
            )}
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
