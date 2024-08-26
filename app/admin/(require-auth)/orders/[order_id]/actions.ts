"use server";

import prisma from "@/lib/prisma";
import { OrderStatus } from '@prisma/client';
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
  export async function updateOrderStatus(
    orderId: string,
    orderStatus: string
   
  ) {
    try {    
      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
         
        },
        data: {
        status: orderStatus as OrderStatus, 
        },
      });
  
      revalidatePath(`/admin/orders`);
      revalidatePath(`/admin/orders/${updatedOrder.id}`);
  
      return {
        message: "Order status updated successfully!",
        data: updatedOrder,
        success: true,
      };
    } catch (error) {
      console.error("Error updating order status:", error);
      return {
        message:
          "An error occurred while updating the order status. Please try again later.",
        success: false,
      };
    }
  }
  

  
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      include: {
        address: true,
      },
    });
    return  users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
export const getEngineers = async () => {
  try {
    const engineers = await prisma.user.findMany({
      where: { role: "STAFF" },
      include: {
        address: true,
      },
    });
    return  engineers
  } catch (error) {
    console.error("Error fetching engineer:", error);
    throw new Error("Failed to fetch engineer");
  }
};

export const getServices = async () => {
  try {
    const services = await prisma.service.findMany({ });
    return services
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
}
