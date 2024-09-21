import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We&apos;ve received your request and will
          process it shortly.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          For bank transfers, please use the account details provided in your
          confirmation email. For cash payments, our engineer will collect the
          payment during the service.
        </p>
        <Link href="/" replace>
          <Button className="w-full">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
