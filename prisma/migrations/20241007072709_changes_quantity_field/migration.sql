/*
  Warnings:

  - Made the column `quantity` on table `Package` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "quantity" SET NOT NULL;
