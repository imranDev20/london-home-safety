import Footer from "../_components/foooter";
import Header from "../_components/header";
import Topbar from "../_components/topbar";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Header />
      <main className="max-w-[100vw] overflow-hidden">{props.children}</main>
      <Footer />
    </>
  );
}
