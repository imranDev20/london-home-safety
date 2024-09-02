"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ContactUsForm from "@/app/_components/common/contact-us-form";

export default function ContactForm(): JSX.Element {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Send Us a Message
        </h2>
        <ContactUsForm
          formClass="space-y-6"
          inputClass="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          buttonClass="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary/90 transition-colors duration-300"
          textareaClass="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          errorTextClass="text-red-500 text-sm mt-1"
        />
      </CardContent>
    </Card>
  );
}
