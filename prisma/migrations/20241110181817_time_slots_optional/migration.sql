-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_timeSlotId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "timeSlotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
