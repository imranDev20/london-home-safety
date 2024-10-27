"use client";

import React from "react";
import Link from "next/link";

interface SocialItem {
  id: number;
  label: string;
  href: string;
  icons: JSX.Element;
}

interface SocialIconProps {
  item: SocialItem;
}

export default function SocialIcon({ item }: SocialIconProps): JSX.Element {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-primary transition-colors duration-300"
    >
      {item.icons}
      <span className="sr-only">{item.label}</span>
    </Link>
  );
}
