import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateOrderFormInput } from "../schema";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";

export default function PaymentInfo() {
  const { control, watch } = useFormContext<CreateOrderFormInput>();
  const selectedPackages = watch("cartItems");
  const isCongestionZone = watch("isCongestionZone");
  const parkingOptions = watch("parkingOptions");

  const priceSummary = () => {
    const subtotal = selectedPackages.reduce((total, pkg) => {
      return total + (pkg.price || 0);
    }, 0);

    const congestionCharge = isCongestionZone ? CONGESTION_FEE : 0;
    const parkingCharge = parkingOptions !== "FREE" ? PARKING_FEE : 0;
    const total = subtotal + congestionCharge + parkingCharge;

    return { subtotal, congestionCharge, parkingCharge, total };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Review the pricing details and choose the preferred payment method.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-9">
              <div className="bg-gray-50 p-4 rounded-md border">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Price Summary
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal:</span>
                    <span className="text-gray-900">
                      £{priceSummary().subtotal.toFixed(2)}
                    </span>
                  </div>
                  {priceSummary().congestionCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Congestion Zone Charge:
                      </span>
                      <span className="text-gray-900">
                        £{priceSummary().congestionCharge.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {priceSummary().parkingCharge > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Parking Charge:</span>
                      <span className="text-gray-900">
                        £{priceSummary().parkingCharge.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium pt-1 border-t border-gray-200">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                      £{priceSummary().total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <FormField
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH_TO_ENGINEER">
                          Cash To Engineer
                        </SelectItem>
                        <SelectItem value="BANK_TRANSFER">
                          Bank Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
