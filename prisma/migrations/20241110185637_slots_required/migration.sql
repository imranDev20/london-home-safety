-- Step 1: Create default time slots for existing orders
INSERT INTO "TimeSlot" ("id", "date", "startTime", "endTime", "slotType", "isBooked", "isAvailable", "updatedAt")
SELECT 
    'default-' || o.id,
    o.date,
    o.date + INTERVAL '8 hours',
    o.date + INTERVAL '12 hours',
    '8AM-12PM',
    true,
    false,
    o."updatedAt"
FROM "Order" o
WHERE o."timeSlotId" IS NULL;

-- Step 2: Update existing orders with the default time slot
UPDATE "Order" o
SET "timeSlotId" = 'default-' || o.id
WHERE o."timeSlotId" IS NULL;

-- Step 3: Now we can safely make timeSlotId required
ALTER TABLE "Order" ALTER COLUMN "timeSlotId" SET NOT NULL;

-- Step 4: Drop the constraint if it exists, then add it back
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Order_timeSlotId_fkey') THEN
    ALTER TABLE "Order" DROP CONSTRAINT "Order_timeSlotId_fkey";
 END IF;
END $$;

ALTER TABLE "Order" ADD CONSTRAINT "Order_timeSlotId_fkey" 
    FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;