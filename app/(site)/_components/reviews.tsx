"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Prisma, Review } from "@prisma/client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { ImQuotesRight } from "react-icons/im";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ReviewFormValues, reviewSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Reviews({ reviews }: { reviews: Review[] }) {
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

  const onSubmit = (data: ReviewFormValues) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  useEffect(() => {
    if (emblaApi) {
      // Optional: Add any additional carousel configuration here
      emblaApi.on("select", () => {
        // You can add logic here to update UI based on the current slide
      });
    }
  }, [emblaApi]);

  return (
    <section className="py-20 bg-section-background">
      <div className="max-w-screen-xl mx-auto px-16 grid grid-cols-12">
        <div className="col-span-4">
          <h2 className="text-4xl font-bold mb-5 leading-normal">
            Hear from Our Satisfied Customers
          </h2>
          <p className="text-body leading-loose text-lg">
            Our commitment to excellence and customer satisfaction shines
            through in their words.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="text-white bg-primary hover:bg-secondary hover:text-black py-6 text-md mt-10"
              >
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Share Your Experience
                </DialogTitle>
                <DialogDescription>
                  We&apos;d love to hear about your experience with our service.
                  Your feedback helps us improve and serve you better.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
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
                          <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`cursor-pointer ${
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

                  <Button type="submit">Submit Review</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="col-span-8">
          <div className="relative">
            <div className="overflow-hidden px-3" ref={emblaRef}>
              <div className="flex pb-5 gap-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="md:flex-[0_0_49%] flex-[0_0_100%] "
                  >
                    <Card className="p-5 flex justify-center flex-col items-center shadow-md hover:shadow-lg">
                      <ImQuotesRight className="text-primary text-5xl mb-4" />
                      <h3 className="text-xl font-semibold text-body-dark mb-5 text-center">
                        {review.title}
                      </h3>
                      <p className="text-body mb-4 flex-grow text-center leading-relaxed">
                        {review.comment}
                      </p>
                      <div className="flex flex-col justify-between items-center mt-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarFilledIcon
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <span className="font-medium text-lg text-gray-900 mt-2">
                          {review.userName}
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button
                onClick={scrollPrev}
                className="border-2 border-body rounded-full flex justify-center p-1"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={scrollNext}
                className="border-2 border-body rounded-full flex justify-center p-1"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
