import AboutUsHome from "./_components/about-us-home";
import CallToAction from "./_components/call-to-action";
import Contact from "./_components/contact";
import Faq from "./_components/faq";
import Hero from "./_components/hero";
import Reviews from "./_components/reviews";
import ServiceCategories from "./_components/service-categories";
import Services from "./_components/services";
import Partners from "./about/_components/partners";
import { getReviews } from "./actions";

export default async function Home() {
  const reviews = await getReviews();

  return (
    <>
      <Hero />
      <Services />
      <AboutUsHome />
      <ServiceCategories />
      <CallToAction />
      <Reviews reviews={reviews} />
      <Faq />
      <Partners />
      <Contact />
    </>
  );
}
