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
export type UserFormInputType = z.infer<typeof formSchema>
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputType>({
    resolver: zodResolver(formSchema),
  });
const [isPending, startTransition] = useTransition();
const {toast} = useToast();

  const onSubmit:SubmitHandler<UserFormInputType> = async(data) => {
    startTransition(async () => {
          const response = await sendEmailToAdminAndCustomerAction(
            data
          );
          toast({
            title: response.success ? "Success" : "Error",
            description: response.message,
            variant: response.success ? "success" : "destructive",
          });
    });
  };
  return (
    <div className="max-w-6xl mx-auto flex mt-16">
      <div className="w-[40%] mt-6">
        <h2 className="text-4xl font-bold mb-6">
          Have Questions? We&apos;re Here to Help!
        </h2>
        <p className="text-body text-lg  ">
          If you have any questions about our services or need assistance,
          don&apos;t hesitate to reach out. Our team is here to help you.
        </p>
        <div className="flex flex-wrap gap-6 my-6">
          {SOCIALS.map((social) => (
            <SocialIcon key={social.id} item={social} />
          ))}
        </div>
      </div>

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
          <LoadingButton
            loading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-300"
          >
            Submit
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}
