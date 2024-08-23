import EpcIcon from "@/components/icons/epc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ServiceCard({
  title,
  price,
  className,
}: {
  title: string;
  price?: number;
  className?: string;
}) {
  return (
    <Card
      className={`p-5 flex flex-col justify-between items-center hover:shadow-lg transition-all ${className}`}
    >
      <div className="flex flex-col items-center">
        <EpcIcon />
        <h3 className="text-xl font-semibold text-body-dark mb-2 mt-3 text-center">
          {title}
        </h3>
        <p className="text-body text-sm mt-2">Starts From</p>
        {price && (
          <p className="text-primary font-bold text-2xl mb-4">£{price}</p>
        )}
      </div>
      <Button className="w-full mt-4 bg-secondary text-black font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
        Book Now
      </Button>
    </Card>
  );
}
