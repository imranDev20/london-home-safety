"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Please enter your phone number" }),
  subject: z.string().min(1, { message: "Please provide a subject" }),
  message: z.string().min(1, { message: "Message is required" }),
});
export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-8 h-full mx-auto bg-primary rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <Input
              {...register("name")}
              placeholder="Name"
              className="bg- w-full"
            />
            {errors.name && (
              <p className="text-white text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              {...register("email")}
              placeholder="Email Address"
              className="bg- w-full"
            />
            {errors.email && (
              <p className="text-white text-sm">
                {errors.email.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <Input
              {...register("phone")}
              placeholder="Phone Number"
              className="bg- w-full"
            />
            {errors.phone && (
              <p className="text-white  text-sm">
                {errors.phone.message as string}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              {...register("subject")}
              placeholder="Give a subject"
              className="bg- w-full"
            />
            {errors.subject && (
              <p className="text-white  text-sm">
                {errors.subject.message as string}
              </p>
            )}
          </div>
        </div>
        <div>
          <Textarea
            {...register("message")}
            placeholder="Type your Message here..."
            className="bg- w-full h-32"
          />
          {errors.message && (
            <p className="text-white text-sm">
              {errors.message.message as string}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
