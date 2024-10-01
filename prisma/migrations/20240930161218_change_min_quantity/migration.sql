/*
  Warnings:

  - You are about to alter the column `minQuantity` on the `Package` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "minQuantity" SET DATA TYPE INTEGER;
