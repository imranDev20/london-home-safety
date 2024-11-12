import {
  Address,
  Package,
  ParkingOptions,
  PaymentMethod,
} from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AddressType = Omit<Address, "userId" | "createdAt" | "updatedAt" | "id">;

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: AddressType;
  isCongestionZone: boolean | undefined;
  parkingOptions: ParkingOptions | undefined;
  orderDate: Date | undefined;
  timeSlotId: string;
  orderNotes: string;
};

interface OrderState {
  cartItems: Package[];
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  addItem: (item: Package) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetOrder: () => void;
}

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
  orderDate: undefined,
  timeSlotId: "",
  orderNotes: "",
};

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      customerDetails: initialCustomerDetails,
      paymentMethod: PaymentMethod.CREDIT_CARD,

      addItem: (item) =>
        set((state) => ({ cartItems: [...state.cartItems, item] })),

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),

      setCustomerDetails: (details) =>
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        })),

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      resetOrder: () =>
        set({
          cartItems: [],
          customerDetails: initialCustomerDetails,
          paymentMethod: "CREDIT_CARD",
        }),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
