// app/actions/images.ts
'use server';

import eicr from '@/images/eicr.jpg';
import eicrImage from '@/images/eicr-image.jpg';
import electric from '@/images/electric.jpg';
import electricalMaintenance from '@/images/electrical-maintenance.jpg';
import electricalRepairs from '@/images/electrical-repairs.png';
import electrician1 from '@/images/electrician-1.jpg';
import electrician2 from '@/images/electrician-2.jpg';
import electrician3 from '@/images/electrician-3.jpg';
import electricianBulb from '@/images/electrician-bulb.jpg';
import electricianHouseOwner from '@/images/electrician-house-owner.jpeg';
import electricianMultimeter from '@/images/electrician-multimeter.jpeg';
import electricianThumbs from '@/images/electrician-thumbs.jpeg';
import eletric from '@/images/eletric.jpg';
import emergencyLightCertificate from '@/images/emergency-light-certificate.jpeg';
import emergencyLight from '@/images/emergency-light.png';
import energyPerformance from '@/images/energy-performance.png';
import engineerNote from '@/images/engineer-note.jpg';
import engineer from '@/images/engineer.webp';
import evChargerInstallation1 from '@/images/ev-charger-installation.jpg';
import evChargerInstallation2 from '@/images/ev-charger.jpg';
import fireAlarmCertificate from '@/images/fire-alarm-certificate.jpg';
import fireAlarmInstallation from '@/images/fire-alarm-installation.jpg';
import fireExtinguisherImage from '@/images/fire-extinguisher-image.png';
import fireRisk from '@/images/fire-risk.png';
import fuseBoxInstallation from '@/images/fuse-box-installation.jpg';
import gasCertificate from '@/images/gas-certificate.png';
import happyFamily from '@/images/happy-family.jpg';
// import healthSafety from '@/images/health-safety.jpg';
// import propertyManagement from '@/images/property-management.jpg';

export async function getImages() {
  return [
    {
      category: "Electrical Services",
      label: "Electrical Services",
      images: [
        { id: 1, url: eicr, title: 'EICR', height: 600, width: 400 },
        { id: 2, url: eicrImage, title: 'EICR Image', height: 300, width: 400 },
        { id: 3, url: electricalMaintenance, title: 'Electrical Maintenance', height: 500, width: 600 },
        { id: 4, url: electricalRepairs, title: 'Electrical Repairs', height: 300, width: 500 },
        { id: 5, url: electrician1, title: 'Electrician 1', height: 200, width: 400 },
        { id: 6, url: electrician2, title: 'Electrician 2', height: 500, width: 300 },
        { id: 7, url: electrician3, title: 'Electrician 3', height: 600, width: 400 },
        { id: 8, url: electricianBulb, title: 'Electrician Bulb', height: 500, width: 600 },
        { id: 9, url: electricianHouseOwner, title: 'Electrician with House Owner', height: 200, width: 400 },
        { id: 10, url: electricianMultimeter, title: 'Electrician with Multimeter', height: 400, width: 400 },
        { id: 11, url: electricianThumbs, title: 'Electrician Thumbs Up', height: 500, width: 600 },
        { id: 12, url: eletric, title: 'Electric', height: 600, width: 400 },
        { id: 18, url: evChargerInstallation1, title: 'EV Charger Installation 1', height: 500, width: 400 },
        { id: 19, url: evChargerInstallation2, title: 'EV Charger Installation 2', height: 500, width: 400 },
        { id: 24, url: fuseBoxInstallation, title: 'Fuse Box Installation', height: 500, width: 400 },
      ],
    },
    {
      category: "Gas Services",
      label: "Gas Services",
      images: [
        { id: 25, url: gasCertificate, title: 'Gas Certificate', height: 500, width: 400 },
      ],
    },
    {
      category: "Fire Services",
      label: "Fire Services",
      images: [
        { id: 20, url: fireAlarmCertificate, title: 'Fire Alarm Certificate', height: 500, width: 400 },
        { id: 21, url: fireAlarmInstallation, title: 'Fire Alarm Installation', height: 500, width: 400 },
        { id: 22, url: fireExtinguisherImage, title: 'Fire Extinguisher', height: 500, width: 400 },
        { id: 23, url: fireRisk, title: 'Fire Risk Assessment', height: 500, width: 400 },
      ],
    },
    {
      category: "Health & Safety Services",
      label: "Health & Safety Services",
      images: [
        { id: 10, url: fireRisk, title: 'Health and Safety', height: 500, width: 400 },
      ],
    },
    {
      category: "Property Management Services",
      label: "Property Management Services",
      images: [
        // { id: 11, url: propertyManagement, title: 'Property Management', height: 500, width: 400 },
        { id: 26, url: happyFamily, title: 'Happy Family', height: 500, width: 400 },
      ],
    },
    {
      category: "Additional Services",
      label: "Additional Services",
      images: [
        { id: 13, url: emergencyLightCertificate, title: 'Emergency Light Certificate', height: 400, width: 500 },
        { id: 14, url: emergencyLight, title: 'Emergency Light', height: 500, width: 400 },
        { id: 15, url: energyPerformance, title: 'Energy Performance', height: 500, width: 400 },
        { id: 16, url: engineerNote, title: 'Engineer Note', height: 500, width: 400 },
        { id: 17, url: engineer, title: 'Engineer', height: 500, width: 400 },
      ],
    },
  ];
}
