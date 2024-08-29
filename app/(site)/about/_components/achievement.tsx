"use client";

import achievementImage from "@/images/why-us.jpeg";
import Image from "next/image";
import Counter from "./counter";

export default function Achievement() {
  return (
    <section className="bg-white py-20 my-20">
      <div className="max-w-6xl mx-auto px-4 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2 p-10 mb-5">
          <h2 className="text-4xl font-bold mb-10 text-[#32383E]">Our Proud Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Counter
              end={2000}
              duration={2000}
              title="Satisfied Customers"
              description="Proudly served over 2,000 happy customers across London."
            />
            <Counter
              end={500}
              duration={2000}
              title="Successful Projects"
              description="Completed more than 500 successful safety projects."
            />
            <Counter
              end={100}
              duration={2000}
              title="Annual Inspections"
              description="We conduct over 500 safety inspections annually, helping to maintain the highest safety standards for our clients."
            />
            <Counter
              end={20}
              duration={2000}
              title="Certified Engineers"
              description="Our team consists of over 20 certified engineers dedicated to providing the highest quality safety services."
            />
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="sticky top-32">
            <div className="relative max-w-[350px]">
              <Image
                src={achievementImage}
                alt="serviceImage"
                width={350}
                height={350}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="absolute max-w-[400px] top-[60%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 p-2.5 bg-white rounded-2xl flex justify-center items-center">
              <Image
                src={achievementImage}
                alt="serviceImage"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="absolute w-[400px] h-[600px] -top-10 right-0 rounded-xl border-[10px] border-yellow-300/40 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
