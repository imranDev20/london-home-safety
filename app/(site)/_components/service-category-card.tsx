import { Card } from "@/components/ui/card";
import { NavItem } from "@/types/misc";
import Link from "next/link";

export default function ServiceCategoryCard({ service }: { service: NavItem }) {
  const { path, label, description } = service;
  return (
    <Link href={`/services${path}`}>
      <Card className="p-8 shadow-md hover:bg-primary hover:text-white group">
        <h4 className="text-2xl font-semibold mb-4">{label}</h4>
        <p className="text-body group-hover:text-white font-normal leading-6">
          {description}
        </p>
      </Card>
    </Link>
  );
}
