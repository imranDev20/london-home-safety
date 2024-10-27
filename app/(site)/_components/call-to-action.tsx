"use client";

import { Button } from "@/components/ui/button";
import BackgroundImage from "@/images/about-bg.jpeg";
import { SiteSettingWithRelations } from "@/types/misc";
import { motion, useAnimation } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CallToAction = ({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <Image
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        loading="lazy"
      />

      <motion.div
        className="absolute inset-0 bg-[rgba(32,106,178,0.8)]"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={itemVariants}
      />

      <motion.div
        className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          variants={itemVariants}
        >
          Take the First Step Towards <br className="hidden sm:inline" />
          <span className="text-yellow-400">Safety</span>
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl mb-8 mx-auto my-6 sm:my-8 md:my-10 max-w-3xl"
          variants={itemVariants}
        >
          Book your desired service today and experience the peace of mind that
          comes with a safe and secure home. Visit our services page to find out
          more and schedule an appointment.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full sm:w-auto bg-black text-white px-6 rounded-md hover:bg-yellow-400 font-semibold hover:text-black text-lg py-4 sm:py-6 transition-all duration-300 flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Calendar
                className={`mr-2 ${isHovered ? "animate-bounce" : ""}`}
                size={20}
              />
              Book Now
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href={`tel:${siteSettings?.phone1 || ""}`}
              className="w-full sm:w-auto"
            >
              <Button className="w-full bg-white text-black px-6 rounded-md hover:bg-yellow-400 font-semibold text-lg py-4 sm:py-6 transition-all duration-300 flex items-center justify-center group">
                <Phone className="mr-2 group-hover:animate-ping" size={20} />
                Call Now
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
