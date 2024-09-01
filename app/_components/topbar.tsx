import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";

export default function Topbar() {
  return (
    <div className="bg-primary text-white h-10 pt-2">
      <div className="flex justify-between max-w-6xl mx-auto px-4">
        <div className="flex justify-around space-x-4 lg:space-x-8">
          <p className="flex items-center gap-2 font-normal text-sm lg:text-base">
            <FaWhatsapp className="text-xl lg:text-2xl text-secondary" />
            <span className="hidden lg:inline">020 8146 6698</span>
          </p>
          <Link
            href="tel:+020 8146 6698"
            className="flex items-center gap-2 font-normal text-sm lg:text-base"
          >
            <MdLocalPhone className="text-xl lg:text-2xl text-secondary" />
            <span className="hidden lg:inline">020 8146 6698</span>
          </Link>
          <Link
            href="mailto:info@homesafetylondon.co.uk"
            className="flex items-center gap-2 font-normal text-sm lg:text-base"
          >
            <IoMdMail className="text-xl lg:text-2xl text-secondary" />
            <span className="hidden lg:inline">
              info@homesafetylondon.co.uk
            </span>
          </Link>
        </div>
        <div className="flex gap-4 text-xl lg:text-2xl text-secondary">
          <a href="#" aria-label="Facebook">
            <IoLogoFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}
