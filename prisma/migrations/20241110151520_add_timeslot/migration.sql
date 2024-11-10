-- CreateEnum
CREATE TYPE "SlotType" AS ENUM ('8AM-12PM', '12PM-4PM', '4PM-8PM');

-- First create TimeSlot table
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "slotType" "SlotType" NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- Add indices
CREATE INDEX "TimeSlot_date_isBooked_isAvailable_idx" ON "TimeSlot"("date", "isBooked", "isAvailable");
CREATE UNIQUE INDEX "TimeSlot_date_slotType_key" ON "TimeSlot"("date", "slotType");

-- Add timeSlotId as nullable first
ALTER TABLE "Order" ADD COLUMN "timeSlotId" TEXT;

-- Create a function to map InspectionTime to SlotType
CREATE OR REPLACE FUNCTION map_inspection_time_to_slot_type(inspection_time TEXT)
RETURNS "SlotType" AS $$
BEGIN
    RETURN CASE inspection_time
        WHEN 'MORNING' THEN '8AM-12PM'::"SlotType"
        WHEN 'AFTERNOON' THEN '12PM-4PM'::"SlotType"
        WHEN 'EVENING' THEN '4PM-8PM'::"SlotType"
        ELSE '8AM-12PM'::"SlotType"
    END;
END;
$$ LANGUAGE plpgsql;

-- Insert TimeSlots for existing orders
DO $$
DECLARE
    order_record RECORD;
BEGIN
    FOR order_record IN SELECT "id", "date", "inspectionTime" FROM "Order" LOOP
        WITH new_slot AS (
            INSERT INTO "TimeSlot" ("id", "date", "startTime", "endTime", "slotType", "isBooked", "isAvailable", "updatedAt")
            VALUES (
                gen_random_uuid()::text,
                order_record.date,
                order_record.date,
                order_record.date + interval '4 hours',
                map_inspection_time_to_slot_type(order_record."inspectionTime"::text),
                true,
                false,
                NOW()
            )
            ON CONFLICT ("date", "slotType") DO UPDATE SET
                "isBooked" = true,
                "isAvailable" = false
            RETURNING id
        )
        UPDATE "Order"
        SET "timeSlotId" = (SELECT id FROM new_slot)
        WHERE id = order_record.id;
    END LOOP;
END $$;

-- Now make timeSlotId required and add foreign key
ALTER TABLE "Order" 
    ALTER COLUMN "timeSlotId" SET NOT NULL,
    ADD CONSTRAINT "Order_timeSlotId_fkey" 
    FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") 
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- Finally, drop the inspectionTime column and enum
ALTER TABLE "Order" DROP COLUMN "inspectionTime";
DROP TYPE "InspectionTime";