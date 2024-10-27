import { SiteSettingWithRelations } from "@/types/misc";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import TelephoneIcon from "@/components/icons/telephone";

export default function Topbar({
  siteSettings,
}: {
  siteSettings: SiteSettingWithRelations;
}) {
  return (
    <div className="bg-primary text-white h-10 pt-2">
      <div className="flex justify-between max-w-6xl mx-auto px-4">
        <div className="flex justify-around space-x-4 lg:space-x-8">
          <Link
            href={`tel:${siteSettings?.phone2 || ""}`}
            className="flex items-center gap-2 font-normal text-sm lg:text-base hover:text-secondary transition-colors duration-200"
          >
            <TelephoneIcon width={18} height={18} className="fill-secondary" />
            <span className="hidden lg:inline">
              {siteSettings?.phone2 || "No landline number available"}
            </span>
          </Link>
          <Link
            href={`tel:${siteSettings?.phone1 || ""}`}
            className="flex items-center gap-2 font-normal text-sm lg:text-base hover:text-secondary transition-colors duration-200"
          >
            <MdLocalPhone className="text-xl lg:text-2xl text-secondary" />
            <span className="hidden lg:inline">
              {siteSettings?.phone1 || "No phone number available"}
            </span>
          </Link>
          <Link
            href={`mailto:${siteSettings?.email || ""}`}
            className="flex items-center gap-2 font-normal text-sm lg:text-base hover:text-secondary transition-colors duration-200"
          >
            <IoMdMail className="text-xl lg:text-2xl text-secondary" />
            <span className="hidden lg:inline">
              {siteSettings?.email || "No email address available"}
            </span>
          </Link>
        </div>
        <div className="flex gap-4 text-xl lg:text-2xl text-secondary">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white transition-colors duration-200"
          >
            <IoLogoFacebook />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition-colors duration-200"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}
