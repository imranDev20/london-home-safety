import { ALL_SERVICES, NAV_ITEMS } from "@/shared/data";
import { SiteSettingWithRelations } from "@/types/misc";
import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

export default function Footer({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  return (
    <footer className="bg-primary-darker text-white py-10 ">
      <div className="max-w-6xl mx-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
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
            <ul className="space-y-2  ">
              {NAV_ITEMS.map((option) => (
                <li key={option.path}>
                  <Link href={option.path} className="hover:underline">
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-2 ">
              <li className="hover:underline">
                {" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>

              <li className="hover:underline">
                {" "}
                <Link href={"/cookie-policy"}>Cookie Policy </Link>
              </li>

              <li className="hover:underline">
                <Link href={"/terms-and-conditions"}>Terms & Conditions </Link>
              </li>
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
                <a
                  href={`mailto:${siteSettings?.email || ""}`}
                  className="hover:underline"
                >
                  {siteSettings?.email || "No email address available"}
                </a>
              </li>
              <li className="flex items-center">
                <MdLocalPhone className="mr-2 text-xl" />
                <a
                  href={`tel:${siteSettings?.phone1 || ""}`}
                  className="hover:underline"
                >
                  {siteSettings?.phone1 || "No phone number available"}
                </a>
              </li>
              <li className="flex items-center">
                <IoLocationSharp className="mr-2 lg:text-5xl text-2xl" />
                46d, Greatorex Street, Micro Business Park, London, England, E1
                5NP
              </li>
            </ul>
            <div className="flex space-x-3 text-xl mt-4">
              <a href="#" className="hover:underline">
                <IoLogoFacebook />
              </a>
              <a href="#" className="hover:underline">
                <FaInstagram />
              </a>
              <a href="#" className="hover:underline">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:underline">
                <FaYoutube />
              </a>
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
