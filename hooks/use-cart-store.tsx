import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the structure of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
}

// Define the structure of our store
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Create the persisted store
const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      // Add an item to the cart
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      // Remove an item from the cart
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // Clear all items from the cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCartStore;
