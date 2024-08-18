import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BookNow() {
  return (
    <Card className="text-white text-center border-none rounded-xl bg-[#05a5d1] p-6 opacity-95">
      <h1 className="text-3xl font-bold">Book Now</h1>
      <p>Select Your Property as appropriate and get quote in 30 seconds!</p>
      <Button className="bg-[#05a5d1] border border-white w-full mt-6 font-bold">
        Residential Property
      </Button>
      <Button className="bg-[#05a5d1] border border-white w-full mt-4 font-bold">
        Commercial Property
      </Button>
      <Button className="bg-yellow-500 hover:bg-yellow-500  text-black w-full mt-4 font-bold">
        Request a Quote
      </Button>
    </Card>
  );
}
