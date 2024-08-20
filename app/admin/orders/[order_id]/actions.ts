"use server";

import prisma from "@/lib/prisma";

export const getEngineersForOrder = async ( ) => {
    try {        
      const engineers = await prisma.user.findMany({
        where: {
          role: "STAFF",
        },
          include:{
             address: true
          }
      })              
      return engineers;
    } catch (error) {
      console.error("Error fetching engineers:", error);
      throw new Error("Failed to fetch engineers");
    }
  };
  