"use client";
import achievementImage from "@/images/why-us.jpeg";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <div className="lg:w-1/2">
          <h3 className="text-lg text-blue-600 font-bold">Why choose us</h3>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Reliable & Professional Maintenance Work
          </h2>
          <p className="text-gray-600 mb-8 w-4/5">
            Mauris ac risus sed quam semper auctor. Nam tempus volutpat ipsum,
            non viverra odio mollis mollis. Integer lacus ligula, imperdiet vel
            massa in, maximus suscipit turpis. Mauris ac risus sed quam semper
            auctor. Nam tempus volutpat ipsum, non viverra.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className=" ">
                <h3 className="text-4xl font-bold text-blue-600">
                  {" "}
                  {counter}+
                </h3>
                <h4 className="text-xl font-semibold text-gray-900 mt-2">
                  Years Experience
                </h4>
                <p className="text-gray-600">
                  The standard chunk of <br /> Lorem Ipsum used since <br /> the
                  1500s below.
                </p>
              </div>
            ))}
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
