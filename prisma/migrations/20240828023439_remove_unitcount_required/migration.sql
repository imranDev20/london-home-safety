/*
  Warnings:

  - You are about to drop the column `description` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "description",
ALTER COLUMN "unitCount" DROP NOT NULL;
