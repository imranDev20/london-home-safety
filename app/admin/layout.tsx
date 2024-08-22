import React from "react";
import AdminPanelLayout from "./_components/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}
  <Toaster />
  </AdminPanelLayout>;
}
