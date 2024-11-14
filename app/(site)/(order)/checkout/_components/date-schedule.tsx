import { useState } from "react";
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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { SlotType, TimeSlot } from "@prisma/client";
import { CheckoutFormInput } from "../schema";

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
  const isDisabled = !slot.isAvailable || slot.isBooked;
  const info = APPOINTMENT_SESSIONS[slot.slotType];
  const Icon = info.icon;

  const getStatusDisplay = () => {
    if (slot.isBooked) {
      return (
        <div className="flex items-center text-red-500 gap-1 ml-auto">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-xs font-medium">Already Booked</span>
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
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          {info.time}
        </div>
      </div>

      {getStatusDisplay()}
    </button>
  );
}

export default function DateSchedule({ disabledDays }: DateTimeSelectorProps) {
  const form = useFormContext<CheckoutFormInput>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTimeSlots = async (date: Date) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/time-slots?date=${date.toISOString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointment sessions");
      }
      const slots = await response.json();
      setTimeSlots(slots);
    } catch (error) {
      console.error("Error fetching appointment sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDate = form.watch("date");

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
                        fetchTimeSlots(date);
                        form.setValue("timeSlotId", "");
                      }
                    }}
                    disabled={disabledDays}
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
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading available sessions...</span>
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
