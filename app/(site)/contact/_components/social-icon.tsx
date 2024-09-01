import { ContactUs } from "@/types/contact";
import React from "react";

export const SocialIcon = ({ item }: { item: ContactUs }) => {
  return (
    <div className="relative group">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {item.icons}
      </a>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-sm rounded-md px-2 py-1">
        {item.label}
      </div>
    </div>
  );
};

export default SocialIcon;
