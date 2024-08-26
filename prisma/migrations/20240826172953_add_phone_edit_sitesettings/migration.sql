/*
  Warnings:

  - You are about to drop the column `isParkingAvailable` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `openingHours` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `SiteSettings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siteSettingsId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `inspectionTime` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "ParkingOptions" AS ENUM ('PAID', 'FREE', 'NO');

-- CreateEnum
CREATE TYPE "InspectionTime" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('ELECTRICAL', 'FIRE', 'GAS', 'HEALTH_SAFETY');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "siteSettingsId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isParkingAvailable",
ADD COLUMN     "parkingOptions" "ParkingOptions" NOT NULL DEFAULT 'NO',
ALTER COLUMN "status" SET DEFAULT 'PENDING',
DROP COLUMN "inspectionTime",
ADD COLUMN     "inspectionTime" "InspectionTime" NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "category",
ADD COLUMN     "category" "ServiceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "address",
DROP COLUMN "contactPerson",
DROP COLUMN "openingHours",
DROP COLUMN "phone",
ADD COLUMN     "phone1" TEXT,
ADD COLUMN     "phone2" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OpeningDateTime" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,
    "siteSettingsId" TEXT NOT NULL,

    CONSTRAINT "OpeningDateTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_siteSettingsId_key" ON "Address"("siteSettingsId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_siteSettingsId_fkey" FOREIGN KEY ("siteSettingsId") REFERENCES "SiteSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningDateTime" ADD CONSTRAINT "OpeningDateTime_siteSettingsId_fkey" FOREIGN KEY ("siteSettingsId") REFERENCES "SiteSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
