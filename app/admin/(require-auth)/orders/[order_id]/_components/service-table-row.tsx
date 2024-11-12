//service-table-row.tsx
import { TableCell, TableRow } from "@/components/ui/table";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { updatePackagePrice } from "../actions";

export default function PackageTableRow({ pack }: { pack: Package }) {
  console.log("pack", pack);

  // Ensure minQuantity defaults to 1 if it's undefined
  const minQuantity = pack.minQuantity ?? 1;

  // Default to the minimum quantity if the cart item doesn't exist
  const [quantity, setQuantity] = useState<number>(minQuantity);

  const { updateItemQuantity, addItem, cartItems } = useOrderStore((state) => ({
    updateItemQuantity: state.updateItemQuantity,
    addItem: state.addItem,
    cartItems: state.cartItems,
  }));

  // Find the cart item if it exists in the store
  const existingCartItem = cartItems.find((item) => item.id === pack.id);

  // Calculate total price based on quantity
  const basePrice = pack.price;

  // Ensure extraUnitPrice defaults to 0 if undefined
  const extraUnitPrice = pack.extraUnitPrice ?? 0;
  const extraUnits = Math.max(0, quantity - minQuantity);
  const extraPrice = extraUnits * extraUnitPrice;
  const totalPrice = basePrice + extraPrice;

  // Handle quantity change
  const handleQuantityChange = async (newQuantity: number) => {
    // Ensure quantity doesn't go below minQuantity
    if (newQuantity >= minQuantity) {
      setQuantity(newQuantity);

      // Update item quantity in the store
      if (existingCartItem) {
        updateItemQuantity(pack.id, newQuantity);
      } else {
        // If item is not in cart, add it
        addItem(pack, newQuantity);
      }

      // Update the package price in the database
      await updatePackagePrice(pack.id, totalPrice);
    }
  };

  useEffect(() => {
    // Sync initial quantity if item exists in cart
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
          min={minQuantity} // Prevent going below minQuantity
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-16 p-1 border border-gray-300 rounded"
        />
      </TableCell>
      <TableCell>£{totalPrice.toFixed(2)}</TableCell>
    </TableRow>
  );
}