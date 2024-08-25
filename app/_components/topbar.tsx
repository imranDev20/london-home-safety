import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook, IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";

export default function Topbar() {
  return (
    <div className="bg-primary text-white h-10  pt-2 ">
      <div className="flex justify-between max-w-6xl mx-auto">
        <div className="flex justify-around space-x-8">
          <p className="flex items-center gap-2 font-semibold">
            <FaWhatsapp className="text-2xl text-secondary " />
            020 8146 6698
          </p>
          <p className="flex items-center gap-2 font-semibold">
            <MdLocalPhone className="text-2xl text-secondary" />
            020 8146 6698
          </p>
          <p className="flex items-center gap-2 font-semibold">
            <IoMdMail className="text-2xl text-secondary" />
            info@homesafetylondon.co.uk
          </p>
        </div>
        <div className="flex gap-2 text-2xl text-secondary">
          <IoLogoFacebook />
          <FaInstagram />
          <FaXTwitter />
        </div>
      </div>
    </div>
  );
}
