import { ALL_SERVICES } from "@/shared/data";
import Link from "next/link";

export default function Footer() {
  const services = ALL_SERVICES;
  return (
    <footer className="bg-primary text-white py-10 ">
      <div className="max-w-6xl mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div className="">
            <h2 className="text-xl font-bold mb-4">London Home Safety</h2>
            <p className="text-sm leading-6">
              Protecting your home with expert safety solutions. From electrical
              and gas safety to fire prevention and health services, we ensure
              peace of mind for homeowners across London. Your safety is our
              priority. Contact us today and experience the difference with our
              professional team.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.path}>
                  <Link href="#" className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Link
                  href="mailto:info@homesafetylondon.co.uk"
                  className="hover:underline"
                >
                  info@homesafetylondon.co.uk
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="tel:+1234567890" className="hover:underline">
                  +123-456-7890
                </Link>
              </li>
              <li className="flex items-center">
                27 Old Gloucester Street, London WC1N 3AX
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:underline">
                <span className="material-icons">facebook</span>
              </Link>
              <Link href="#" className="hover:underline">
                <span className="material-icons">instagram</span>
              </Link>
              <Link href="#" className="hover:underline">
                <span className="material-icons">twitter</span>
              </Link>
              <Link href="#" className="hover:underline">
                <span className="material-icons">youtube</span>
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-10 border-gray-400" />
        <div className="container mx-auto mt-8   pt-6 flex justify-between text-sm">
          <p>©2024 Home Safety London. All Rights Reserved</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:underline">
              Support
            </Link>
            <Link href="#" className="hover:underline">
              Disclaimer
            </Link>
            <Link href="#" className="hover:underline">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
