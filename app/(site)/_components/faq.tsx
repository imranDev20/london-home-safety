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
    <div className="flex space-x-4 max-w-6xl mx-auto my-24 overflow-hidden">
      <Image
        className="w-1/2 h-[60%]"
        src={faqImage}
        alt="faqimage"
        loading="lazy"
      />
      <div>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className=" text-body mt-6 mb-8 leading-loose">
          Got questions? We&apos;ve got answers! Here are some of the most
          common questions we receive from our customers, along with clear and
          helpful answers to guide you through our services and processes.
        </p>
        <Accordion
          type="single"
          collapsible
          className="w-full hover:no-underline"
        >
          {FAQ_HOME.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger className="text-lg font-semibold text-start  hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-lg  text-body">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
