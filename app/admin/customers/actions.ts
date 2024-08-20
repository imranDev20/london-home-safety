"use server";

import prisma from "@/lib/prisma";
import {Prisma } from "@prisma/client";
import { unstable_cache as cache, revalidatePath } from "next/cache";
import dayjs from "dayjs";
import exceljs from "exceljs";
export const getCustomers = async (
    page: number = 1,
    pageSize: number = 10,
    search: string = "",
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc",
  ) => {
    try {
      const skip = (page - 1) * pageSize;

      const whereClause: Prisma.UserWhereInput = {
        AND: [
            { role: 'CUSTOMER' },
          search
            ? {
                OR: [
                  { email: { contains: search, mode: "insensitive" } },
                  { name: { contains: search, mode: "insensitive" } },                
                ],
              }
            : {},
        ],
      };
  
      // Create orderBy clause for sorting users
      const orderByClause: Prisma.UserOrderByWithRelationInput = {};    
      switch (sortBy) {
        case "name":
          orderByClause.name = sortOrder;
          break;
        case "email":
          orderByClause.email = sortOrder;
          break;        
        case "createdAt":
          orderByClause.createdAt = sortOrder;
          break;
        default:
          orderByClause.createdAt = "desc";
      }
  
      // Fetch users and the total count
      const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where: whereClause,
          skip,
          take: pageSize,
          include: {
            address: true,  // Include address if needed
          },
          orderBy: orderByClause,
        }),
        prisma.user.count({ where: whereClause }),
      ]);
   // Generate Excel file
   const workbook = new exceljs.Workbook();
   const worksheet = workbook.addWorksheet("Customers");

   worksheet.columns = [  
     { header: "Name", key: "name", width: 30 },
     { header: "Email", key: "email", width: 30 },
     { header: "Phone", key: "phone", width: 20 },
     { header: "Address", key: "address", width: 60 },    
     { header: "Placed On", key: "createdAt", width: 20 },  
   ];

   users.forEach((user) => {
     worksheet.addRow({    
       name: user?.name,
       email: user?.email,
       // phone:user?.phone,
       address: `${user?.address?.street ? user?.address?.street + ',' : ""} ${user?.address?.city ?? ""} ${user?.address?.postcode ?? ""}`,    
       createdAt: dayjs(user?.createdAt).format("DD MMMM YYYY"),     
     });
   });

   const buffer = await workbook.xlsx.writeBuffer();
   const excelData = Buffer.from(buffer).toString("base64");
      return {
        excelData,
        users,
        pagination: {
          currentPage: page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  };
  
  export async function deleteCustomer(customerId: string) {
    try {
      const deletedCustomer = await prisma.user.delete({
        where: {
          id: customerId,
        },
      });
  
      revalidatePath("/customers");
  
      return {
        message: "Customer deleted successfully!",
        data: deletedCustomer,
        success: true,
      };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        message: "An error occurred while deleting the user.",
        success: false,
      };
    }
  }