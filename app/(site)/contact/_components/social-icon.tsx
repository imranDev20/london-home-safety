import { ContactUs } from "@/types/contact";
import React from "react";

export const SocialIcon = ({ item }: { item: ContactUs }) => {
  return (
    <div key={item.href} className="relative group">
      <button className="p-2 hover:bg-gray-100 transition-colors">
        {item.icons}
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-secondary text-black text-sm rounded px-2 py-1">
        {item.label}
      </div>
    </div>
  );
};

export default SocialIcon;
