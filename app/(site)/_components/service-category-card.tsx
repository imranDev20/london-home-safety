import { Card } from "@/components/ui/card";
interface ServiceProps {
  service: {
    id: number;
    serviceName: string;
    serviceDetail: string;
  };
}
export default function ServiceCategoryCard({ service }: ServiceProps) {
  return (
    <Card className="p-8 mt-8 rounded-2xl   hover:bg-blue-500 hover:text-white">
      <h2 className="text-2xl font-bold mb-4">{service.serviceName}</h2>
      <p>{service.serviceDetail}</p>
    </Card>
  );
}
