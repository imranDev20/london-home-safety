import Footer from "../_components/foooter";
import Header from "../_components/header";
import SiteTopLoader from "../_components/site-top-loader";
import Topbar from "../_components/topbar";
import FloatingCart from "./_components/floating-cart";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <SiteTopLoader />
      <Topbar />
      <Header />
      <main>{props.children}</main>
      <FloatingCart />
      <Footer />
    </>
  );
}
