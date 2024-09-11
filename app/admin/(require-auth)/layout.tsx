import React from "react";
import AdminPanelLayout from "./_components/admin-panel-layout";
import NextAuthSessionProvider from "@/providers/session-provider";
import AdminTopLoader from "@/app/_components/admin-top-loader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AdminTopLoader />
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </NextAuthSessionProvider>
  );
}
