-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "extraUnitPrice" SET DEFAULT 0,
ALTER COLUMN "minQuantity" SET DEFAULT 0,
ALTER COLUMN "extraUnitQuantity" SET DEFAULT 0,
ALTER COLUMN "totalPriceWithExtraUnits" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "extraUnitQuantity" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CartItem_orderId_idx" ON "CartItem"("orderId");

-- CreateIndex
CREATE INDEX "CartItem_packageId_idx" ON "CartItem"("packageId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
