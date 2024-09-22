-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyType" ADD VALUE 'HMOS_AND_RENTAL_HOMES';
ALTER TYPE "PropertyType" ADD VALUE 'COMMUNAL_AREA';
ALTER TYPE "PropertyType" ADD VALUE 'BUSINESS_SECTORS';
