import { TableCell, TableRow } from "@/components/ui/table";
import { Package, Prisma } from "@prisma/client";
import React, { useState, useTransition } from "react";
import { updatePackagePrice } from "../actions";

type CartItemWithPackage = Prisma.CartItemGetPayload<{
  include: {
    package: true;
  };
}>;

export default function PackageTableRow({
  cartItem,
  isEditable = false,
}: {
  cartItem: CartItemWithPackage;
  isEditable?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  // Get the minimum quantity from the package, defaulting to 1
  const minQuantity = cartItem.package.minQuantity ?? 1;
  const [quantity, setQuantity] = useState<number>(
    cartItem.quantity ?? minQuantity
  );

  // Calculate prices
  const basePrice = cartItem.package.price;
  const extraUnitPrice = cartItem.package.extraUnitPrice ?? 0;
  const extraUnits = Math.max(0, quantity - minQuantity);
  const totalPrice = basePrice + extraUnits * extraUnitPrice;

  // Handle quantity change - only used if isEditable is true
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < minQuantity) return;

    startTransition(async () => {
      try {
        setQuantity(newQuantity);
        // Update the package price in the database
        await updatePackagePrice(cartItem.id, totalPrice);
      } catch (error) {
        console.error("Error updating package price:", error);
        // Revert quantity if update fails
        setQuantity(cartItem.quantity ?? minQuantity);
      }
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{cartItem.package.name}</TableCell>
      <TableCell>£{basePrice.toFixed(2)}</TableCell>
      <TableCell>
        {cartItem.package.isAdditionalPackage ? (
          isEditable ? (
            <input
              type="number"
              min={minQuantity}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              disabled={isPending}
              className="w-16 p-1 border border-gray-300 rounded"
            />
          ) : (
            <span>{quantity}</span>
          )
        ) : (
          <span className="text-gray-500">Standard</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          £{totalPrice.toFixed(2)}
          {isPending && (
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
