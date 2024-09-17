import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import CookiePolicyPage from "./_components/cookie-policy-page";

const breadCrumbOptions = [
  {
    label: "Cookie Policy",
    isCurrentPage: true,
  },
];

const CookiePolicy = () => {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <CookiePolicyPage />
    </>
  );
};

export default CookiePolicy;
