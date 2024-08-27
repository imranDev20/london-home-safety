"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end: number;
  duration: number;
  title: string;
  description: string;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration,
  title,
  description,
}) => {
  const [count, setCount] = useState<number>(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 100);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref}>
      <p className="text-4xl font-extrabold text-primary mb-2">
        {count} +
      </p>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-base text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default Counter;