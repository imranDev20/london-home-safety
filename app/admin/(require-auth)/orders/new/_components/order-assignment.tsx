import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { CreateOrderFormInput } from "../schema";
import { CustomerWithRelation } from "@/types/customer";
import { StaffWithRelations } from "@/types/engineers";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CreateUser from "./create-user";

interface OrderAssignmentProps {
  customers: CustomerWithRelation[];
  engineers: StaffWithRelations[];
}

export default function OrderAssignment({
  customers,
  engineers,
}: OrderAssignmentProps) {
  const { control } = useFormContext<CreateOrderFormInput>();
  const [openUserComboBox, setOpenUserComboBox] = useState(false);
  const [openEngineerComboBox, setOpenEngineerComboBox] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Assignment</CardTitle>
        <CardDescription>
          Select the customer and assign an engineer for the service order.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Selection Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <FormField
              control={control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1">
                    Select Customer
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover
                      open={openUserComboBox}
                      onOpenChange={setOpenUserComboBox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openUserComboBox}
                          className="w-full justify-between"
                        >
                          {field.value ? (
                            customers?.find(
                              (customer) => customer.id === field.value
                            )?.email
                          ) : (
                            <span className="text-muted-foreground">
                              Select a customer
                            </span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[calc(100vw-2rem)] sm:w-[350px] p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search customers..." />
                          <CommandList>
                            <CommandEmpty>No customers found.</CommandEmpty>
                            <CommandGroup>
                              {customers?.map((customer) => (
                                <CommandItem
                                  key={customer.id}
                                  value={customer.email}
                                  onSelect={() => {
                                    field.onChange(customer.id);
                                    setOpenUserComboBox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === customer.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {customer.email}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:self-end sm:mb-[2px]">
            <CreateUser userType="CUSTOMER" />
          </div>
        </div>

        {/* Engineer Selection Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <FormField
              control={control}
              name="assignedEngineer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Engineer (Optional)</FormLabel>
                  <FormControl>
                    <Popover
                      open={openEngineerComboBox}
                      onOpenChange={setOpenEngineerComboBox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openEngineerComboBox}
                          className="w-full justify-between"
                        >
                          {field.value ? (
                            engineers?.find(
                              (engineer) => engineer.id === field.value
                            )?.email
                          ) : (
                            <span className="text-muted-foreground">
                              Select an engineer
                            </span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[calc(100vw-2rem)] sm:w-[350px] p-0"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search engineers..." />
                          <CommandList>
                            <CommandEmpty>No engineers found.</CommandEmpty>
                            <CommandGroup>
                              {engineers?.map((engineer) => (
                                <CommandItem
                                  key={engineer.id}
                                  value={engineer.email}
                                  onSelect={() => {
                                    field.onChange(engineer.id);
                                    setOpenEngineerComboBox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === engineer.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {engineer.email}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
