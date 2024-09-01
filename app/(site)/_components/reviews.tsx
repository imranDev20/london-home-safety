"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useEmblaCarousel from "embla-carousel-react";
import { Review } from "@prisma/client";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  User,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";
import { createReview } from "../actions";
import { ReviewFormValues, reviewSchema } from "../schema";
import { motion } from "framer-motion";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 2,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      subject: "",
      rating: 5,
      description: "",
    },
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSubmit = async (data: ReviewFormValues) => {
    startTransition(async () => {
      try {
        const response = await createReview(data);
        if (response.success) {
          toast({
            title: "Review submitted successfully",
            description: response.message,
            variant: "success",
          });
          setIsDialogOpen(false);
        } else {
          toast({
            title: "Review submission failed",
            description: response.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    });
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        // You can add logic here to update UI based on the current slide
      });
    }
  }, [emblaApi]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight text-gray-900">
            Voices of <span className="text-primary">Satisfaction</span>
          </h2>
          <p className="text-xl text-body-dark leading-relaxed mb-8">
            Discover why our customers can&lsquo;t stop talking about their
            experiences. Real stories, real impact.
          </p>
          <div className="mb-8">
            <span className="text-3xl font-bold text-primary">4.9</span>
            <span className="text-xl text-gray-600 ml-2">out of 5 stars</span>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto text-white bg-primary hover:bg-primary/90 py-4 text-sm font-medium"
              >
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Share Your Experience
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  We&lsquo;d love to hear about your experience with our
                  service. Your feedback helps us improve and serve you better.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Review subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`cursor-pointer w-6 h-6 ${
                                  star <= field.value
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                                onClick={() => field.onChange(star)}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your review here"
                            rows={4}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <LoadingButton
                    type="submit"
                    loading={isPending}
                    className="w-full"
                  >
                    Submit Review
                  </LoadingButton>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="lg:col-span-8">
          <div className="relative">
            <div className="overflow-hidden py-2 px-2" ref={emblaRef}>
              <div className="flex -ml-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] pl-4"
                  >
                    <motion.div
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {review.userName}
                            </h3>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">
                            {review.title}
                          </h4>
                          <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                            <p className="text-gray-600 leading-relaxed pl-4 mt-5">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-5">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          <span>Verified Review</span>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <motion.button
                          className="text-primary font-medium hover:underline focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read full review
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 space-x-4">
              <Button
                onClick={scrollPrev}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={scrollNext}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
