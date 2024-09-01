import Image from "next/image";

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

import styles from "@/styles/Partners.module.css";

const SPONSER_PARTNER = [
  { id: 1, image: NapitImage },
  { id: 2, image: GasSafeRegister },
  { id: 3, image: Nebosh },
  { id: 4, image: TrustMark },
  { id: 5, image: IFSM },
  { id: 6, image: NICEIC },
  { id: 7, image: CityGuilds },
  { id: 8, image: ElmhurstEnergy },
  { id: 9, image: EalRecognised },
  { id: 10, image: PartP },
];

export default function Partners() {
  return (
    <div className="container max-w-6xl mx-auto mt-20 mb-20" id="partners">
      <div className="flex items-center justify-center mb-6 space-x-4 py-8">
        <hr className="flex-grow border-t border-gray-300" />
        <h1 className="text-center text-3xl font-bold">
          Proudly <span className="text-primary font-bold">Certified</span>{" "}
          &amp;
          <span className="text-primary font-bold"> Accredited</span>
          <br />
          by Leading Authorities
        </h1>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {SPONSER_PARTNER.map((item, index) => (
            <div className={styles.logo} key={index}>
              <Image
                width={
                  item.id === 4 ||
                  item.id === 6 ||
                  item.id === 7 ||
                  item.id === 8 ||
                  item.id === 9 ||
                  item.id === 10
                    ? 120
                    : item.id === 5
                    ? 140
                    : 80
                }
                src={item.image}
                alt={`Logo ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
