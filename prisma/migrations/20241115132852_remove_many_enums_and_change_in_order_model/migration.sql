/*
  Warnings:

  - You are about to drop the column `commercialType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `residentialType` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "commercialType",
DROP COLUMN "residentialType";

-- DropEnum
DROP TYPE "CommercialType";

-- DropEnum
DROP TYPE "ResidentialType";
