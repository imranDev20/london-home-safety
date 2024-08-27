"use client";
import achievementImage from "@/images/why-us.jpeg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Counter from "./counter";

export default function Achievement() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter < 100) {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 5;
          if (newCounter >= 100) {
            clearInterval(intervalId);
          }
          return newCounter;
        });
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [counter]);
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2 p-10">
         
          <h2 className="text-4xl font-bold   mb-10">
          Our Proud Achievements
          </h2>
         
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

        <div className="relative w-full max-w-sm   mx-auto">
          <div className="rounded-lg overflow-hidden mr-6 shadow-md">
            <Image
              src={achievementImage}
              alt="Electrician working on a circuit board"
              width={300}
              height={200}
              layout="responsive"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-4 -right-4 w-2/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={achievementImage}
              alt="Close-up of electrician's hands"
              width={200}
              height={133}
              layout="responsive"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 w-2/3 h-full bg-yellow-300 rounded-lg -z-10"></div>
        </div>
      </div>
    </section>
  );
}
