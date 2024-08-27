import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import CategoryServiceDetails from "./category-service-details";

export default function AboutCategory({
  categoryId: category,
}: {
  categoryId: string;
}) {
  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );
  return (
    <div className="max-w-6xl mx-auto my-20">
      <h1 className="text-4xl font-bold text-center mb-5">
        About {kebabCaseToNormalText(category)}
      </h1>
      <p className="text-body leading-loose font-semibold text-center w-[80%] mx-auto">
        <span className="text-primary">
          <span className="capitalize"> {category.split("-")[0]}</span> safety
        </span>{" "}
        is a critical aspect of maintaining a secure and efficient environment,
        whether at home or in a commercial setting. At London Home Safety
        Limited, we offer a comprehensive range of{" "}
        <span className="text-primary">{kebabCaseToNormalText(category)}</span>{" "}
        designed to meet all your needs and ensure your property is safe and
        compliant with current regulations.{" "}
      </p>

      {services.map((service, index) => (
        <CategoryServiceDetails
          key={service.path}
          service={service}
          index={index}
        />
      ))}
    </div>
  );
}
