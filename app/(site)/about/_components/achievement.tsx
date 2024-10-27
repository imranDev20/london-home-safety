"use client";

import React from "react";
import Image from "next/image";
import { Trophy, Users, Clipboard, UserCheck } from "lucide-react";
import CounterCard from "./counter"; // Import the CounterCard component

import AchievementImage1 from "@/images/electrician-house-owner.jpeg";
import AchievementImage2 from "@/images/electrician-thumbs.jpeg";
import AchievementImage3 from "@/images/electrician-with-happy-family.jpeg";
import AchievementImage4 from "@/images/electrician-with-report.jpeg";
import Link from "next/link";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const Achievement: React.FC = () => {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`bg-gradient-to-t from-blue-50 to-white py-24 overflow-hidden transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Celebrating Our
                <span className="text-primary block mt-2">Milestones</span>
              </h2>
              <p className="text-xl text-gray-600">
                At London Home Safety, we take pride in our achievements and the
                trust our customers place in us. Our journey is defined by
                satisfied customers, successful projects, and a commitment to
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CounterCard
                icon={Users}
                end={2000}
                duration={2000}
                title="Satisfied Customers"
                description="Proudly served over 2,000 happy customers across London."
              />
              <CounterCard
                icon={Trophy}
                end={500}
                duration={2000}
                title="Successful Projects"
                description="Completed more than 500 successful safety projects."
              />
              <CounterCard
                icon={Clipboard}
                end={100}
                duration={2000}
                title="Annual Inspections"
                description="We conduct over 500 safety inspections annually."
              />
              <CounterCard
                icon={UserCheck}
                end={20}
                duration={2000}
                title="Certified Engineers"
                description="Our team consists of over 20 certified engineers."
              />
            </div>

            <Link href="/services" className="mt-5 block">
              <button className="bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-primary-dark transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                Learn More About Our Services
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-6 grid-rows-5 gap-4 h-[500px] sm:h-[600px] w-full">
              <div className="col-span-3 row-span-3 relative rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={AchievementImage1}
                  alt="Electrician with house owner"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="col-span-3 row-span-2 relative rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={AchievementImage2}
                  alt="Electrician giving thumbs up"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="col-span-3 row-span-3 relative rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={AchievementImage3}
                  alt="Electrician with happy family"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="col-span-3 row-span-2 relative rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={AchievementImage4}
                  alt="Electrician with report"
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
