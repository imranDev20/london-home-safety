/*
  Warnings:

  - You are about to drop the column `inspectionTime` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timeSlotId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SlotType" AS ENUM ('8AM-12PM', '12PM-4PM', '4PM-8PM');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "inspectionTime",
ADD COLUMN     "timeSlotId" TEXT;

-- DropEnum
DROP TYPE "InspectionTime";

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "slotType" "SlotType" NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimeSlot_date_isBooked_isAvailable_idx" ON "TimeSlot"("date", "isBooked", "isAvailable");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_date_slotType_key" ON "TimeSlot"("date", "slotType");

-- CreateIndex
CREATE UNIQUE INDEX "Order_timeSlotId_key" ON "Order"("timeSlotId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
