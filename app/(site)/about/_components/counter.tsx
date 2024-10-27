"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface CounterCardProps {
  icon: React.ElementType;
  end: number;
  duration: number;
  title: string;
  description: string;
}

const CounterCard: React.FC<CounterCardProps> = ({
  icon: Icon,
  end,
  duration,
  title,
  description,
}) => {
  const [count, setCount] = useState<number>(0);
  const [ref, inView] = useIntersectionObserver(
    { threshold: 0.1 },
    true // freezeOnceVisible set to true
  );

  useEffect(() => {
    if (inView && count === 0) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration, count]);

  return (
    <Card
      ref={ref}
      className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-4xl font-extrabold text-primary mb-2">{count}+</p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CounterCard;
