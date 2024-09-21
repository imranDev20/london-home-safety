import React, { Suspense } from "react";
import BookNowCompo from "./_components/book-now-compo";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import BookNowPackagesSkeleton from "./_components/package-skeleton";

const breadCrumbOptions = [{ label: "Book Now", isCurrentPage: true }];

export default function BookNowPage() {
  return (
    <>
      <div className="bg-gray-50">
        <PageHeader
          backgroundImage={BackgroundImage}
          breadCrumbOptions={breadCrumbOptions}
        />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Book Your Professional
            <span className="text-primary block mt-2 relative">
              Safety Services Today
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
          </h1>

          <Suspense fallback={<BookNowPackagesSkeleton />}>
            <BookNowCompo />
          </Suspense>
        </div>
      </div>
    </>
  );
}
