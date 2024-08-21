"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
  export async function updateOrder(
    orderId: string,
    assignedEngineerId: string
  ) {
    try {
    
      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
        assignedEngineerId: assignedEngineerId
        },
      });
  
      revalidatePath(`/admin/orders`);
      revalidatePath(`/admin/orders/${updatedOrder.id}`);
  
      return {
        message: "Order updated successfully!",
        data: updatedOrder,
        success: true,
      };
    } catch (error) {
      console.error("Error updating order:", error);
      return {
        message:
          "An error occurred while updating the order. Please try again later.",
        success: false,
      };
    }
  }
  