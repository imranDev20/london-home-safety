'use client';

import React, { useEffect, useState } from "react";
import PolicyConsentPopup from "./policy-consent-popup";

const PolicyConsentWrapper: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("policy-consent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem("policy-consent", consent ? "accepted" : "rejected");
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <PolicyConsentPopup onConsent={handleConsent} />}
    </>
  );
};

export default PolicyConsentWrapper;
