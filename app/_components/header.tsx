import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCalendarCheck, FaCartShopping } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto max-w-screen-xl px-16 flex justify-between items-center py-3">
        <div>LoGo</div>

        <div className="flex items-center">
          <ul className="flex gap-10">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>

          <div className="ml-16 flex items-center gap-7">
            <Link href="/book-now">
              <Button className="py-5 text-base bg-secondary hover:bg-black  text-black hover:text-white flex items-center">
                <FaCalendarCheck className="mr-2" />
                Book Now
              </Button>
            </Link>

            <Link href="/cart" className="p-3">
              <FaCartShopping className="text-2xl text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
