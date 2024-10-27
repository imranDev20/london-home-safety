import React, { useState, useEffect } from "react";

const useIntersectionObserver = (
  options?: IntersectionObserverInit,
  freezeOnceVisible = true
): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      } else {
        if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      }
    }, options);

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, freezeOnceVisible]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
