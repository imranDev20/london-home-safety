import { TableCell, TableRow } from "@/components/ui/table";
import { Package, Prisma } from "@prisma/client";
import React, { useState, useTransition } from "react";
import { updatePackagePrice } from "../actions";
import { Badge } from "@/components/ui/badge";

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
    <TableRow className="hover:bg-gray-50/50 transition-colors">
      <TableCell>
        <div>
          <p className="font-medium text-gray-900">
            {cartItem.package.serviceName}
          </p>
          <p className="text-sm text-gray-500">{cartItem.package.name}</p>
        </div>
      </TableCell>

      <TableCell>
        <div className="text-gray-700">
          £{basePrice.toFixed(2)}
          {cartItem.package.extraUnitPrice ? (
            <span className="text-xs text-gray-500 block">
              +£{cartItem.package.extraUnitPrice} per extra unit
            </span>
          ) : null}
        </div>
      </TableCell>

      <TableCell>
        {cartItem.package.isAdditionalPackage ? (
          isEditable ? (
            <div className="relative w-20">
              <input
                type="number"
                min={minQuantity}
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                disabled={isPending}
                className="w-full p-2 border border-gray-200 rounded-md text-center
                       focus:outline-none focus:ring-2 focus:ring-primary/20
                       disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <span className="text-xs text-gray-500 absolute -bottom-5 left-0">
                Min: {minQuantity}
              </span>
            </div>
          ) : (
            <Badge variant="secondary" className="w-12 justify-center">
              {quantity}
            </Badge>
          )
        ) : (
          <Badge variant="outline" className="text-gray-500">
            Standard
          </Badge>
        )}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            £{totalPrice.toFixed(2)}
          </span>
          {isPending && (
            <div className="animate-spin h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
