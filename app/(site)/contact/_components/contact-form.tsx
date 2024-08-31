"use client";

import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SOCIALS } from "@/shared/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { sendEmailToAdminAndCustomerAction } from "../../actions";
import SocialIcon from "./social-icon";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Please enter your phone number" }),
  subject: z.string().min(1, { message: "Please provide a subject" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type UserFormInputType = z.infer<typeof formSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputType>({
    resolver: zodResolver(formSchema),
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<UserFormInputType> = async (data) => {
    startTransition(async () => {
      const response = await sendEmailToAdminAndCustomerAction(data);
      toast({
        title: response.success ? "Success" : "Error",
        description: response.message,
        variant: response.success ? "success" : "destructive",
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/5">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Have Questions? We&lsquo;re Here to Help!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you have any questions about our services or need assistance,
            don&apos;t hesitate to reach out. Our team is here to help you.
          </p>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <SocialIcon key={social.id} item={social} />
            ))}
          </div>
        </div>

        <div className="lg:w-3/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full bg-white border-gray-300"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full bg-white border-gray-300"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("phone")}
                  placeholder="Phone Number"
                  className="w-full bg-white border-gray-300"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("subject")}
                  placeholder="Subject"
                  className="w-full bg-white border-gray-300"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Textarea
                {...register("message")}
                placeholder="Type your Message here..."
                className="w-full h-32 bg-white border-gray-300"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <LoadingButton
              loading={isPending}
              disabled={isPending}
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition duration-300"
            >
              Submit
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
