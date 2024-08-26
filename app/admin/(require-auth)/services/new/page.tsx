"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceFormInput, serviceSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

export default function CreateServicePage() {
  const form = useForm<ServiceFormInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      type: "CERTIFICATE", // or other default value
      category: "ELECTRICAL", // or other default value
      description: "",
      propertyType: "RESIDENTIAL", // or other default value
      residentialType: undefined,
      commercialType: undefined,
      unitType: "",
      issuedDate: undefined,
      expiryDate: undefined,
      orderId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit: SubmitHandler<ServiceFormInput> = (data) => {
    // handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}> </form>
    </Form>
  );
}
