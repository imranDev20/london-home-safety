import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/images/faq.jpg";
import Image from "next/image";

export default function Faq() {
  return (
    <div className="flex max-w-6xl mx-auto my-24">
      <Image className="w-1/2" src={faqImage} alt="faqimage" loading="lazy" />
      <div>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-6 mb-8">
          Got questions? We&apos;ve got answers! Here are some of the most
          common questions we receive from our customers, along with clear and
          helpful answers to guide you through our services and processes.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              What is an EPC and why do I need one?
            </AccordionTrigger>
            <AccordionContent>
              An Energy Performance Certificate (EPC) provides information about
              the energy efficiency of a property. It&apos;s required for
              properties being sold or rented and helps improve energy use and
              reduce costs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              How often should I have an Electrical Installation Condition
              Report (EICR) conducted?
            </AccordionTrigger>
            <AccordionContent>
              It&apos;s recommended to have an EICR conducted every 5 years for
              rented properties and every 10 years for owner-occupied homes.
              Regular inspections ensure your electrical systems are safe and
              compliant with regulations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              What does a Gas Safety Certificate entail?
            </AccordionTrigger>
            <AccordionContent>
              A Gas Safety Certificate confirms that all gas appliances,
              fittings, and flues in a property are safe to use. It&apos;s a
              legal requirement for landlords to have an annual gas safety check
              conducted by a registered engineer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              Why is PAT Testing important for my home?
            </AccordionTrigger>
            <AccordionContent>
              Portable Appliance Testing (PAT) is important to ensure that
              electrical appliances are safe to use. Regular PAT testing helps
              prevent electrical hazards and ensures compliance with safety
              standards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold">
              How can I benefit from installing an EV charging station at home?
            </AccordionTrigger>
            <AccordionContent>
              Installing an EV charging station at home offers convenience and
              cost savings for electric vehicle owners. It ensures your vehicle
              is always ready to go and can increase the value of your property.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
