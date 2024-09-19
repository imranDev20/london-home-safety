"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentLayout } from "./_components/content-layout";
import { IncomeChart } from "./_components/income-chart";
import { MostOrderedServiceTypes } from "./_components/most-ordered-types-chart";
import { OrdersByShift } from "./_components/orders-by-shift-chart";

export default function AdminDashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <IncomeChart />
        </div>

        <div className="col-span-6"></div>

        <div className="col-span-4">
          <MostOrderedServiceTypes />
        </div>

        <div className="col-span-4">
          <OrdersByShift />
        </div>

        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders by Area</CardTitle>
            </CardHeader>
            <CardContent>{/* Bar chart for orders by area */}</CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
