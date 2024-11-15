"use client";

import React from "react";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NoOrderFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <FileX className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">No Order Found</h2>
        <p className="text-muted-foreground mb-6">
          The order you&apos;re looking for doesn&apos;t exist or may have been
          deleted.
        </p>

        <div className="space-x-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Link href="/admin/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
