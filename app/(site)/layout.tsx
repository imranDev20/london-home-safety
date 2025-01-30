import Footer from "../_components/foooter";
import Header from "../_components/header";
import PolicyConsentWrapper from "../_components/policy-consent-wrapper";
import SiteTopLoader from "../_components/site-top-loader";
import Topbar from "../_components/topbar";
import { getSettings } from "../admin/(require-auth)/settings/actions";
import FloatingCart from "./_components/floating-cart";

export default async function SiteLayout(props: { children: React.ReactNode }) {
  const siteSettings = await getSettings();

  return (
    <>
      <SiteTopLoader />
      <Topbar siteSettings={siteSettings} />
      <Header />
      <main>{props.children}</main>
      <FloatingCart />
      <Footer siteSettings={siteSettings} />
      
      <PolicyConsentWrapper />
    </>
  );
}
