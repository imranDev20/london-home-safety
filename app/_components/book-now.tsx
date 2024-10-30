"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaHouse, FaBuilding, FaPenToSquare } from "react-icons/fa6";
import { useCallback } from "react";
import Link from "next/link";

const buttonData = [
  {
    label: "Residential Property",
    route: "/book-now?property_type=RESIDENTIAL",
    Icon: FaHouse,
  },
  {
    label: "Commercial Property",
    route: "/book-now?property_type=COMMERCIAL",
    Icon: FaBuilding,
  },
];

export default function BookNow() {
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Card className="text-white text-center border-none rounded-xl bg-primary">
      <CardHeader className="pb-0"></CardHeader>
      <CardContent>
        <h3 className="text-3xl font-bold mb-2">Book Now</h3>
        <p className="mb-7 font-normal">
          Secure your home&apos;s safety with our expert services. Book now!
        </p>

        <div className="flex flex-col gap-4">
          {buttonData.map((item) => (
            <Link
              href={item.route}
              key={item.label}
              className="font-medium h-auto text-base py-2 rounded-md border bg-primary border-white hover:bg-white hover:text-black flex items-center justify-center"
            >
              <item.Icon className="mr-2 text-xl" />
              {item.label}
            </Link>
          ))}
          {/* "Request a Quote" button scrolls to the Contact section */}
          <button
            onClick={scrollToContact}
            className="font-medium h-auto text-base py-2 rounded-md border bg-secondary hover:bg-black hover:text-white text-black border-secondary hover:border-black flex items-center justify-center"
          >
            <FaPenToSquare className="mr-2 text-xl" />
            Request a Quote
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
