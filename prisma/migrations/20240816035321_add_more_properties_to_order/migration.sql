/*
  Warnings:

  - Added the required column `inspectionTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCongestionZone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isParkingAvailable` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "assignedEngineerId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID',
    "paymentMethod" TEXT NOT NULL DEFAULT 'CREDIT_CARD',
    "isParkingAvailable" BOOLEAN NOT NULL,
    "isCongestionZone" BOOLEAN NOT NULL,
    "inspectionTime" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "orderNotes" TEXT,
    "totalPrice" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_assignedEngineerId_fkey" FOREIGN KEY ("assignedEngineerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("assignedEngineerId", "createdAt", "date", "id", "paymentStatus", "status", "updatedAt", "userId") SELECT "assignedEngineerId", "createdAt", "date", "id", "paymentStatus", "status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "unitCount" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Package_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Package" ("createdAt", "description", "id", "name", "price", "serviceId", "unitCount", "updatedAt") SELECT "createdAt", "description", "id", "name", "price", "serviceId", "unitCount", "updatedAt" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
