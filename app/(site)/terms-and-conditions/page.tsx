import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import TermsAndConditionPage from "./_components/terms-and-condition-page";

const breadCrumbOptions = [
  {
    label: "Terms And Conditions",
    isCurrentPage: true,
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <TermsAndConditionPage />
    </>
  );
};

export default TermsAndConditions;
