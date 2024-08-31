import {
  Address,
  InspectionTime,
  ParkingOptions,
  PaymentMethod,
} from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type AddressType = Omit<Address, "userId" | "createdAt" | "updatedAt" | "id">;

export type CustomerDetails = {
  customerName: string;
  email: string;
  phoneNumber: string;
  address: AddressType;
  isCongestionZone: boolean | undefined;
  parkingOptions: ParkingOptions | undefined;
  orderDate: Date;
  inspectionTime: InspectionTime | undefined;
  orderNotes: string;
};

interface OrderState {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetOrder: () => void;
}

const initialCustomerDetails: CustomerDetails = {
  customerName: "",
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
  inspectionTime: undefined,
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
