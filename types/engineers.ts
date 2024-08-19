import { Prisma } from "@prisma/client";

export type EngineersWithRelation = Prisma.UserGetPayload<{
    include: {
        address: true
    }
}>