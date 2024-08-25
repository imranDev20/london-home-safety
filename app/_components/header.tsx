import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa6";
import CartDrawer from "./cart-drawer";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="container mx-auto max-w-screen-xl px-16 flex justify-between items-center py-3">
        <div>LoGo</div>

        <div className="flex items-center">
          <ul className="gap-10 hidden lg:flex">
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

            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
