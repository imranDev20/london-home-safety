import { SlotType, TimeSlot } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, setHours, setMinutes, isBefore } from "date-fns";

export const dynamic = "force-dynamic";

const SLOT_TYPES: { [key in SlotType]: { start: number; end: number } } = {
  MORNING: { start: 8, end: 12 },
  AFTERNOON: { start: 12, end: 16 },
  EVENING: { start: 16, end: 20 },
};

async function createTimeSlotsForDate(date: Date) {
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

  const existingSlots = await prisma.timeSlot.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (existingSlots.length > 0) {
    return existingSlots;
  }

  const slots = await Promise.all(
    Object.entries(SLOT_TYPES).map(([type, times]) => {
      const slotDate = new Date(date);
      const startTime = setHours(setMinutes(slotDate, 0), times.start);
      const endTime = setHours(setMinutes(slotDate, 0), times.end);

      return prisma.timeSlot.create({
        data: {
          date: date,
          startTime,
          endTime,
          slotType: type as SlotType,
          maxCapacity: 4,
          currentBookings: 0,
          isAvailable: true,
        },
      });
    })
  );

  return slots;
}

function isPastSlot(slot: TimeSlot): boolean {
  const now = new Date();
  // Check if the slot's end time is before current time
  return isBefore(slot.endTime, now);
}

async function updateSlotAvailability(slots: TimeSlot[]) {
  return Promise.all(
    slots.map(async (slot) => {
      const shouldBeUnavailable =
        slot.currentBookings >= slot.maxCapacity || isPastSlot(slot);

      if (shouldBeUnavailable && slot.isAvailable) {
        const updatedSlot = await prisma.timeSlot.update({
          where: { id: slot.id },
          data: { isAvailable: false },
        });
        return updatedSlot;
      }
      return slot;
    })
  );
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const date = new Date(dateParam);
    await createTimeSlotsForDate(date);

    const slots = await prisma.timeSlot.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    const updatedSlots = await updateSlotAvailability(slots);
    return NextResponse.json(updatedSlots);
  } catch (error) {
    console.error("Error handling time slots:", error);
    return NextResponse.json(
      { error: "Failed to process time slots" },
      { status: 500 }
    );
  }
}
