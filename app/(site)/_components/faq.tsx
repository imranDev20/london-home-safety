import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/images/faq-2.jpg";
import { FAQ_HOME } from "@/shared/data";
import Image from "next/image";

export default function Faq() {
  return (
    <div className="max-w-screen-xl mx-auto my-12 md:my-24 px-4 md:px-6 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="order-2 md:order-1">
          <div className="relative w-full h-[400px] md:h-[600px]">
            <Image
              className="rounded-lg"
              src={faqImage}
              fill
              placeholder="blur"
              alt="FAQ illustration"
              loading="lazy"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="mb-6 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Frequently Asked
            <span className="text-primary block mt-2">Questions</span>
          </h2>
          <p className="text-body mb-6 md:mb-8 leading-loose">
            Got questions? We&rsquo;ve got answers! Here are some of the most
            common questions we receive from our customers, along with clear and
            helpful answers to guide you through our services and processes.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_HOME.map((item) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger className="text-base md:text-lg font-semibold text-start hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-body leading-loose">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
