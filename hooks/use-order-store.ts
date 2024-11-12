"use client";

import {
  Address,
  // InspectionTime,
  Package,
  ParkingOptions,
  PaymentMethod,
} from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const PARKING_FEE = 10; // Adjust as needed
const CONGESTION_FEE = 15; // Adjust as needed

// Define time slot type
type TimeSlot = 'MORNING' | 'AFTERNOON' | 'EVENING';

interface CartItem extends Package {
  quantity: number;
  totalPrice: number;
}

type AddressType = Omit<Address, "userId" | "createdAt" | "updatedAt" | "id">;

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: AddressType;
  isCongestionZone?: boolean;
  parkingOptions?: ParkingOptions;
  orderDate: Date;
  // inspectionTime?: InspectionTime;
  selectedTime: TimeSlot | undefined;  // Added new time slot field
  orderNotes: string;
  timeSlotId?: string; // Added timeSlotId as optional in CustomerDetails
};

interface OrderSummary {
  subtotal: number;
  parkingFee: number;
  congestionFee: number;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface OrderState {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  summary: OrderSummary;
  addItem: (item: Package, quantity: number) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetOrder: () => void;
  calculateSummary: () => OrderSummary;
}

const initialSummary: OrderSummary = {
  subtotal: 0,
  parkingFee: 0,
  congestionFee: 0,
  total: 0,
  items: [],
};

const initialCustomerDetails: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: {
    street: "",
    city: "",
    postcode: "",
  },
  isCongestionZone: undefined,
  parkingOptions: undefined,
  orderDate: new Date(),
  // inspectionTime: undefined,
  selectedTime: undefined,
  orderNotes: "",
  timeSlotId: undefined, // Initialize as undefined
};

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      customerDetails: initialCustomerDetails,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      summary: initialSummary,

      calculateSummary: () => {
        const state = get();

        // Map items for order summary
        const items = state.cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.totalPrice,
        }));

        // Calculate subtotal
        const subtotal = state.cartItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        // Determine applicable fees
        const parkingFee =
          state.customerDetails.parkingOptions === "FREE" ? 0 : PARKING_FEE;
        const congestionFee = state.customerDetails.isCongestionZone
          ? CONGESTION_FEE
          : 0;

        // Calculate total
        const total = subtotal + parkingFee + congestionFee;

        const summary = {
          subtotal,
          parkingFee,
          congestionFee,
          total,
          items,
        };

        // Update summary in store
        set({ summary });
        return summary;
      },

      addItem: (item, quantity) => {
        const basePrice = item.price;
        const extraUnits = Math.max(0, quantity - (item.minQuantity ?? 1));
        const extraPrice = extraUnits * (item.extraUnitPrice ?? 0);
        const totalPrice = basePrice + extraPrice;

        set((state) => ({
          cartItems: [
            ...state.cartItems,
            { ...item, quantity, totalPrice },
          ],
        }));

        get().calculateSummary();
      },

      updateItemQuantity: (id, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.id === id) {
              const basePrice = item.price;
              const extraUnits = Math.max(0, quantity - (item.minQuantity ?? 1));
              const extraPrice = extraUnits * (item.extraUnitPrice ?? 0);
              const totalPrice = basePrice + extraPrice;

              return { ...item, quantity, totalPrice };
            }
            return item;
          }),
        }));
        get().calculateSummary();
      },

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
        get().calculateSummary();
      },

      setCustomerDetails: (details) => {
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        }));
        get().calculateSummary();
      },

      clearCart: () => {
        set({ cartItems: [], summary: initialSummary });
      },

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      resetOrder: () => {
        set({
          cartItems: [],
          customerDetails: initialCustomerDetails,
          paymentMethod: PaymentMethod.CREDIT_CARD,
          summary: initialSummary,
        });
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
