/*
  Warnings:

  - A unique constraint covering the columns `[timeSlotId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_timeSlotId_key" ON "Order"("timeSlotId");
