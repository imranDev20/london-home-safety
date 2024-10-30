// // hooks/useDebounce.ts
// import { useState, useEffect } from "react";

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

import { useState, useEffect, useCallback } from "react";

// This generic type handles both value and function types
export function useDebounce<T>(value: T, delay: number): T extends (...args: any[]) => any ? T : T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (typeof value !== "function") {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  // Debounce function if the value is a function
  const debouncedFunction = useCallback(
    (...args: any[]) => {
      const handler = setTimeout(() => {
        if (typeof value === "function") {
          (value as (...args: any[]) => any)(...args);
        }
      }, delay);

      return () => clearTimeout(handler);
    },
    [value, delay]
  );

  // Return debounced function or value based on type
  return (typeof value === "function" ? (debouncedFunction as any) : debouncedValue) as T extends (
    ...args: any[]
  ) => any
    ? T
    : T;
}
