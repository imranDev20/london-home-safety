import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/images/faq.jpg";
import Image from "next/image";

export default function Faq() {
  const accordionData = [
    {
      value: "item-1",
      question: "What is an EPC and why do I need one?",
      answer: `An Energy Performance Certificate (EPC) provides information about
               the energy efficiency of a property. It's required for
               properties being sold or rented and helps improve energy use and
               reduce costs.`,
    },
    {
      value: "item-2",
      question:
        "How often should I have an Electrical Installation Condition Report (EICR) conducted?",
      answer: `It's recommended to have an EICR conducted every 5 years for
               rented properties and every 10 years for owner-occupied homes.
               Regular inspections ensure your electrical systems are safe and
               compliant with regulations.`,
    },
    {
      value: "item-3",
      question: "What does a Gas Safety Certificate entail?",
      answer: `A Gas Safety Certificate confirms that all gas appliances,
               fittings, and flues in a property are safe to use. It's a
               legal requirement for landlords to have an annual gas safety check
               conducted by a registered engineer.`,
    },
    {
      value: "item-4",
      question: "Why is PAT Testing important for my home?",
      answer: `Portable Appliance Testing (PAT) is important to ensure that
               electrical appliances are safe to use. Regular PAT testing helps
               prevent electrical hazards and ensures compliance with safety
               standards.`,
    },
    {
      value: "item-5",
      question:
        "How can I benefit from installing an EV charging station at home?",
      answer: `Installing an EV charging station at home offers convenience and
               cost savings for electric vehicle owners. It ensures your vehicle
               is always ready to go and can increase the value of your property.`,
    },
  ];
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
        <Accordion
          type="single"
          collapsible
          className="w-full hover:no-underline "
        >
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="font-bold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
