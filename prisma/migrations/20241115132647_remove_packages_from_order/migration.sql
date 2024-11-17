/*
  Warnings:

  - You are about to drop the column `commercialType` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `residentialType` on the `Package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_orderId_fkey";

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "commercialType",
DROP COLUMN "orderId",
DROP COLUMN "residentialType";
