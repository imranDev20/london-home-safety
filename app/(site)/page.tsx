import { getPackages } from "../admin/(require-auth)/orders/[order_id]/actions";
import { getSettings } from "../admin/(require-auth)/settings/actions";
import AboutUsHome from "./_components/about-us-home";
import CallToAction from "./_components/call-to-action";
import Contact from "./_components/contact";
import CoverageAreas from "./_components/coverage-areas";
import Faq from "./_components/faq";
import Hero from "./_components/hero";
import Reviews from "./_components/reviews";
import ServiceCategories from "./_components/service-categories";
import Services from "./_components/services";
import Partners from "./about/_components/partners";
import { getReviews } from "./actions";

export default async function Home() {
  const reviews = await getReviews();
  const packages = await getPackages();
  const siteSettings = await getSettings();

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <Services siteSettings={siteSettings} packages={packages} />
      <AboutUsHome siteSettings={siteSettings} />
      <CoverageAreas />
      <ServiceCategories />
      <CallToAction siteSettings={siteSettings} />
      <Reviews reviews={reviews} />
      <Faq />
      <Partners />
      <Contact siteSettings={siteSettings} />
    </>
  );
}
