import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function CartPage() {
  return (
    <div className="container mx-auto max-w-screen-xl grid grid-cols-12 px-16">
      <div className="col-span-8"></div>
      <div className="col-span-4">
        <Card className="px-5 py-6">
          <div className="flex justify-between items-center">
            <p className="text-body text-base">Total:</p>
            <p className="text-lg">$460.00</p>
          </div>
          <Separator className="my-7" />

          <Textarea rows={7} />

          <Separator className="my-7" />

          <Button
            className="mt-5 block w-full border border-primary/80 hover:border-primary"
            variant="outline"
          >
            Continue Shopping
          </Button>

          <Button
            className="mt-3 block w-full border border-primary/80 hover:border-primary"
            variant="default"
          >
            Checkout Now
          </Button>
        </Card>
      </div>
    </div>
  );
}
