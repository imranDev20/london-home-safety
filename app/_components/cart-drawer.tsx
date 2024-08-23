import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasket, X } from "lucide-react";
import { FaCartShopping } from "react-icons/fa6";

// Sample cart items
const cartItems = [
  { id: 1, name: "EPC Certificate", price: 79.99 },
  { id: 2, name: "Gas Safety Check", price: 89.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
  { id: 3, name: "Electrical Safety", price: 99.99 },
];

export default function CartDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-3 relative">
          <div className="rounded-full text-sm bg-secondary w-5 h-5 flex justify-center items-center absolute right-0 top-0 ">
            3
          </div>
          <FaCartShopping className="text-2xl text-body" />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-5">
          <SheetTitle className="font-medium flex items-center">
            <ShoppingBasket className="mr-2" /> {cartItems.length} items
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="grid gap-4 p-5 overflow-auto">
          {cartItems.map((item, index) => (
            <div key={item.id}>
              <div className="flex justify-between items-start py-2">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-primary">
                    £{item.price.toFixed(2)}
                  </p>
                </div>
                <button className="text-gray-500 p-1 border border-transparent hover:border hover:border-primary rounded-full transition-all">
                  <X size={16} />
                </button>
              </div>
              {index < cartItems.length - 1 && <Separator className="mt-2" />}
            </div>
          ))}
        </div>
        <Separator />

        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">
              £{cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span>
          </div>
          <Button className="w-full">Checkout Now</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
