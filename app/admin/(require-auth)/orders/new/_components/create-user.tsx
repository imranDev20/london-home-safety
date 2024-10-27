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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "../../actions";
import { useToast } from "@/components/ui/use-toast";
import { Check, PlusIcon, X } from "lucide-react";
import { Role } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateUserForOrderProps {
  userType: Role;
}

export default function CreateUser({ userType }: CreateUserForOrderProps) {
  const [isPending, startTransition] = useTransition();
  const [isUserDialogOpen, setUserDialogOpen] = useState(false);

  const form = useForm<CreateUserFormInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      city: "London",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
    },
  });

  const { reset } = form;

  const { toast } = useToast();

  const onCreateUserSubmit: SubmitHandler<CreateUserFormInput> = async (
    data
  ) => {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone ?? "",
      address: {
        city: data.city ?? "",
        street: data.street ?? "",
        postcode: data.postcode ?? "",
      },
      role: userType === "CUSTOMER" ? "CUSTOMER" : "STAFF",
      ...(userType === "STAFF" && { expertise: data.expertise }),
    };

    startTransition(async () => {
      try {
        const result = await createUser(submitData, userType);

        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
            variant: "success",
          });

          setUserDialogOpen(false);
          reset();
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
          description: "An unknown error occurred while creating the user.",
          variant: "destructive",
        });
      }
    });
  };

  const RequiredIndicator = () => <span className="text-red-500">*</span>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateUserSubmit)} className="w-full">
        <Dialog open={isUserDialogOpen} onOpenChange={setUserDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="h-9 min-w-44 w-full text-sm font-medium flex items-center justify-center"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              {`Add New ${userType === "CUSTOMER" ? "Customer" : "Engineer"}`}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] w-[calc(100%-2rem)] mx-auto rounded-xl max-h-[90vh] flex flex-col">
            <ScrollArea className="flex-grow overflow-y-auto">
              <div className="p-3">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    Create New{" "}
                    {userType === "CUSTOMER" ? "Customer" : "Engineer"}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add a new{" "}
                    {userType.toLowerCase()} to the system. Fields marked with{" "}
                    <RequiredIndicator /> are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Name <RequiredIndicator />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name <RequiredIndicator />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
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
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <RequiredIndicator />
                        </FormLabel>
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
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="07123 456789"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Street Address <RequiredIndicator />
                        </FormLabel>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            City <RequiredIndicator />
                          </FormLabel>
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
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Postcode <RequiredIndicator />
                          </FormLabel>
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
                  {userType === "STAFF" && (
                    <FormField
                      control={form.control}
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expertise</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select expertise" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Electrical Services">
                                Electrical Services
                              </SelectItem>
                              <SelectItem value="Gas Services">
                                Gas Services
                              </SelectItem>
                              <SelectItem value="Fire Services">
                                Fire Services
                              </SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <DialogFooter className="sm:justify-end">
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <LoadingButton
                      onClick={form.handleSubmit(onCreateUserSubmit)}
                      loading={isPending}
                      className="w-full mb-2 sm:w-auto sm:mb-0"
                    >
                      {!isPending && <Check className="mr-2 h-4 w-4" />}
                      Create {userType === "CUSTOMER" ? "Customer" : "Engineer"}
                    </LoadingButton>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUserDialogOpen(false)}
                      className="w-full sm:w-auto sm:mr-2"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
