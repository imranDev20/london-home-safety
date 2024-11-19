"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { CustomerWithRelation } from "@/types/customer";
import { StaffWithRelations } from "@/types/engineers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "@prisma/client";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createOrderByAdmin } from "../../actions";
import { CreateOrderFormInput, createOrderSchema } from "../schema";
import OrderAssignment from "./order-assignment";
import PropertyInfo from "./property-info";
import ServicesInfo from "./services-info";
import PaymentInfo from "./payment-info";
import DateTimeSelector from "./date-time-selector";

export default function CreateOrderForm({
  customers,
  engineers,
  packages,
}: {
  customers: CustomerWithRelation[];
  engineers: StaffWithRelations[];
  packages: Package[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateOrderFormInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      propertyType: "RESIDENTIAL",
      cartItems: [{ packageId: "", price: 0, quantity: 1 }],
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onCreateOrderSubmit: SubmitHandler<CreateOrderFormInput> = async (
    data
  ) => {
    startTransition(async () => {
      try {
        const result = await createOrderByAdmin(data);

        console.log(result);
        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
            variant: "success",
          });
          router.push("/admin/orders");
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
    }
  }, [errors, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onCreateOrderSubmit)}
        className="space-y-8 mt-7 mb-20"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create New Order</h1>
          <div className="flex gap-3">
            <Link href="/admin/orders">
              <Button
                variant="outline"
                className="h-9 text-sm font-medium flex"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>
            <LoadingButton
              onClick={() => handleSubmit(onCreateOrderSubmit)()}
              disabled={isPending}
              loading={isPending}
              className="h-9 text-sm font-medium flex"
            >
              {!isPending && <Check className="mr-2 h-4 w-4" />}
              Create Order
            </LoadingButton>
          </div>
        </div>

        <OrderAssignment customers={customers} engineers={engineers} />
        <DateTimeSelector />
        <PropertyInfo />
        <ServicesInfo packages={packages} />
        <PaymentInfo packages={packages} />
      </form>
    </Form>
  );
}
