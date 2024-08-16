import { Prisma } from "@prisma/client";

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    user: {
      include: {
        address: true;
      };
    };
  };
}>;
