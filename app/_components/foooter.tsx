import { ALL_SERVICES, NAV_ITEMS } from "@/shared/data";
import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-primary-darker text-white py-10 ">
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
              {NAV_ITEMS.map((option) => (
                <li key={option.path}>
                  <Link href={option.path} className="hover:underline">
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {ALL_SERVICES.map((item) => (
                <li key={item.path}>
                  <Link
                    href={`/services${item.categoryPath}${item.path}`}
                    className="hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2  ">
              <li className="flex items-center">
                <IoMdMail className="mr-2 text-xl" />
                <Link
                  href="mailto:info@homesafetylondon.co.uk"
                  className="hover:underline"
                >
                  info@londonhomesafety.co.uk
                </Link>
              </li>
              <li className="flex items-center">
                <MdLocalPhone className="mr-2 text-xl" />
                <Link href="tel:+020 8146 6698" className="hover:underline">
                  020 8146 6698
                </Link>
              </li>
              <li className="flex items-center">
                <IoLocationSharp className="mr-2 text-2xl" />
                43 Felton Road, Barking, London IG11 7YA
              </li>
            </ul>
            <div className="flex space-x-3 text-xl mt-4">
              <Link href="#" className="hover:underline">
                <IoLogoFacebook />
              </Link>
              <Link href="#" className="hover:underline">
                <FaInstagram />
              </Link>
              <Link href="#" className="hover:underline">
                <FaXTwitter />
              </Link>
              <Link href="#" className="hover:underline">
                <FaYoutube />
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
