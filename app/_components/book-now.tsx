"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FaHouse, FaBuilding, FaPenToSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const buttonData = [
  {
    label: "Residential Property",
    route: "/book-now?property_type=RESIDENTIAL",
    Icon: FaHouse,
    isScroll: false,
  },
  {
    label: "Commercial Property",
    route: "/book-now?property_type=COMMERCIAL",
    Icon: FaBuilding,
    isScroll: false,
  },
  {
    label: "Request a Quote",
    route: "#contact",
    Icon: FaPenToSquare,
    isScroll: true,
  },
];

export default function BookNow() {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    isScroll: boolean
  ) => {
    if (isScroll) {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <Card className="text-white text-center border-none rounded-xl bg-primary">
      <CardHeader className="pb-0"></CardHeader>
      <CardContent>
        <h3 className="text-3xl font-bold mb-2">Book Now</h3>
        <p className="mb-7 font-normal">
          Secure your home&apos;s safety with our expert services. Book now!
        </p>

        <div className="flex flex-col gap-4">
          {buttonData.map((item, index) => (
            <Link
              href={item.route}
              key={item.label}
              onClick={(e) => handleClick(e, item.isScroll)}
              className={`font-medium h-auto text-base py-[9px] rounded-md border flex items-center justify-center ${
                index === buttonData.length - 1
                  ? "bg-secondary hover:bg-black hover:text-white text-black border-secondary hover:border-black"
                  : "bg-primary border-white hover:bg-white hover:text-black"
              }`}
            >
              <item.Icon className="mr-2 text-xl" />
              {item.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
