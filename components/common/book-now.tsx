import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BookNow() {
  return (
    <Card className="text-white text-center border-none rounded-xl bg-primary">
      <CardHeader className="pb-0"></CardHeader>
      <CardContent>
        <h3 className="text-3xl font-bold mb-2">Book Now</h3>
        <p className="mb-4 font-normal">
          Secure your home&apos;s safety with our expert services. Book now!
        </p>

        <Button className="bg-primary border border-white w-full font-medium">
          Residential Property
        </Button>
        <Button className="bg-primary border border-white w-full  font-medium">
          Commercial Property
        </Button>
        <Button className="bg-secondary  text-black w-full font-medium">
          Request a Quote
        </Button>
      </CardContent>
    </Card>
  );
}
