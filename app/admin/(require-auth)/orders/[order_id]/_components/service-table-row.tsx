import { TableCell, TableRow } from "@/components/ui/table";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import React, { useState, useEffect } from "react";

export default function PackageTableRow({ pack }: { pack: Package }) {
  console.log("pack", pack);
  
  const [quantity, setQuantity] = useState<number>(pack.minQuantity ?? 1);
  const { updateItemQuantity, addItem, cartItems } = useOrderStore((state) => ({
    updateItemQuantity: state.updateItemQuantity,
    addItem: state.addItem,
    cartItems: state.cartItems,
  }));

  // Find the cart item if it exists in the store
  const existingCartItem = cartItems.find((item) => item.id === pack.id);
  
  // Calculate total price based on quantity
  const basePrice = pack.price;
  const extraUnits = Math.max(0, quantity - (pack.minQuantity ?? 1));
  const extraPrice = extraUnits * (pack.extraUnitPrice ?? 0);
  const totalPrice = basePrice + extraPrice;

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);

    // Update item quantity in the store
    if (existingCartItem) {
      updateItemQuantity(pack.id, newQuantity);
    } else {
      // If item is not in cart, add it
      addItem(pack, newQuantity);
    }
  };

  useEffect(() => {
    // Sync initial quantity and total price if item exists in cart
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem]);

  return (
    <TableRow>
      <TableCell className="font-medium">
        {pack.serviceName} - {pack.name}
      </TableCell>
      <TableCell>£{basePrice.toFixed(2)}</TableCell>
      <TableCell>
        <input
          type="number"
          min={pack.minQuantity ?? 1}
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-16 p-1 border border-gray-300 rounded"
        />
      </TableCell>
      <TableCell>£{totalPrice.toFixed(2)}</TableCell>
    </TableRow>
  );
}
