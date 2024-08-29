/*
  Warnings:

  - Made the column `userId` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SiteSettings" DROP CONSTRAINT "SiteSettings_userId_fkey";

-- AlterTable
ALTER TABLE "SiteSettings" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SiteSettings" ADD CONSTRAINT "SiteSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
