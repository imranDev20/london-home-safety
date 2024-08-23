import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServiceDetailsCta() {
  return (
    <div className="relative my-10 mx-auto   overflow-hidden">
      <div className="relative h-full py-10 bg-black text-white rounded-2xl text-center px-5">
        <h2 className="text-4xl font-bold mb-3">
          Take the First Step Towards Safety
        </h2>
        <p className="text-lg">
          Book your desired service today and experience the peace of mind that
          comes with a safe and secure home. Visit our services page to find out
          more and schedule an appointment.
        </p>

        <div className="flex justify-center mt-5 space-x-3">
          <Button className="bg-secondary text-black   rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors">
            <Link href="#">Book an Appointment</Link>
          </Button>
          <Button className="bg-white text-black   rounded-md text-lg font-semibold hover:bg-secondary hover:text-black transition-colors">
            <Link href="#">Call: 020 8146 6698</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
