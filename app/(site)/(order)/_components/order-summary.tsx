import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";

interface OrderSummaryProps {
    parkingOption: "FREE" | "PAID"  | "NO";
    isInCongestionZone: boolean;
    showProceedButton?: boolean;
    onProceedClick?: () => void; 
  }
  
  const OrderSummary: React.FC<OrderSummaryProps> = ({ 
    parkingOption, 
    isInCongestionZone, 
    showProceedButton = true,
    onProceedClick
  }) => {
    const { cartItems } = useOrderStore();
  const servicePrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
  const parkingFee = parkingOption === "FREE" ? 0 : PARKING_FEE;
  const congestionFee = isInCongestionZone ? CONGESTION_FEE : 0;
  
  const totalPrice = servicePrice + parkingFee + congestionFee;

  return (
    <Card className="p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Service Price:</span>
          <span className="text-gray-900">£{servicePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Parking Fee:</span>
          <span className="text-gray-900">£{parkingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Congestion Zone Fee:</span>
          <span className="text-gray-900">£{congestionFee.toFixed(2)}</span>
        </div>

        <Separator className="my-4" />

        {/* Total Price */}
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>Total Price:</span>
          <span>
            £{totalPrice.toFixed(2)}{" "}
            <span className="text-body font-normal text-sm">(inc. Tax)</span>
          </span>
        </div>
      </div>

      {showProceedButton && (
        <Button 
          onClick={onProceedClick} 
          className="w-full mt-6 h-11 text-base"
        >
          Proceed to Payment
        </Button>
      )}
    </Card>
  );
};

export default OrderSummary;