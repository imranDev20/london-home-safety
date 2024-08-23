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
export default function ContactForm() {
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
    <div className="max-w-6xl mx-auto flex mt-16">
      <div className="w-[40%] mt-6">
        <h2 className="text-4xl font-bold mb-6">
          Have Questions? We&apos;re Here to Help!
        </h2>
        <p className="text-gray-600 text-lg  ">
          If you have any questions about our services or need assistance,
          don&apos;t hesitate to reach out. Our team is here to help you.
        </p>
      </div>
      {/* contact form */}
      <div className="  h-[450px] w-[60%] mx-auto   rounded-r-xl  ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <Input
                {...register("name")}
                placeholder="Name"
                className="bg-sky-50 w-full border-yellow-400"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message as string}</p>
              )}
            </div>
            <div className="flex-1">
              <Input
                {...register("email")}
                placeholder="Email Address"
                className="bg-sky-50 w-full border-yellow-400"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message as string}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <Input
                {...register("phone")}
                placeholder="Phone Number"
                className="bg-sky-50 w-full border-yellow-400"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message as string}</p>
              )}
            </div>
            <div className="flex-1">
              <Input
                {...register("subject")}
                placeholder="Give a subject"
                className="bg-sky-50 w-full border-yellow-400"
              />
              {errors.subject && (
                <p className="text-red-500">
                  {errors.subject.message as string}
                </p>
              )}
            </div>
          </div>
          <div>
            <Textarea
              {...register("message")}
              placeholder="Type your Message here..."
              className="bg-sky-50 border-yellow-400 w-full h-32"
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message as string}</p>
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
    </div>
  );
}
