"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, LucideIcon } from "lucide-react";
import { SOCIALS } from "@/shared/data";
import SocialIcon from "./social-icon";

interface ContactInfoItemProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon: Icon,
  title,
  content,
}) => (
  <div className="flex items-start mb-6">
    <div className="mr-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export default function ContactInfo(): JSX.Element {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Contact Information
        </h2>
        <ContactInfoItem icon={Phone} title="Phone" content="020 8146 6698" />
        <ContactInfoItem
          icon={Mail}
          title="Email"
          content="info@londonhomesafety.co.uk"
        />
        <ContactInfoItem
          icon={MapPin}
          title="Address"
          content="123 Safety Street, London, UK"
        />
        <ContactInfoItem
          icon={Clock}
          title="Working Hours"
          content="Monday - Sunday: 09:00 - 17:00"
        />

        <div className="mt-8">
          <h3 className="font-semibold mb-4 text-gray-900">Follow Us</h3>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <SocialIcon key={social.id} item={social} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
