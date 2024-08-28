/*
  Warnings:

  - You are about to drop the column `siteSettingsId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `unitCount` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[invoice]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `SiteSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Package` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PackageCategory" AS ENUM ('ELECTRICAL', 'FIRE', 'GAS', 'HEALTH_SAFETY');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('CERTIFICATE', 'REPAIR', 'INSTALLATION', 'INSPECTION', 'OTHER');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_siteSettingsId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_orderId_fkey";

-- DropIndex
DROP INDEX "Address_siteSettingsId_key";

-- DropIndex
DROP INDEX "Order_invoiceId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "siteSettingsId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "invoiceId",
ADD COLUMN     "invoice" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Package" DROP COLUMN "serviceId",
DROP COLUMN "unitCount",
ADD COLUMN     "category" "PackageCategory" NOT NULL,
ADD COLUMN     "commercialType" "CommercialType",
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "residentialType" "ResidentialType",
ADD COLUMN     "type" "PackageType",
ADD COLUMN     "unitType" TEXT,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Service";

-- DropEnum
DROP TYPE "ServiceCategory";

-- DropEnum
DROP TYPE "ServiceType";

-- CreateIndex
CREATE UNIQUE INDEX "Order_invoice_key" ON "Order"("invoice");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_userId_key" ON "SiteSettings"("userId");

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSettings" ADD CONSTRAINT "SiteSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
