-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('FIXED', 'FROM', 'RANGE');

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "priceType" "PriceType" NOT NULL DEFAULT 'FIXED';
