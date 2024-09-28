"use client";

import { Button } from "@/components/ui/button";
import backgroundImage from "@/images/about-bg.jpeg";
import { SiteSettingWithRelations } from "@/types/misc";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";

export default function AboutCta({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  return (
    <div className="relative py-24 md:py-32 flex items-center justify-center bg-[#1D63A9] overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
        loading="lazy"
      />
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Can We Help You?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-10 mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          London Home Safety collaborates with vetted professionals who are
          registered with official UK bodies. Our tradespeople are highly
          skilled and experienced in their respective fields. We value customer
          feedback to ensure the best hassle-free experience for you.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/book-now" className="w-full sm:w-auto">
            <Button className="w-full sm:w-[200px] bg-yellow-400 text-black px-6 py-4 rounded-md hover:bg-body-dark hover:text-white font-bold transition-all duration-300">
              <FaCalendarAlt className="mr-2" />
              Book Now
            </Button>
          </Link>
          <Link
            href={`tel:${siteSettings?.phone1 || ""}`}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-[200px] bg-white text-[#1D63A9] px-6 py-4 rounded-md hover:bg-body-dark hover:text-white font-bold transition-all duration-300">
              <FaPhoneAlt className="mr-2" />
              {siteSettings?.phone1 || "No phone number available"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
