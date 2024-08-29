import { Contact } from "@/types/contact";
import React from "react";

export const ContactDetails = ({ item }: { item: Contact }) => {
  return (
    <div
      key={item.id}
      className="flex space-x-4 bg-white rounded-2xl p-6 shadow-lg w-[350px]"
    >
      <div> {item.icons}</div>
      <div>
        <h3 className="font-bold text-xl mb-4">{item.title}</h3>
        <p className="text-body text-[1.10rem]   max-w-[260px] ">{item.info}</p>
      </div>
    </div>
  );
};

export default ContactDetails
