import AboutUsHome from "../_components/about-us-home";
import AboutCta from "./_components/about-cta";
import Achievement from "./_components/achievement";
import Advantage from "./_components/advantage";
import PageHeader from "./_components/page-header";
import Partners from "./_components/partners";

export default function About() {
  return (
    <div>
      <PageHeader />
      <AboutUsHome />
      <Advantage />
      <Achievement />
      <AboutCta />
      <Partners />
    </div>
  );
}
