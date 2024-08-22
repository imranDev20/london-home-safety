import CityGuilds from "@/images/partner-logos/city-guilds.svg";
import EalRecognised from "@/images/partner-logos/eal.png";
import ElmhurstEnergy from "@/images/partner-logos/elmhurst-energy.jpeg";
import GasSafeRegister from "@/images/partner-logos/gas-safe-register.svg";
import IFSM from "@/images/partner-logos/ifsm.png";
import NapitImage from "@/images/partner-logos/napit.png";
import Nebosh from "@/images/partner-logos/nebosh.svg";
import NICEIC from "@/images/partner-logos/niceic.svg";
import PartP from "@/images/partner-logos/part-p.png";
import TrustMark from "@/images/partner-logos/trustmark.jpeg";
import Image from "next/image";

const SPONSER_PARTNER = [
  {
    id: 1,
    image: NapitImage,
  },
  {
    id: 2,
    image: GasSafeRegister,
  },
  {
    id: 3,
    image: Nebosh,
  },
  {
    id: 4,
    image: TrustMark,
  },
  {
    id: 5,
    image: IFSM,
  },
  {
    id: 6,
    image: NICEIC,
  },
  {
    id: 7,
    image: CityGuilds,
  },
  {
    id: 8,
    image: ElmhurstEnergy,
  },
  {
    id: 9,
    image: EalRecognised,
  },
  {
    id: 10,
    image: PartP,
  },
];

export default function Partners() {
  return (
    <div className="max-w-6xl mx-auto my-24">
      <h1 className="text-4xl font-bold mb-16 text-center">
        Proudly <span className="text-blue-600">Certified</span> &{" "}
        <span className="text-blue-600">Accredited</span> <br /> by Leading
        Authorities
      </h1>
      <div className="flex justify-around">
        {SPONSER_PARTNER.map((partner) => (
          <Image
            width={80}
            key={partner.id}
            src={partner.image}
            alt="partnerImage"
          />
        ))}
      </div>
    </div>
  );
}
