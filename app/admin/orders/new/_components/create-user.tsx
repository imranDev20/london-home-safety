"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
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
          <Button type="button" className="h-9 w-full">
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Name" {...field} />
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
                    <FormLabel>User Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Phone</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter phone" {...field} />
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
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter street"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter city" {...field} />
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
                        type="text"
                        placeholder="Enter postcode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <LoadingButton
              onClick={() => handleSubmit(onCreateUserSubmit)()}
              loading={isPending}
            >
              Save changes
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
