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
import { StaffWithRelations } from "@/types/engineers";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DateTimeSelector from "./date-time-selector";

interface InspectionDetailsProps {
  engineers: StaffWithRelations[];
}

export default function InspectionDetails({
  engineers,
}: InspectionDetailsProps) {
  const { control } = useFormContext<CreateOrderFormInput>();
  const [openEngineerComboBox, setOpenEngineerComboBox] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Details</CardTitle>
        <CardDescription>
          Specify the date, time, and assigned engineer for the inspection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DateTimeSelector />

        <div className="mt-6">
          <FormField
            control={control}
            name="assignedEngineer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Engineer</FormLabel>
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
                    <PopoverContent className="w-[250px] p-0">
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
      </CardContent>
    </Card>
  );
}
