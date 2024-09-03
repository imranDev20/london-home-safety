import React from "react";
import { ALL_SERVICES } from "@/shared/data";
import { kebabToNormal } from "@/lib/utils";
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
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          About
          <span className="text-primary block mt-2 relative">
            {kebabToNormal(category)}
            <svg
              className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
              viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
              />
            </svg>
          </span>
        </h2>

        <p className="text-body leading-loose text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary">
            <span className="capitalize">{category.split("-")[0]}</span> safety
          </span>{" "}
          is a critical aspect of maintaining a secure and efficient
          environment, whether at home or in a commercial setting. At London
          Home Safety Limited, we offer a comprehensive range of{" "}
          <span className="text-primary">{kebabToNormal(category)}</span>{" "}
          designed to meet all your needs and ensure your property is safe and
          compliant with current regulations.
        </p>

        {services.map((service, index) => (
          <div key={service.path} className="mb-12">
            <CategoryServiceDetails service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
