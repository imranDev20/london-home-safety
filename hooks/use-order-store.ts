import {
  Address,
  InspectionTime,
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
  orderDate: Date;
  inspectionTime: InspectionTime | undefined;
  orderNotes: string;
};

export type CartItem = Package & {
  quantity: number;
  calculatedPrice: number;
};

interface OrderState {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  addItem: (item: Package, quantity?: number) => void;
  updateItem: (id: string, quantity: number, price: number) => void;
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
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: item.quantity,
                      calculatedPrice:
                        i.isAdditionalPackage && i.extraUnitPrice
                          ? i.price + (item.quantity - 1) * i.extraUnitPrice
                          : i.price,
                    }
                  : i
              ),
            };
          }
          return {
            cartItems: [
              ...state.cartItems,
              {
                ...item,
                calculatedPrice:
                  item.isAdditionalPackage && item.extraUnitPrice
                    ? item.price + (item.quantity - 1) * item.extraUnitPrice
                    : item.price,
              },
            ],
          };
        }),

      updateItem: (id, quantity, price) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity, calculatedPrice: price }
              : item
          ),
        })),

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
          paymentMethod: PaymentMethod.CREDIT_CARD,
        }),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
