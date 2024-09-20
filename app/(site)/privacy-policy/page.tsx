import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import PrivacPolicyPage from "./_components/privacy-policy-page";

const breadCrumbOptions = [
  {
    label: "Privacy Policy",
    isCurrentPage: true,
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <PrivacPolicyPage />
    </>
  );
};

export default PrivacyPolicy;
