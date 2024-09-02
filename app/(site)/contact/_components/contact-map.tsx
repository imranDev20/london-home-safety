import React from "react";

export default function ContactMap() {
  const address = "43 Felton Road, Barking, IG11 7YA";
  const businessName = "London Home Safety Limited";

  const encodedAddress = encodeURIComponent(address);
  const encodedBusinessName = encodeURIComponent(businessName);

  const mapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedAddress}+(${encodedBusinessName})&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <iframe
      width="100%"
      height="600"
      frameBorder="0"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      src={mapSrc}
      title={`Google Map - ${businessName}`}
    ></iframe>
  );
}
