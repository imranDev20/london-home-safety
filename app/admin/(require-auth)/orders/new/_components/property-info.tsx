import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CreateOrderFormInput } from "../schema";
import { Building2, Car, MapPin } from "lucide-react";

export default function PropertyInfo() {
  const { control } = useFormContext<CreateOrderFormInput>();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Property Information</CardTitle>
        <CardDescription>
          Provide details about the property and parking situation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8">
          {/* Property Type */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex gap-1">
              Property Type
              <span className="text-destructive">*</span>
            </h3>
            <FormField
              control={control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === "RESIDENTIAL"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("RESIDENTIAL")}
                    >
                      <Building2 className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Residential
                        </h3>
                        <p className="text-sm text-gray-500">
                          For homes and residential properties
                        </p>
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === "COMMERCIAL"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("COMMERCIAL")}
                    >
                      <Building2 className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Commercial
                        </h3>
                        <p className="text-sm text-gray-500">
                          For business properties
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Parking Options */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex gap-1">
              Parking Availability
              <span className="text-destructive">*</span>
            </h3>{" "}
            <FormField
              control={control}
              name="parkingOptions"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === "FREE"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("FREE")}
                    >
                      <Car className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Free
                        </h3>
                        <p className="text-sm text-gray-500">
                          Free parking available
                        </p>
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === "PAID"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("PAID")}
                    >
                      <Car className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Paid
                        </h3>
                        <p className="text-sm text-gray-500">
                          Paid parking required
                        </p>
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === "NO"
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("NO")}
                    >
                      <Car className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          No Parking
                        </h3>
                        <p className="text-sm text-gray-500">
                          No parking available
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Congestion Zone */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 flex gap-1">
              Congestion Zone
              <span className="text-destructive">*</span>
            </h3>{" "}
            <FormField
              control={control}
              name="isCongestionZone"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === true
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange(true)}
                    >
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          Yes
                        </h3>
                        <p className="text-sm text-gray-500">
                          Property is in congestion zone
                        </p>
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        field.value === false
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange(false)}
                    >
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          No
                        </h3>
                        <p className="text-sm text-gray-500">
                          Property is not in congestion zone
                        </p>
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
