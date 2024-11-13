import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import useOrderStore from "@/hooks/use-order-store";

const EmptyCartCard = () => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-6 w-6 text-yellow-500" />
        <CardTitle className="text-2xl font-bold">Not Available</CardTitle>
      </div>
      <CardDescription>
        We&apos;re sorry, but the payment page is currently not accessible.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">
        This could be due to one of the following reasons:
      </p>
      <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
        <li>Your shopping cart is empty</li>
        <li>The system is temporarily undergoing maintenance</li>
      </ul>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href="/cart">
        <Button variant="outline">Go Back</Button>
      </Link>
      <Link href="/">
        <Button>Return to Homepage</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default function CheckoutEmptyState({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = React.useState(false);
  const cartItems = useOrderStore((state) => state.cartItems);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  // Show loading spinner until hydration is complete
  if (!hydrated) {
    return (
      <div className="min-h-[calc(100vh_-_300px)] flex flex-col justify-center items-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Only show empty cart message after hydration is complete and we confirm cart is empty
  if (hydrated && !cartItems.length) {
    return (
      <div className="min-h-[calc(100vh_-_300px)] flex flex-col justify-center items-center p-4">
        <EmptyCartCard />
      </div>
    );
  }

  return children;
}
