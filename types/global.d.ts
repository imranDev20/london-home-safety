// globals.d.ts
declare global {
    interface Window {
      woosmap: {
        localities: {
          Localities: any; // You can replace 'any' with the correct type if you have it
        };
      };
    }
  }
  
  export {};
  