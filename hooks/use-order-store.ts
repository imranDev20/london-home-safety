import { AddressSource } from "@/app/(site)/(order)/checkout/schema";
import {
  Address,
  Package,
  ParkingOptions,
  PaymentMethod,
  PropertyType,
} from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AddressType = Omit<
  Address,
  "userId" | "createdAt" | "updatedAt" | "id"
> & {
  source: AddressSource;
};
export type CartItem = {
  id: string;
  package: Package;
  quantity: number;
  price: number;
};

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
  propertyType: PropertyType;
  orderNotes: string;
};

interface OrderState {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
  calculatePrice: (pack: Package, quantity: number) => number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
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
    source: "search",
  },
  isCongestionZone: undefined,
  parkingOptions: undefined,
  orderDate: undefined,
  timeSlotId: "",
  propertyType: PropertyType.RESIDENTIAL,
  orderNotes: "",
};

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      customerDetails: initialCustomerDetails,
      paymentMethod: PaymentMethod.CREDIT_CARD,

      calculatePrice: (pack: Package, units: number) => {
        if (!pack.isAdditionalPackage) return pack.price;

        const minQuantity = pack.minQuantity ?? 1;
        const extraUnitsCount = Math.max(0, units - minQuantity);
        const extraPrice = extraUnitsCount * (pack.extraUnitPrice ?? 0);
        return pack.price + extraPrice;
      },

      addItem: (item) => {
        const { calculatePrice } = get();
        const cartItem: CartItem = {
          id: item.id,
          package: item.package,
          quantity: item.quantity,
          price: calculatePrice(item.package, item.quantity),
        };

        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            return state;
          }

          return {
            cartItems: [...state.cartItems, cartItem],
          };
        });
      },

      updateItemQuantity: (id, quantity) => {
        const { calculatePrice } = get();

        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.id === id && item.package.isAdditionalPackage) {
              const newQuantity = Math.max(
                quantity,
                item.package.minQuantity ?? 0
              );
              return {
                ...item,
                quantity: newQuantity,
                price: calculatePrice(item.package, newQuantity),
              };
            }
            return item;
          }),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      setCustomerDetails: (details) => {
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      resetOrder: () => {
        set({
          cartItems: [],
          customerDetails: initialCustomerDetails,
          paymentMethod: PaymentMethod.CREDIT_CARD,
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
