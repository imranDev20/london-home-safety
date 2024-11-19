import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Sun,
  Sunrise,
  Sunset,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { SlotType, TimeSlot } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const APPOINTMENT_SESSIONS = {
  MORNING: {
    label: "Morning Session",
    time: "8AM-12PM",
    icon: Sunrise,
    color: "text-orange-500",
  },
  AFTERNOON: {
    label: "Afternoon Session",
    time: "12PM-4PM",
    icon: Sun,
    color: "text-yellow-500",
  },
  EVENING: {
    label: "Evening Session",
    time: "4PM-8PM",
    icon: Sunset,
    color: "text-blue-500",
  },
} as const;

const fetchTimeSlots = async (date: Date): Promise<TimeSlot[]> => {
  const response = await fetch(`/api/time-slots?date=${date.toISOString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch time slots");
  }
  return response.json();
};

function AppointmentSessionCard({
  timeSlot,
  selected,
  onSelect,
}: {
  timeSlot: TimeSlot;
  selected: boolean;
  onSelect: (slotId: string) => void;
}) {
  const info = APPOINTMENT_SESSIONS[timeSlot.slotType];
  const Icon = info.icon;
  const isDisabled =
    !timeSlot.isAvailable || timeSlot.currentBookings >= timeSlot.maxCapacity;

  const getStatusDisplay = () => {
    if (timeSlot.currentBookings >= timeSlot.maxCapacity) {
      return (
        <div className="flex items-center text-red-500 gap-1 ml-auto">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-xs font-medium">Fully Booked</span>
        </div>
      );
    }
    if (!timeSlot.isAvailable) {
      return (
        <div className="flex items-center text-red-500 gap-1 ml-auto">
          <XCircle className="w-4 h-4" />
          <span className="text-xs font-medium">Unavailable</span>
        </div>
      );
    }
    if (selected) {
      return (
        <div className="flex items-center text-primary gap-1 ml-auto">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-medium">Selected</span>
        </div>
      );
    }
    return null;
  };

  return (
    <button
      type="button"
      onClick={() => !isDisabled && onSelect(timeSlot.id)}
      disabled={isDisabled}
      className={cn(
        "relative w-full p-4 rounded-lg border-2 transition-all duration-200",
        "flex items-center gap-4",
        selected && "border-primary bg-primary/5",
        isDisabled &&
          "bg-gray-50 border-gray-200 opacity-75 cursor-not-allowed",
        !isDisabled && "hover:border-primary hover:shadow-md cursor-pointer",
        !selected && !isDisabled && "border-gray-200"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-full",
          isDisabled ? "bg-gray-100" : "bg-gray-50",
          info.color
        )}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 text-left">
        <h3 className={cn("font-semibold", isDisabled && "text-gray-500")}>
          {info.label}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {info.time}
          </div>
        </div>
      </div>

      {getStatusDisplay()}
    </button>
  );
}

interface CreateOrderFormInput {
  date: Date;
  timeSlotId: string;
}

export default function DateTimeSelector() {
  const form = useFormContext<CreateOrderFormInput>();
  const selectedDate = form.watch("date");

  const { data: timeSlots = [], isLoading } = useQuery({
    queryKey: ["timeSlots", selectedDate],
    queryFn: () => fetchTimeSlots(selectedDate),
    enabled: !!selectedDate,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule Your Inspection</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <FormLabel className="flex gap-1">
            Preferred Date
            <span className="text-destructive">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="border rounded-lg p-4 bg-white flex justify-center">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      if (date) {
                        form.setValue("timeSlotId", "");
                      }
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    className="w-full"
                  />
                </div>
                {field.value && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {format(field.value, "EEEE, MMMM do, yyyy")}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel className="flex gap-1">
            Preferred Session
            <span className="text-destructive">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="timeSlotId"
            render={({ field }) => (
              <FormItem>
                {!selectedDate ? (
                  <p className="text-sm text-muted-foreground">
                    Please select your preferred date first
                  </p>
                ) : isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="animate-pulse rounded-lg border-2 border-gray-100 h-[80px] p-4 flex items-center"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="rounded-full bg-gray-200 h-10 w-10 flex-shrink-0" />
                          <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-1/3" />
                            <div className="flex items-center gap-2">
                              <div className="h-3 bg-gray-200 rounded w-1/4" />
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-4 w-4 bg-gray-200 rounded-full" />
                            <div className="h-3 bg-gray-200 rounded w-20" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center text-sm text-muted-foreground mt-4 gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="font-medium">
                        Loading available sessions...
                      </span>
                    </div>
                  </div>
                ) : timeSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No sessions available for the selected date
                  </p>
                ) : (
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <AppointmentSessionCard
                        key={slot.id}
                        timeSlot={slot}
                        selected={field.value === slot.id}
                        onSelect={(slotId) => field.onChange(slotId)}
                      />
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
