import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import AboutUsHome from "../_components/about-us-home";
import AboutCta from "./_components/about-cta";
import Achievement from "./_components/achievement";
import Advantage from "./_components/advantage";
import Partners from "./_components/partners";

const breadCrumbOptions = [
  {
    label: "About Us",
    isCurrentPage: true,
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <AboutUsHome />
      <Advantage />
      <Achievement />
      <AboutCta />
      <Partners />
    </div>
  );
}
