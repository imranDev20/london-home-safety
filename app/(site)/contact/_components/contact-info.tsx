"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SOCIALS } from "@/shared/data";
import { SiteSettingWithRelations } from "@/types/misc";
import { Clock, LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import SocialIcon from "./social-icon";
import GroupedOpeningHours from "./grouped-opening-hours";

interface ContactInfoItemProps {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
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
      <div className="text-gray-600">{content}</div>
    </div>
  </div>
);

export default function ContactInfo({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}): JSX.Element {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Contact Information
        </h2>
        <ContactInfoItem
          icon={Phone}
          title="Phone"
          content={siteSettings?.phone1 || "No phone number available"}
        />
        <ContactInfoItem
          icon={Mail}
          title="Email"
          content={siteSettings?.email || "No email address available"}
        />
        <ContactInfoItem
          icon={MapPin}
          title="Address"
          content="46d, Greatorex Street, Micro Business Park, London, England, E1 5NP"
        />
        <ContactInfoItem
          icon={Clock}
          title="Working Hours"
          content={
            siteSettings?.openingDateTime &&
            siteSettings.openingDateTime.length > 0 ? (
              <GroupedOpeningHours
                openingHours={siteSettings.openingDateTime}
              />
            ) : (
              "Opening hours not available"
            )
          }
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
