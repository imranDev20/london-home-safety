/*
  Warnings:

  - You are about to drop the column `timeSlotId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inspectionTime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InspectionTime" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_timeSlotId_fkey";

-- DropIndex
DROP INDEX "Order_timeSlotId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "timeSlotId",
ADD COLUMN     "inspectionTime" "InspectionTime" NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_orderId_key" ON "TimeSlot"("orderId");

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
