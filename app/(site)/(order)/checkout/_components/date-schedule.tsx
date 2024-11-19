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
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { TimeSlot } from "@prisma/client";
import { CheckoutFormInput } from "../schema";
import { useQuery } from "@tanstack/react-query";

interface DateTimeSelectorProps {
  disabledDays?: Date[];
}

const RequiredIndicator = () => <span className="text-destructive">*</span>;

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
};

function AppointmentSessionCard({
  slot,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  selected: boolean;
  onSelect: (slotId: string) => void;
}) {
  const isDisabled =
    !slot.isAvailable || slot.currentBookings >= slot.maxCapacity;
  const info = APPOINTMENT_SESSIONS[slot.slotType];
  const Icon = info.icon;

  const getStatusDisplay = () => {
    if (slot.currentBookings >= slot.maxCapacity) {
      return (
        <div className="flex items-center text-red-500 gap-1 ml-auto">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-xs font-medium">Fully Booked</span>
        </div>
      );
    }
    if (!slot.isAvailable) {
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
      onClick={() => !isDisabled && onSelect(slot.id)}
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

const fetchTimeSlots = async (date: Date): Promise<TimeSlot[]> => {
  const response = await fetch(`/api/time-slots?date=${date.toISOString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch appointment sessions");
  }
  return response.json();
};

export default function DateSchedule({
  disabledDays = [],
}: DateTimeSelectorProps) {
  const form = useFormContext<CheckoutFormInput>();
  const selectedDate = form.watch("date");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: timeSlots = [], isLoading } = useQuery({
    queryKey: ["timeSlots", selectedDate],
    queryFn: () => fetchTimeSlots(selectedDate),
    enabled: !!selectedDate,
  });

  const isDateDisabled = (date: Date): boolean => {
    if (date < today) return true;
    return disabledDays.some(
      (disabledDate) =>
        disabledDate.getFullYear() === date.getFullYear() &&
        disabledDate.getMonth() === date.getMonth() &&
        disabledDate.getDate() === date.getDate()
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Schedule Your Appointment</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <FormLabel>
            Preferred Date
            <RequiredIndicator />
          </FormLabel>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="border rounded-lg p-4 bg-white">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      if (date) {
                        form.setValue("timeSlotId", "");
                      }
                    }}
                    disabled={isDateDisabled}
                    fromDate={today}
                    className="w-full"
                  />
                </div>
                {field.value instanceof Date &&
                  !isNaN(field.value.getTime()) && (
                    <div className="flex items-center gap-2 mt-3 p-2 bg-primary/5 border border-primary/10 rounded-md">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium">
                        Selected:{" "}
                        <span className="text-primary">
                          {field.value.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    </div>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>
            Preferred Session
            <RequiredIndicator />
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
                        className="animate-pulse rounded-lg border-2 border-gray-100 h-20 p-4 flex items-center"
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
                        slot={slot}
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
