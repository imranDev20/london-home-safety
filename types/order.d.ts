import { Prisma } from "@prisma/client";

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    services: true;
    user: {
      include: {
        address: true;
      };
    };
  };
}>;

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    user: {
      include: {
        address: true;
      };
    };
    services: true;
  };
}>;

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
