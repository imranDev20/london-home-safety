/*
  Warnings:

  - Added the required column `propertyType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "commercialType" "CommercialType",
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "residentialType" "ResidentialType";
