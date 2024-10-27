import { Button } from "@/components/ui/button";
import { SiteSettingWithRelations } from "@/types/misc";
import Link from "next/link";

export default function ServiceDetailsCta({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
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
          <Link href="/book-now">
            <Button className="bg-secondary text-black   rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors">
              Book an Appointment
            </Button>
          </Link>
          <a href={`tel:${siteSettings?.phone1 || ""}`}>
            <Button className="bg-white text-black   rounded-md text-lg font-semibold hover:bg-secondary hover:text-black transition-colors">
              Call:{siteSettings?.phone1 || "No phone number available"}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
