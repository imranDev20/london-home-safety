import { Prisma } from "@prisma/client";

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    cartItems: {
      include: {
        package: true;
      };
    };
    timeSlot: true;
    user: {
      include: {
        address: true;
      };
    };
    assignedEngineer: true;
  };
}>;

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
