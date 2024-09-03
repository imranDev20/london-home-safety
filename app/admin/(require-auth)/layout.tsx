import React from "react";
import AdminPanelLayout from "./_components/admin-panel-layout";
import NextAuthSessionProvider from "@/providers/session-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>;
    </NextAuthSessionProvider>
  );
}
