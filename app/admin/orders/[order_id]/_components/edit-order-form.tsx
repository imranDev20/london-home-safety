"use client";

import { ContentLayout } from "@/app/admin/_components/content-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import { OrderWithRelation } from "@/types/order";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderFormInput } from "../../schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EditOrderForm({
  orderDetails,
}: {
  orderDetails: OrderWithRelation | null;
}) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    {
      label: `Edit ${orderDetails?.invoiceId}`,
      href: `/admin/orders/${orderDetails?.invoiceId}`,
      isCurrentPage: true,
    },
  ];

  const form = useForm<OrderFormInput>({
    defaultValues: {},
  });

  const { handleSubmit, reset, control } = form;

  const onEditOrderSubmit: SubmitHandler<OrderFormInput> = async () => {};

  return (
    <ContentLayout title="Edit Order">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onEditOrderSubmit)}>
          <div className="flex items-center gap-4 mb-5 mt-7">
            <Link href="/admin/orders">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {`Edit ${orderDetails?.invoiceId}`}
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              {orderDetails?.status}
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                Discard
              </Button>

              {/* <LoadingButton
                type="submit"
                disabled={isPending}
                size="sm"
                loading={isPending}
                className="text-xs font-semibold h-8"
              >
                Save Product
              </LoadingButton> */}
            </div>
          </div>
        </form>
      </Form>
    </ContentLayout>
  );
}
