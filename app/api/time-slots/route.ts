import { SlotType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay, setHours, setMinutes } from "date-fns";

const SLOT_TYPES: { [key in SlotType]: { start: number; end: number } } = {
  MORNING: { start: 8, end: 12 },
  AFTERNOON: { start: 12, end: 16 },
  EVENING: { start: 16, end: 20 },
};

async function createTimeSlotsForDate(date: Date) {
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);

  // Check if slots already exist for this date
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

  // Create slots for each type if they don't exist
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
          isBooked: false,
          isAvailable: true,
        },
      });
    })
  );

  return slots;
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

    // First ensure slots exist for this date
    await createTimeSlotsForDate(date);

    // Then fetch all slots for the date
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

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error handling time slots:", error);
    return NextResponse.json(
      { error: "Failed to process time slots" },
      { status: 500 }
    );
  }
}
