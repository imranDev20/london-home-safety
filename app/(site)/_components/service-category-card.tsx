import { Card } from "@/components/ui/card";
import Link from "next/link";
interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
  };
}
export default function ServiceCategoryCard({ service }: ServiceProps) {
  return (
    <Link href="/">
      <Card className="p-8 shadow-md hover:bg-primary hover:text-white group">
        <h4 className="text-2xl font-semibold mb-4">{service.serviceName}</h4>
        <p className="text-body group-hover:text-white font-normal leading-6">
          {service.serviceDetail}
        </p>
      </Card>
    </Link>
  );
}
