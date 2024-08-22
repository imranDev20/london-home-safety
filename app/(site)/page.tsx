import dynamic from "next/dynamic";
import Hero from "./_components/hero";

// const Hero = dynamic(() => import("./_components/hero"), {
//   ssr: true,
//   loading: () => <p>Loading...</p>,
// });

const ServiceCategories = dynamic(
  () => import("./_components/service-categories"),
  { ssr: true, loading: () => <p>Loading...</p> }
);
const AboutUsHome = dynamic(() => import("./_components/about-us-home"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});
const CallToAction = dynamic(() => import("./_components/call-to-action"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});
const Faq = dynamic(() => import("./_components/faq"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});
const Contact = dynamic(() => import("./_components/contact"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});
const Reviews = dynamic(() => import("./_components/reviews"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

export const runtime = "edge";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCategories />
      <AboutUsHome />
      <CallToAction />
      <Faq />
      <Contact />
      <Reviews />
    </>
  );
}
