import { Clock, DollarSign, Shield, Star } from "lucide-react";
import React from "react";

export default function ServiceFeatures() {
  return (
    <div className="hidden md:grid grid-cols-2 gap-6 mt-10 ">
      <div className="flex items-center bg-blue-50 p-4 rounded-lg">
        <Clock className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-900">Quick Service</h3>
          <p className="text-sm text-gray-600">Fast turnaround time</p>
        </div>
      </div>
      <div className="flex items-center bg-green-50 p-4 rounded-lg">
        <Shield className="w-8 h-8 text-green-600 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-900">100% Guaranteed</h3>
          <p className="text-sm text-gray-600">Satisfaction assured</p>
        </div>
      </div>
      <div className="flex items-center bg-purple-50 p-4 rounded-lg">
        <Star className="w-8 h-8 text-purple-600 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-900">Expert Technicians</h3>
          <p className="text-sm text-gray-600">Skilled professionals</p>
        </div>
      </div>
      <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
        <DollarSign className="w-8 h-8 text-yellow-600 mr-3" />
        <div>
          <h3 className="font-semibold text-gray-900">Competitive Pricing</h3>
          <p className="text-sm text-gray-600">Best value for money</p>
        </div>
      </div>
    </div>
  );
}
