"use client";

import React, { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    elfsight: {
      reinit: () => void;
    };
  }
}

const WhatsAppWidget: React.FC = () => {
  useEffect(() => {
    // This will run after the component mounts
    if (window.elfsight) {
      window.elfsight.reinit();
    }
  }, []);

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.elfsight) {
            window.elfsight.reinit();
          }
        }}
      />
      <div
        className="elfsight-app-42602d48-4e3b-4055-a06e-ae7fef0fa6bc"
        data-elfsight-app-lazy
      />
    </>
  );
};

export default WhatsAppWidget;
