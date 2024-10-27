-- AlterEnum
ALTER TYPE "PropertyType" ADD VALUE 'HMO';
ALTER TYPE "PropertyType" ADD VALUE 'COMMUNAL_AREA';
ALTER TYPE "PropertyType" ADD VALUE 'BUSINESS_SECTOR';

-- AlterTable
ALTER TABLE "User" ADD COLUMN "firstName" TEXT,
                    ADD COLUMN "lastName" TEXT;

-- UpdateData
UPDATE "User" SET "firstName" = 'Unknown', "lastName" = 'Unknown' WHERE "firstName" IS NULL OR "lastName" IS NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL,
                    ALTER COLUMN "lastName" SET NOT NULL;