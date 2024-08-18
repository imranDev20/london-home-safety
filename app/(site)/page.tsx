import Footer from "@/components/global/foooter";
import Topbar from "@/components/global/header/topbar";
import AboutUsHome from "./_components/about-us-home";
import CallToAction from "./_components/call-to-action";
import Contact from "./_components/contact";
import Faq from "./_components/faq";
import Hero from "./_components/hero";
import Reviews from "./_components/reviews";
import ServiceCategories from "./_components/service-categories";

export default function Home() {
  return (
    <main>
      <Topbar />
      <Hero />
      <ServiceCategories />
      <AboutUsHome />
      <CallToAction />
      <Faq />
      <Contact />
      <Reviews />
      <Footer />
    </main>
  );
}
