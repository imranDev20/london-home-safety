import { TableCell, TableRow } from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import { calculatePackagePrice } from "@/lib/utils";

type CartItemWithPackage = Prisma.CartItemGetPayload<{
  include: {
    package: true;
  };
}>;

export default function PackageTableRow({
  cartItem,
}: {
  cartItem: CartItemWithPackage;
}) {
  const packagePrice = calculatePackagePrice(
    cartItem.package,
    cartItem.quantity
  );

  const {
    serviceName,
    name: packageName,
    isAdditionalPackage,
    unitType,
  } = cartItem.package;

  return (
    <TableRow className="hover:bg-gray-50/50 transition-colors">
      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{serviceName}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">{packageName}</p>
            {isAdditionalPackage && (
              <>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">
                  {cartItem.quantity} {unitType ?? "Units"}
                </p>
              </>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <span className="font-medium text-gray-900">
          £{packagePrice.toFixed(2)}
        </span>
      </TableCell>
    </TableRow>
  );
}
