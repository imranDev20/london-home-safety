"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, UserCircle2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { StaffWithRelations } from "@/types/engineers";
import { OrderWithRelation } from "@/types/order";
import { useToast } from "@/components/ui/use-toast";
import { updateOrder } from "../actions";
import SendEmailDialog from "./send-email-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EngineerSelectionProps {
  orderDetails: OrderWithRelation;
  engineers: StaffWithRelations[] | null;
}

export default function EngineerSelection({
  orderDetails,
  engineers,
}: EngineerSelectionProps) {
  const { toast } = useToast();
  const [openAssignedEngineers, setOpenAssignedEngineers] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(
    orderDetails?.assignedEngineerId ?? ""
  );
  const [selectedEngineerEmail, setSelectedEngineerEmail] = useState("");
  const [currentEngineer, setCurrentEngineer] =
    useState<StaffWithRelations | null>(null);

  useEffect(() => {
    if (selectedEngineer && engineers) {
      const engineer = engineers.find((eng) => eng.id === selectedEngineer);
      setCurrentEngineer(engineer || null);
      if (engineer) {
        setSelectedEngineerEmail(engineer.email);
      }
    }
  }, [selectedEngineer, engineers]);

  const handleSelectEngineer = async (engineerId: string) => {
    setSelectedEngineer(engineerId);

    if (engineerId === orderDetails?.assignedEngineerId) {
      return;
    }

    try {
      const result = await updateOrder({
        orderId: orderDetails?.id,
        assignedEngineerId: engineerId,
      });

      setOpenAssignedEngineers(false);
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "success" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update engineer assignment",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <UserCircle2 className="h-5 w-5" />
          Assigned Engineer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentEngineer && (
          <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg mb-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {currentEngineer.firstName[0] + currentEngineer.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium">
                {currentEngineer.firstName} {currentEngineer.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentEngineer.email}
              </p>
              {currentEngineer.expertise && (
                <Badge variant="secondary" className="mt-1">
                  {currentEngineer.expertise}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Popover
            open={openAssignedEngineers}
            onOpenChange={setOpenAssignedEngineers}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAssignedEngineers}
                className="w-full justify-between h-10"
              >
                {selectedEngineer
                  ? `${currentEngineer?.firstName} ${currentEngineer?.lastName}`
                  : "Select engineer"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Search engineer..." />
                <CommandList>
                  <CommandEmpty>No engineer found.</CommandEmpty>
                  <CommandGroup>
                    {engineers?.map((engineer) => (
                      <CommandItem
                        value={engineer.firstName + " " + engineer.lastName}
                        key={engineer.id}
                        onSelect={() => handleSelectEngineer(engineer.id)}
                        className="flex items-center gap-2 px-4 py-2"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            engineer.id === selectedEngineer
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {engineer.firstName[0] + engineer.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {engineer.firstName} {engineer.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {engineer.expertise}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <SendEmailDialog
            engineerEmail={selectedEngineerEmail}
            orderDetails={orderDetails}
          />
        </div>
      </CardContent>
    </Card>
  );
}
