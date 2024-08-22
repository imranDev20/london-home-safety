import Footer from "@/components/global/foooter";
import Header from "@/components/global/header/header";
import React from "react";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
