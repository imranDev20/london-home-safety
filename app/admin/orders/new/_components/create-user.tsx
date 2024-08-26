"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateUserFormInput, createUserSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { createUser } from "../../actions";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
export default function CreateUserForOrder() {
  const [isPending, startTransition] = useTransition();
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);

  const form = useForm<CreateUserFormInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(`errors`, errors);
  const { toast } = useToast();

  const onCreateUserSubmit: SubmitHandler<CreateUserFormInput> = async (
    data
  ) => {
    const submitData = {
      name: data.name,
      email: data.email,
      phone: data.phone ?? "",
      address: {
        city: data.city ?? "",
        street: data.street ?? "",
        postcode: data.postcode ?? "",
      },
    };

    startTransition(async () => {
      const result = await createUser(submitData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        });

        setUserDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onCreateUserSubmit)}>
      <Dialog open={isUserDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogTrigger asChild>
          <Button type="button" className="h-9 w-full text-sm font-medium">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Create New Customer
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new customer to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+44 1234 567890"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="London"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SW1A 1AA"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserDialogOpen(false)}>
              Cancel
            </Button>
            <LoadingButton
              onClick={() => handleSubmit(onCreateUserSubmit)()}
              loading={isPending}
              className="ml-2"
            >
              Create Customer
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
