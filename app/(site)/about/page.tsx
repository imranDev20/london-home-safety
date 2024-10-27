import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/electric.jpg";
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

export default async function About() {
  const siteSettings = await getSettings();
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <AboutUsHome siteSettings={siteSettings} />
      <Advantage />
      <Achievement />
      <AboutCta siteSettings={siteSettings} />
      <Partners />
    </div>
  );
}
