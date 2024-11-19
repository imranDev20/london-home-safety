/*
  Warnings:

  - You are about to drop the column `isBooked` on the `TimeSlot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TimeSlot_date_isBooked_isAvailable_idx";

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "isBooked",
ADD COLUMN     "currentBookings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxCapacity" INTEGER NOT NULL DEFAULT 4;

-- CreateIndex
CREATE INDEX "TimeSlot_date_currentBookings_isAvailable_idx" ON "TimeSlot"("date", "currentBookings", "isAvailable");
