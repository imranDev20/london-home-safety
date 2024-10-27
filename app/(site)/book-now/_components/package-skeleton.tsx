import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Skeleton = ({ className, ...props }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

export default function BookNowPackagesSkeleton() {
  return (
    <>
      <div className="flex items-center justify-center mb-12">
        <Card className="p-6 mb-8 w-full">
          <h2 className="text-xl font-semibold mb-6 text-center">
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          {[...Array(3)].map((_, serviceIndex) => (
            <div key={serviceIndex} className="mb-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Skeleton className="h-12 w-12 mr-2" />
                <Skeleton className="h-8 w-1/2" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, packageIndex) => (
                  <Card key={packageIndex} className="shadow-lg">
                    <CardContent className="p-6 flex flex-col h-full items-center justify-between">
                      <div className="text-center flex flex-col w-full">
                        <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                      </div>
                      <div className="w-full mt-4">
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center mb-4 flex-col">
                          <Skeleton className="h-4 w-1/2 mb-2" />
                          <Skeleton className="h-8 w-1/3" />
                        </div>
                        <Skeleton className="h-10 w-full rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <div className="sticky top-4">
            <Card>
              <CardHeader className="py-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <Separator />
              <CardContent className="py-2 p-0">
                {[...Array(5)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-between py-3 px-4">
                      <div className="flex items-center">
                        <Skeleton className="h-12 w-12 mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-4" />
                    </div>
                    {index < 4 && <Separator />}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
