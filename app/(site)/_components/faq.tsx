import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/images/faq.jpg";
import { FAQ_HOME } from "@/shared/data";
import Image from "next/image";

export default function Faq() {
  return (
    <div className="max-w-screen-xl mx-auto my-12 md:my-24 px-4 md:px-6 lg:px-16">
      <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Image
            className="w-full h-auto rounded-lg"
            src={faqImage}
            alt="FAQ illustration"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-body mb-6 md:mb-8 leading-relaxed">
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
                <AccordionContent className="text-sm md:text-base text-body">
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
