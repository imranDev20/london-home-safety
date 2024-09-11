import BookingIcon from "@/components/icons/booking-icon";
import EicrIcon from "@/components/icons/eicr";
import ElectricalRepairs from "@/components/icons/electrical-repairs";
import EngineerIcon from "@/components/icons/engineer";
import EpcIcon from "@/components/icons/epc";
import EvCrarger from "@/components/icons/ev-charger";
import FastResponseIcon from "@/components/icons/fast-response";
import FuseBoxIcon from "@/components/icons/fuse-box";
import LocationIcon from "@/components/icons/location";
import LowerPriceIcon from "@/components/icons/lower-price";
import PatIcon from "@/components/icons/pat";
import EicrImage from "@/images/electrician-multimeter.jpeg";
import backgroundImage from "@/images/about-bg.jpeg";

import { NavItem, NavLeafItem } from "@/types/misc";
import { CiInstagram } from "react-icons/ci";
import { FaClock } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiFacebookBoxFill } from "react-icons/ri";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        label: "Electrical Services",
        path: "/electrical-services",
        description:
          "Ensure your home's electrical systems are safe and efficient with our expert services.",

        children: [
          {
            label: "Electrical Installation Condition Report",
            path: "/electrical-installation-condition-report",
            abbr: "EICR",
            Icon: EicrIcon,
            image: EicrImage,
            description:
              "Ensure the safety and compliance of your electrical installations with our thorough EICR.",
            detailedDesc: {
              details:
                "Regular EICR inspections help identify and rectify any issues in your electrical installations. This service is crucial for ensuring the safety and compliance of your electrical systems with legal standards. Our comprehensive reports will detail any defects or necessary repairs for both homes and businesses.",
              points: [
                "Identifies potential electrical hazards",
                "Ensures compliance with safety regulations",
                "Provides a detailed report with recommendations",
              ],
            },

            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "bedroom",

                description:
                  "Ensure your home's electrical installations are safe and compliant.",
              },

              {
                type: "COMMERCIAL",
                unit: "circuit",

                description:
                  "Comprehensive electrical safety reports for commercial properties.",
              },
            ],

            pageContent: {
              title: "Ensuring Electrical Safety with Expert EICR Services",
              html: `
    <div class="max-w-4xl mx-auto ">
  <p class="text-lg mb-6">An Electrical Installation Condition Report (EICR) is a detailed assessment of the electrical installations in your property. It identifies any potential hazards, deficiencies, or non-compliance with current safety standards. Our certified experts at London Home Safety Limited conduct thorough EICR inspections to ensure your electrical systems are safe and up to code. Whether for residential or commercial properties, our professional EICR services provide peace of mind, knowing that your environment is secure and compliant. Trust us to deliver reliable and comprehensive EICR solutions tailored to your needs.</p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Why Do You Need an EICR?</h2>
    <p class="mb-4">An EICR is essential for ensuring the safety of your property's electrical systems. Over time, electrical installations can deteriorate due to wear and tear, environmental conditions, or previous poor workmanship. Regular EICR inspections help identify these issues before they become serious hazards.</p>
    <p class="font-bold mb-2">Benefits of EICR:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Safety:</span> Identifies potential electrical hazards and prevents accidents such as fires or electric shocks.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Compliance:</span> Ensures your property complies with current electrical safety standards.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Peace of Mind:</span> Provides assurance that your electrical installations are safe and reliable.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Insurance:</span> Many insurance policies require an up-to-date EICR to maintain coverage.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-blue-50 text-lg p-6 rounded-lg mb-8">
    <p>Did you know that outdated or faulty electrical installations can pose serious safety risks? Regular EICR inspections are essential to identify potential hazards and ensure compliance with safety standards.</p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">Why Is It Required?</h2>
  <p class="mb-4">EICR inspections are required to ensure compliance with safety regulations and standards, particularly in rented and commercial properties. Landlords are legally obligated to ensure their properties are electrically safe, and regular EICR checks are a key part of this responsibility.</p>
  <p class="font-bold mb-2">Legal Requirements:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Must have an EICR conducted at least every 5 years or at the change of tenancy.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Businesses:</span> Should conduct EICR inspections regularly to comply with health and safety regulations and insurance requirements.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> While not legally required, it is recommended to have an EICR conducted every 10 years for safety and peace of mind.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Will It Do?</h2>
  <p class="mb-4">An EICR assesses the safety and condition of your electrical installations. It identifies any faults or defects that could pose a risk to the occupants.</p>
  <p class="font-bold mb-2">EICR Outcomes:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Identification of Defects:</span> Lists any issues with the electrical installations, such as outdated wiring or faulty components.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Risk Assessment:</span> Evaluates the level of risk associated with each defect.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Recommendations:</span> Provides guidance on necessary repairs or upgrades to ensure safety and compliance.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Should Take It?</h2>
  <p class="mb-4">EICR inspections are recommended for various types of property owners and occupants:</p>
  <p class="font-bold mb-2">Who Needs an EICR:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> To ensure rental properties are safe and compliant with legal standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> For peace of mind and to address any potential electrical issues in their homes.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Business Owners:</span> To comply with health and safety regulations and protect employees and customers.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Buyers/Sellers:</span> To assess the condition of the electrical installations before completing a transaction.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens During an EICR?</h2>
  <p class="mb-4">During an EICR inspection, a qualified electrician will perform a thorough examination of your property's electrical systems.</p>
  <p class="font-bold mb-2">Inspection Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Visual Inspection:</span> Checks for visible signs of damage or wear.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Testing:</span> Conducts tests on the electrical installations to ensure they are functioning correctly and safely.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> Records the findings and provides a detailed report, including any defects and recommendations.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens Afterwards?</h2>
  <p class="mb-4">After the EICR inspection, you will receive a comprehensive report detailing the condition of your electrical installations and any required actions.</p>
  <p class="font-bold mb-2">Post-Inspection Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Review Report:</span> Go through the findings with the electrician to understand the condition of your electrical systems.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Address Defects:</span> Schedule necessary repairs or upgrades as recommended in the report.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Certification:</span> Once any required work is completed, you will receive a certificate confirming that your property meets the required safety standards.</span>
    </li>
  </ul>

  <p class="mb-4">By following these steps, you can ensure that your property's electrical systems are safe, compliant, and functioning properly. Regular EICR inspections are a proactive measure to protect your property and its occupants from electrical hazards.</p>
</div>
  `,
            },

            faqs: [
              {
                ques: "What is an Electrical Installation Condition Report (EICR)?",
                ans: "An EICR is a detailed assessment of the electrical installations in a property. It identifies any potential hazards, deficiencies, or non-compliance with current safety standards to ensure the safety and functionality of electrical systems.",
              },
              {
                ques: "Why do I need an EICR?",
                ans: "An EICR is essential for identifying and addressing potential electrical hazards, ensuring compliance with safety standards, providing peace of mind, and meeting legal and insurance requirements.",
              },
              {
                ques: "How often should an EICR be conducted?",
                ans: "For rented properties, an EICR should be conducted at least every 5 years or at the change of tenancy. For owner-occupied homes, it is recommended to have an EICR every 10 years.",
              },
              {
                ques: "What happens during an EICR inspection?",
                ans: "During an EICR inspection, a qualified electrician will perform a visual inspection, conduct tests on the electrical installations, and document the findings in a detailed report, including any defects and recommendations.",
              },
              {
                ques: "What should I do if my EICR identifies issues?",
                ans: "If your EICR identifies issues, you should schedule the necessary repairs or upgrades as recommended in the report. Once the work is completed, you will receive a certificate confirming that your property meets the required safety standards.",
              },
              {
                ques: "Is an EICR mandatory for landlords?",
                ans: "Yes, landlords are legally required to have an EICR conducted at least every 5 years or at the change of tenancy to ensure rental properties are safe and compliant with electrical safety standards.",
              },
              {
                ques: "How long does an EICR inspection take?",
                ans: "The duration of an EICR inspection can vary depending on the size and complexity of the property, but it typically takes a few hours to complete.",
              },
              {
                ques: "Can I perform an EICR myself?",
                ans: "No, an EICR must be conducted by a qualified and certified electrician who has the necessary skills and knowledge to perform the inspection safely and accurately.",
              },
            ],
          },

          {
            label: "Portable Appliance Testing",
            path: "/portable-appliance-testing",
            abbr: "PAT",
            Icon: PatIcon,
            image: backgroundImage,
            description:
              "Test the safety of your portable appliances to prevent electrical hazards with our PAT service.",
            detailedDesc: {
              details:
                "PAT testing is essential for ensuring that all portable electrical appliances are safe to use. Our qualified technicians will inspect and test each appliance, providing you with documentation that confirms compliance with safety standards. This service helps prevent electrical hazards in both residential and commercial properties.",
              points: [
                "Tests the safety of portable appliances",
                "Prevents electrical hazards",
                "Provides certification of compliance",
              ],
            },
            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "appliances",

                description:
                  "Ensure your home's portable appliances are safe and compliant.",
              },
              {
                type: "COMMERCIAL",
                unit: "item",

                description:
                  "Comprehensive PAT testing for commercial properties.",
              },
            ],

            pageContent: {
              title: "Ensuring Appliance Safety with Professional PAT Testing",
              html: `
                <div class="max-w-4xl mx-auto ">
  <p class="mb-6 text-lg">
    Portable Appliance Testing (PAT) is a vital process to ensure that electrical appliances in your property are safe to use. Our PAT service involves thorough inspections and tests conducted by qualified technicians, ensuring compliance with safety standards and preventing potential electrical hazards.
  </p>

  <h2 class="text-2xl font-bold mb-4">What Appliances Need PAT Testing?</h2>
  <p class="mb-4">PAT testing is necessary for various types of portable electrical appliances, including but not limited to:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span>Computers and peripherals</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span>Kitchen appliances (e.g., kettles, toasters)</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span>Office equipment (e.g., printers, copiers)</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span>Power tools</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span>Extension cords and chargers</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Should Get PAT Testing?</h2>
  <p class="mb-4">PAT testing is recommended for a wide range of property owners and users:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> To ensure rental properties are safe and comply with regulations.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> For peace of mind and to ensure the safety of appliances in the home.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Business Owners:</span> To comply with health and safety regulations and protect employees and customers.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Educational Institutions:</span> To ensure the safety of students and staff.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens During PAT Testing?</h2>
  <p class="mb-4">During PAT testing, a qualified technician will perform a thorough examination of your portable appliances.</p>
  <p class="mb-2 font-bold">Inspection Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Pre-Testing Inspection:</span> Initial visual inspection to check for any visible damage or wear.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Electrical Testing:</span> Conducts electrical tests to ensure appliances are functioning correctly and safely.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> Records the findings and provides a detailed report, including any defects and recommendations.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens After PAT Testing?</h2>
  <p class="mb-4">After the PAT testing, you will receive a comprehensive report detailing the condition of your appliances and any required actions.</p>
  <p class="mb-2 font-bold">Post-Testing Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Review Report:</span> Go through the findings with the technician to understand the condition of your appliances.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Address Faults:</span> Schedule necessary repairs or replacements as recommended in the report.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Certification:</span> Once any required work is completed, you will receive a certificate confirming that your appliances meet the required safety standards.</span>
    </li>
  </ul>

  <p class="text-lg">
    By following these steps, you can ensure that your property's electrical appliances are safe, compliant, and functioning properly. Regular PAT testing is a proactive measure to protect your property and its occupants from electrical hazards.
  </p>
</div>
              `,
            },
            faqs: [
              {
                ques: "What types of appliances need PAT testing?",
                ans: "Any portable electrical appliances that are plugged into the mains, such as computers, kitchen appliances, office equipment, power tools, and extension cords, need PAT testing to ensure they are safe to use.",
              },
              {
                ques: "How often should PAT testing be conducted?",
                ans: "The frequency of PAT testing depends on the type of appliance and its usage environment. Generally, it is recommended to test appliances annually, but high-risk environments may require more frequent testing.",
              },
              {
                ques: "What are the benefits of regular PAT testing?",
                ans: "Regular PAT testing helps prevent electrical hazards, ensures compliance with safety standards, provides documentation for insurance purposes, and gives peace of mind knowing that your appliances are safe to use.",
              },
              {
                ques: "Who is responsible for ensuring appliances are PAT tested?",
                ans: "Employers, landlords, and business owners are responsible for ensuring that all portable electrical appliances in their premises are PAT tested and safe to use.",
              },
              {
                ques: "What does the PAT testing process involve?",
                ans: "PAT testing includes a visual inspection of the appliance, an electrical test to check for safety, and documentation of the results. The appliance will receive a pass or fail label based on the findings.",
              },
              {
                ques: "What should I do if an appliance fails the PAT test?",
                ans: "If an appliance fails the PAT test, it should be removed from use immediately and either repaired by a qualified technician or replaced. A follow-up PAT test may be required after repairs.",
              },
              {
                ques: "Is PAT testing a legal requirement?",
                ans: "While PAT testing itself is not a legal requirement, ensuring electrical safety is. PAT testing is a widely accepted method for complying with electrical safety regulations in workplaces and rental properties.",
              },
              {
                ques: "Can new appliances skip PAT testing?",
                ans: "New appliances should be visually inspected before use but may not require immediate PAT testing. However, they should be included in the regular PAT testing schedule based on their usage environment.",
              },
            ],
          },

          {
            label: "Fuse Box Installation",
            path: "/fuse-box-installation",
            Icon: FuseBoxIcon,
            image: backgroundImage,
            description:
              "Upgrade or install a new fuse box to enhance your home's electrical safety and performance.",
            detailedDesc: {
              details:
                "Upgrading or installing a new fuse box (consumer unit) can significantly enhance the safety and reliability of your electrical system. Our skilled electricians will ensure your fuse box meets current regulations and is capable of handling your property's electrical load, whether it's a home or a business.",
              points: [
                "Enhances electrical safety",
                "Meets current regulations",
                "Capable of handling increased electrical load",
              ],
            },
            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "installation",

                description:
                  "Enhance your home's electrical safety with a new fuse box.",
              },
              {
                type: "COMMERCIAL",
                unit: "installation",

                description:
                  "Ensure your business is compliant and safe with a new fuse box.",
              },
            ],
            pageContent: {
              title:
                "Boost Electrical Safety with Professional Fuse Box Installation",
              html: `
               <div class="max-w-4xl mx-auto">
  <p class="mb-6 text-lg">
    A properly installed fuse box is critical for maintaining the safety and efficiency of your property's electrical system. At London Home Safety Limited, our experienced electricians provide expert fuse box installations and upgrades to meet the latest safety standards and handle the electrical demands of modern homes and businesses.
  </p>

  <h2 class="text-2xl font-bold mb-4">Why Upgrade Your Fuse Box?</h2>
  <p class="mb-4">Upgrading your fuse box can address several issues and improve the overall safety and performance of your electrical system:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Enhanced Safety:</span> Reduces the risk of electrical fires and other hazards.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Regulatory Compliance:</span> Ensures your electrical system meets current regulations.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Increased Capacity:</span> Supports the electrical load of modern appliances and devices.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Improved Reliability:</span> Minimizes the likelihood of electrical faults and power outages.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Needs a Fuse Box Upgrade?</h2>
  <p class="mb-4">Several scenarios may necessitate a fuse box upgrade:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Older Properties:</span> Homes and businesses with outdated fuse boxes may not meet current safety standards.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Home Renovations:</span> Upgrades are often needed when adding new rooms or major appliances.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Increased Electrical Demand:</span> Properties that have seen an increase in electrical usage.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Safety Concerns:</span> Addressing frequent electrical issues or concerns about safety.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens During Fuse Box Installation?</h2>
  <p class="mb-4">Our professional installation process ensures your new fuse box is safely and efficiently installed:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Assessment:</span> Initial assessment of your current electrical system and fuse box.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Installation:</span> Safe removal of the old fuse box and installation of the new one.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Testing:</span> Comprehensive testing to ensure the new fuse box is functioning correctly.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> Providing you with all necessary certifications and documentation.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What to Expect After Installation?</h2>
  <p class="mb-4">After the installation of your new fuse box, you can expect several benefits:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Improved Safety:</span> Reduced risk of electrical hazards and enhanced safety for occupants.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Increased Reliability:</span> More stable and reliable electrical system performance.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Peace of Mind:</span> Knowing that your property meets current safety standards and regulations.</span>
    </li>
  </ul>

  <p class="text-lg">
    By upgrading or installing a new fuse box, you are taking a proactive step towards ensuring the safety and efficiency of your property's electrical system. Contact London Home Safety Limited today to schedule your fuse box installation.
  </p>
</div>
              `,
            },
            faqs: [
              {
                ques: "Why should I upgrade my fuse box?",
                ans: "Upgrading your fuse box enhances the safety and reliability of your electrical system, ensures compliance with current regulations, and supports the increased electrical load of modern appliances.",
              },
              {
                ques: "How often should a fuse box be replaced?",
                ans: "Fuse boxes should typically be inspected every 10 years for homeowners and every 5 years for rental properties. Replacement may be necessary if the fuse box is outdated or showing signs of wear.",
              },
              {
                ques: "What are the signs that my fuse box needs replacing?",
                ans: "Common signs include frequent electrical issues, such as blown fuses, tripped breakers, or flickering lights, as well as visible signs of damage or wear on the fuse box.",
              },
              {
                ques: "How long does a fuse box installation take?",
                ans: "The installation of a new fuse box typically takes a few hours, depending on the complexity of the job and the condition of the existing electrical system.",
              },
              {
                ques: "Can I install a fuse box myself?",
                ans: "No, fuse box installation should be performed by a qualified electrician to ensure safety and compliance with regulations.",
              },
              {
                ques: "What should I do if I experience electrical issues after installation?",
                ans: "If you experience any issues after installation, contact our team immediately. We will address and resolve any problems to ensure your electrical system is functioning correctly.",
              },
            ],
          },

          {
            label: "Electrical Diagnostic & Repair Services",
            path: "/electrical-diagnostic-and-repair-services",
            Icon: ElectricalRepairs,
            image: backgroundImage,
            description:
              "Get reliable and efficient electrical repairs from our certified professionals.",
            detailedDesc: {
              details:
                "Our team is available to handle any electrical repairs, from minor fixes to major overhauls. Whether you're dealing with faulty wiring, broken outlets, or any other electrical issue, our certified electricians will provide efficient and reliable repair services to ensure your systems are functioning correctly and safely.",
              points: [
                "Efficient and reliable repairs",
                "Handles a wide range of electrical issues",
                "Ensures systems function safely",
              ],
            },
            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "repair",

                description:
                  "Comprehensive electrical repair services for your home.",
              },
              {
                type: "COMMERCIAL",
                unit: "repair",

                description:
                  "Professional electrical repair services for businesses.",
              },
            ],

            pageContent: {
              title: "Reliable and Efficient Electrical Repairs",
              html: `
                <div class="max-w-4xl mx-auto">
  <p class="mb-6 text-lg">
    At London Home Safety Limited, we understand the importance of having a reliable and safe electrical system. Our certified professionals offer comprehensive electrical repair services, ensuring that any issues you face are resolved efficiently and effectively.
  </p>

  <h2 class="text-2xl font-bold mb-4">Why Choose Our Electrical Repair Services?</h2>
  <p class="mb-4">We provide a wide range of repair services to address all your electrical needs, whether it's a simple fix or a complex problem:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Minor Repairs:</span> Fixes for common issues such as broken outlets, switches, and minor wiring problems.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Major Repairs:</span> Handling more complex issues including faulty wiring, circuit breaker problems, and system overhauls.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Emergency Call-Out:</span> Rapid response for urgent electrical issues that require immediate attention.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Can Benefit from Our Services?</h2>
  <p class="mb-4">Our electrical repair services are designed for a variety of clients:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> Ensuring your home's electrical system is safe and functional.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Maintaining electrical safety and compliance in rental properties.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Business Owners:</span> Keeping your business's electrical systems operational to avoid downtime.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Managers:</span> Managing electrical repairs and maintenance for multiple properties.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens During an Electrical Repair?</h2>
  <p class="mb-4">Our repair process is thorough and designed to address any issues effectively:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Initial Assessment:</span> Identifying the problem through a detailed inspection.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Repair Work:</span> Conducting the necessary repairs using high-quality materials and professional techniques.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Testing:</span> Ensuring that the repaired system is functioning safely and correctly.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> Providing a detailed report of the work carried out and any further recommendations.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What to Expect After the Repair?</h2>
  <p class="mb-4">After completing the repair, we ensure your electrical system is safe and reliable:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Improved Safety:</span> Addressing potential hazards to prevent future issues.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Enhanced Reliability:</span> Ensuring your electrical system operates smoothly and efficiently.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Ongoing Support:</span> Offering advice and support for maintaining your electrical system.</span>
    </li>
  </ul>

  <p class="text-lg">
    With our professional electrical repair services, you can have peace of mind knowing that your electrical systems are in safe hands. Contact London Home Safety Limited today to schedule a repair.
  </p>
</div>
              `,
            },
            faqs: [
              {
                ques: "What types of electrical repairs do you handle?",
                ans: "We handle a wide range of repairs, from minor issues like broken outlets and switches to major problems such as faulty wiring, circuit breaker issues, and complete system overhauls.",
              },
              {
                ques: "How quickly can you respond to an emergency electrical issue?",
                ans: "We offer an emergency call-out service for urgent electrical issues. Our team aims to respond as quickly as possible to ensure your safety and resolve the problem promptly.",
              },
              {
                ques: "Are your electricians certified?",
                ans: "Yes, all our electricians are fully certified and experienced professionals who adhere to the highest standards of safety and quality.",
              },
              {
                ques: "What should I do if I experience frequent electrical issues?",
                ans: "If you experience frequent electrical issues, it's important to have your system inspected by a professional. Our team can identify the root cause of the problems and provide effective solutions.",
              },
              {
                ques: "Can you help with electrical upgrades as part of the repair service?",
                ans: "Yes, we can recommend and perform electrical upgrades as needed to improve the safety and efficiency of your system during the repair process.",
              },
              {
                ques: "Do you provide repair services for both residential and commercial properties?",
                ans: "Yes, we offer comprehensive electrical repair services for both residential and commercial properties, tailored to meet the specific needs of each client.",
              },
              {
                ques: "What safety measures do you take during repairs?",
                ans: "Safety is our top priority. Our electricians follow strict safety protocols and use high-quality materials and tools to ensure all repairs are carried out safely and effectively.",
              },
            ],
          },

          {
            label: "EV Charger Installation",
            path: "/ev-charger-installation",
            Icon: EvCrarger,
            image: backgroundImage,
            description:
              "Install a convenient and efficient EV charger at your home for your electric vehicle.",
            detailedDesc: {
              details:
                "We provide professional installation of electric vehicle (EV) chargers, offering you the convenience of charging your EV at home or at your business premises. Our service includes assessing your electrical system, recommending the best charger, and ensuring a safe and efficient installation.",
              points: [
                "Professional installation of EV chargers",
                "Assessment of electrical system",
                "Safe and efficient installation",
              ],
            },
            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "installation",

                description:
                  "Install a home EV charger for convenient and efficient charging.",
              },
              {
                type: "COMMERCIAL",
                unit: "installation",

                description:
                  "Install EV chargers at your business premises for employees and customers.",
              },
            ],
            pageContent: {
              title: "Convenient and Efficient EV Charger Installation",
              html: `
                <div class="max-w-3xl mx-auto p-6">
  <p class="mb-6 text-lg">
    Electric vehicle (EV) chargers provide the convenience of charging your vehicle at home or at your business premises. At London Home Safety Limited, we offer professional EV charger installation services, ensuring safe and efficient setups tailored to your specific needs.
  </p>

  <h2 class="text-2xl font-bold mb-4">Why Install an EV Charger?</h2>
  <p class="mb-4">Installing an EV charger at your home or business offers numerous benefits:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Convenience:</span> Charge your EV at your own premises without relying on public charging stations.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Cost Savings:</span> Reduce the cost of charging compared to using public charging points.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Increased Property Value:</span> Enhance the value of your property by adding modern EV charging facilities.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Environmental Benefits:</span> Support sustainable practices by promoting the use of electric vehicles.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Our EV Charger Installation Process</h2>
  <p class="mb-4">Our professional installation process ensures a seamless and efficient setup:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Assessment:</span> Evaluate your electrical system and determine the best location for the charger.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Recommendation:</span> Suggest the most suitable EV charger based on your vehicle and usage needs.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Installation:</span> Safely install the charger, ensuring it meets all safety and regulatory standards.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Testing:</span> Conduct thorough testing to ensure the charger is functioning correctly and safely.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Can Benefit from EV Charger Installation?</h2>
  <p class="mb-4">Our EV charger installation services are ideal for a variety of clients:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> Install a charger for personal use, enhancing convenience and property value.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Provide EV charging options for tenants, making your property more attractive.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Business Owners:</span> Offer charging facilities for employees and customers, supporting sustainability initiatives.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Developers:</span> Include EV chargers in new developments to meet growing demand.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What to Expect After Installation?</h2>
  <p class="mb-4">Once the installation is complete, you can enjoy the following benefits:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Seamless Charging:</span> Easily charge your EV at home or work.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Reduced Costs:</span> Save money on charging compared to public stations.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Enhanced Convenience:</span> Charge your vehicle at your convenience, without the need to visit public chargers.</span>
    </li>
    <li class="flex items-center">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Ongoing Support:</span> Receive support and maintenance services to ensure your charger remains in optimal condition.</span>
    </li>
  </ul>

  <p class="text-lg">
    By installing an EV charger, you take a significant step towards sustainable living and support the growing infrastructure for electric vehicles. Contact London Home Safety Limited today to schedule your EV charger installation.
  </p>
</div>

              `,
            },
            faqs: [
              {
                ques: "What types of EV chargers do you install?",
                ans: "We install a variety of EV chargers, including standard and fast chargers, suitable for both residential and commercial properties.",
              },
              {
                ques: "How long does it take to install an EV charger?",
                ans: "The installation typically takes a few hours, depending on the complexity of the setup and the condition of your electrical system.",
              },
              {
                ques: "Do I need any special permits for EV charger installation?",
                ans: "Permits may be required depending on local regulations. Our team will handle all necessary permits and ensure the installation meets all regulatory standards.",
              },
              {
                ques: "Can I install an EV charger myself?",
                ans: "No, EV charger installation should be performed by a qualified electrician to ensure safety and compliance with regulations.",
              },
              {
                ques: "What maintenance is required for an EV charger?",
                ans: "EV chargers require minimal maintenance. We recommend periodic inspections to ensure everything is functioning correctly and safely.",
              },
              {
                ques: "What should I do if my EV charger is not working?",
                ans: "If you encounter any issues with your EV charger, contact our support team immediately. We will diagnose and resolve the problem promptly.",
              },
              {
                ques: "How much does it cost to install an EV charger?",
                ans: "The cost of installation varies based on the type of charger and the specifics of the installation site. We offer competitive pricing for both standard and fast chargers.",
              },
            ],
          },
        ],
      },
      {
        label: "Gas Services",
        path: "/gas-services",
        description:
          "Keep your home warm and secure with our reliable gas safety solutions.",

        children: [
          {
            label: "Gas Certificate & Repairs",
            path: "/gas-certificate-repair",

            image: backgroundImage,
            description:
              "Ensure the safety of your gas appliances with our certification and repair services.",

            detailedDesc: {
              details:
                "Our gas certificate and repair services ensure that your gas appliances are safe and compliant with current regulations. Whether you need a safety certificate for your property or repairs to fix any gas-related issues, our certified professionals are here to help.",
              points: [
                "Certified gas safety inspections",
                "Comprehensive gas appliance repairs",
                "Ensures compliance with safety regulations",
              ],
            },

            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "service",

                description:
                  "Comprehensive gas safety checks and repairs for your home.",
              },
              {
                type: "COMMERCIAL",
                unit: "service",

                description:
                  "Professional gas safety services and repairs for businesses.",
              },
            ],
            pageContent: {
              title:
                "Securing Gas Safety with Professional Gas Certificate & Repair",
              html: `
                <div class="max-w-4xl mx-auto"> <p class="text-lg mb-6">A Gas Safety Certificate is a crucial document that ensures the safety and compliance of gas appliances within your property. At London Home Safety Limited, we provide comprehensive Gas Certificate & Repairs services, ensuring that your gas installations are safe, efficient, and meet all legal requirements. Our certified engineers are experienced in conducting thorough inspections and repairs, offering peace of mind for both residential and commercial property owners.</p> <div class="mb-8"> <h2 class="text-2xl font-bold mb-4">Why Do You Need a Gas Safety Certificate?</h2> <p class="mb-4">A Gas Safety Certificate, also known as a CP12, is essential for demonstrating that your gas appliances are safe to use. Regular inspections help prevent dangerous situations such as gas leaks or carbon monoxide poisoning.</p> <p class="font-bold mb-2">Benefits of a Gas Safety Certificate:</p> <ul class="space-y-2"> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Safety:</span> Confirms that gas appliances are functioning correctly and safely, reducing the risk of accidents.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Compliance:</span> Ensures your property meets legal requirements, particularly for landlords and businesses.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Peace of Mind:</span> Provides assurance that your gas installations are secure and reliable.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Insurance:</span> Many insurance policies require an up-to-date Gas Safety Certificate for coverage to remain valid.</span> </li> </ul> </div> <blockquote class="bg-blue-50 text-lg p-6 rounded-lg mb-8"> <p>Did you know that failing to obtain a Gas Safety Certificate can result in legal penalties and endanger the safety of your property’s occupants? Regular gas inspections are vital to ensure safety and compliance with the law.</p> </blockquote> <h2 class="text-2xl font-bold mb-4">Who Needs a Gas Safety Certificate?</h2> <p class="mb-4">Gas Safety Certificates are required by law for rented properties, but they are also highly recommended for homeowners and businesses.</p> <p class="font-bold mb-2">Legal Requirements:</p> <ul class="space-y-2 mb-6"> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Landlords:</span> Must have a Gas Safety Certificate for every rental property, renewed annually.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Businesses:</span> Required to ensure that gas appliances are safe and inspected regularly to comply with health and safety regulations.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Homeowners:</span> Though not legally required, it’s advisable to have gas installations inspected regularly for safety.</span> </li> </ul> <h2 class="text-2xl font-bold mb-4">What Does the Inspection Include?</h2> <p class="mb-4">During a gas safety inspection, our qualified engineers will check all gas appliances, fittings, and flues to ensure they are safe and efficient.</p> <p class="font-bold mb-2">Inspection Process:</p> <ul class="space-y-2 mb-6"> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Visual Inspection:</span> Examines the condition of gas appliances and pipes for any visible signs of wear or damage.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Functionality Testing:</span> Tests the operation of each gas appliance to ensure they are working correctly and safely.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Flue Gas Analysis:</span> Checks the emissions from gas appliances to ensure they are within safe limits.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Documentation:</span> Provides a detailed report, including any defects or areas requiring attention.</span> </li> </ul> <h2 class="text-2xl font-bold mb-4">What Happens After the Inspection?</h2> <p class="mb-4">Following the inspection, you will receive a Gas Safety Certificate if your installations are compliant. If repairs are needed, we offer expert services to rectify any issues.</p> <p class="font-bold mb-2">Post-Inspection Steps:</p> <ul class="space-y-2 mb-6"> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Review Report:</span> Discuss the findings with our engineer to understand the condition of your gas systems.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Address Repairs:</span> Schedule necessary repairs to ensure all gas installations meet safety standards.</span> </li> <li class="flex items-start"> <span class="text-black font-bold mr-2">•</span> <span><span class="font-semibold">Certification:</span> Upon successful repairs, you will receive a Gas Safety Certificate, ensuring compliance and safety.</span> </li> </ul> <p class="mb-4">Ensuring that your gas installations are safe and compliant is a vital responsibility. Our Gas Certificate & Repairs service provides comprehensive inspections and reliable repairs, helping you maintain a safe and secure environment for all occupants.</p> </div>

              `,
            },
            faqs: [
              {
                ques: "What is a Gas Safety Certificate?",
                ans: "A Gas Safety Certificate is an official document issued by a qualified Gas Safe registered engineer after inspecting and confirming that all gas appliances, fittings, and installations in a property meet legal safety standards.",
              },
              {
                ques: "Why do I need a Gas Safety Certificate?",
                ans: "A Gas Safety Certificate is essential for ensuring the safety of gas appliances and installations in your property. It is legally required for landlords to protect tenants from potential gas-related hazards such as leaks or carbon monoxide poisoning.",
              },
              {
                ques: "How often should a Gas Safety Certificate be renewed?",
                ans: "A Gas Safety Certificate must be renewed annually. For landlords, it is a legal requirement to provide a valid certificate to tenants every year to confirm that the property’s gas appliances are safe to use.",
              },
              {
                ques: "What does a Gas Safety inspection involve?",
                ans: "During a Gas Safety inspection, a qualified engineer will check the condition of gas appliances, ensure they are properly installed, and verify that they are operating safely and efficiently. The engineer will also inspect the ventilation, flues, and gas pressure.",
              },
              {
                ques: "What should I do if my Gas Safety Certificate inspection identifies issues?",
                ans: "If the inspection identifies any issues, it’s crucial to have the recommended repairs or maintenance carried out as soon as possible by a qualified engineer. Once the issues are resolved, a new Gas Safety Certificate can be issued.",
              },
              {
                ques: "Is a Gas Safety Certificate mandatory for landlords?",
                ans: "Yes, it is a legal requirement for landlords to obtain a Gas Safety Certificate for each rental property annually. Landlords must ensure that all gas appliances, flues, and related systems are safe and compliant with regulations.",
              },
              {
                ques: "How long does a Gas Safety inspection take?",
                ans: "The duration of a Gas Safety inspection can vary depending on the number and type of gas appliances in the property, but it typically takes between 30 minutes to an hour.",
              },
            ],
          },
          {
            label: "Boiler Service & Repair",
            path: "/boiler-service-repair",

            image: backgroundImage,
            description:
              "Maintain and repair your boiler to ensure efficient and safe operation.",

            detailedDesc: {
              details:
                "Our boiler service and repair solutions ensure your heating system operates safely and efficiently. We provide expert maintenance to prevent issues and extend your boiler’s lifespan. In case of a breakdown, our skilled engineers deliver quick and reliable repairs. Stay compliant with UK safety standards and enjoy uninterrupted warmth with our trusted services.",
              points: [
                "Expert boiler servicing and maintenance",
                "Prompt and effective repairs for all boiler types",
                "Guarantees safe and efficient boiler operation",
              ],
            },

            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "boiler",
                description: "",

                packages: [],
              },
            ],
            pageContent: {
              title:
                "Maintaining Efficiency and Safety with Expert Boiler Service & Repair",
              html: `
<div class="max-w-4xl mx-auto">
  <p class="text-lg mb-6">
    A well-maintained boiler is crucial for ensuring the safety, efficiency, and longevity of your heating system. At London Home Safety Limited, we offer comprehensive Boiler Service & Repair solutions, ensuring that your boiler operates at peak performance, reducing the risk of breakdowns and extending its lifespan. Our certified engineers are equipped with the expertise to handle all types of boiler issues, providing peace of mind for both residential and commercial property owners.
  </p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Why Do You Need Boiler Service & Repair?</h2>
    <p class="mb-4">
      Regular boiler servicing and prompt repairs are essential for maintaining the efficiency and safety of your heating system. A well-serviced boiler operates more efficiently, helps prevent unexpected breakdowns, and ensures that your home or business remains warm and safe throughout the year.
    </p>
    <p class="font-bold mb-2">Benefits of Boiler Service & Repair:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Efficiency:</span> Regular servicing keeps your boiler running efficiently, reducing energy consumption and lowering utility bills.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Safety:</span> Ensures that your boiler is operating safely, reducing the risk of dangerous malfunctions such as gas leaks or carbon monoxide emissions.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Longevity:</span> Regular maintenance extends the lifespan of your boiler, helping you avoid costly replacements.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Compliance:</span> Ensures your boiler meets safety standards, especially important for landlords and businesses.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-blue-50 text-lg p-6 rounded-lg mb-8">
    <p>
      Did you know that neglecting boiler maintenance can lead to unexpected breakdowns and costly repairs? Regular servicing is key to ensuring your boiler remains safe, efficient, and reliable.
    </p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">Who Needs Boiler Service & Repair?</h2>
  <p class="mb-4">
    Boiler service and repair are essential for all property owners, but they are particularly crucial for landlords, businesses, and homeowners with older heating systems.
  </p>
  <p class="font-bold mb-2">Who Should Consider Boiler Service & Repair:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Legally required to ensure boilers in rental properties are regularly serviced and safe for tenants.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Businesses:</span> Required to maintain boilers to comply with health and safety regulations, ensuring a safe environment for employees and customers.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> Regular servicing is recommended to ensure the efficiency and safety of the home heating system.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Does Boiler Service & Repair Include?</h2>
  <p class="mb-4">
    During a boiler service, our qualified engineers will perform a thorough inspection and cleaning of your boiler, ensuring it operates efficiently and safely. If any issues are detected, we offer prompt and reliable repair services.
  </p>
  <p class="font-bold mb-2">Service & Repair Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Visual Inspection:</span> A detailed check of the boiler’s components for signs of wear, corrosion, or damage.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Efficiency Testing:</span> Assessment of the boiler’s performance to ensure it is operating efficiently and safely.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Cleaning & Maintenance:</span> Cleaning of key components such as burners and heat exchangers to improve performance.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Repairs:</span> Prompt repairs to address any issues identified during the service, ensuring the boiler is safe and reliable.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens After the Service?</h2>
  <p class="mb-4">
    After the service, you will receive a detailed report on the condition of your boiler. If repairs were necessary, our engineers will explain the work that was carried out and provide advice on maintaining your boiler for optimal performance.
  </p>
  <p class="font-bold mb-2">Post-Service Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Review Report:</span> Discuss the findings with our engineer and understand the current state of your boiler.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Schedule Future Maintenance:</span> Plan regular servicing to keep your boiler in top condition and avoid unexpected breakdowns.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Follow-up Support:</span> Our team is available for any follow-up questions or additional support you may need after the service.</span>
    </li>
  </ul>

  <p class="mb-4">
    Keeping your boiler in optimal condition is essential for a warm and safe property. Our Boiler Service & Repair solutions offer thorough inspections, efficient repairs, and expert advice, helping you maintain a reliable heating system.
  </p>
</div>

              `,
            },
            faqs: [
              {
                ques: "What is a Boiler Service & Repair?",
                ans: "Boiler Service & Repair involves a thorough inspection, maintenance, and repair of your boiler system to ensure it operates efficiently and safely. This includes checking for any potential issues, performing necessary repairs, and replacing worn-out parts to keep the boiler functioning optimally.",
              },
              {
                ques: "Why is regular boiler servicing important?",
                ans: "Regular boiler servicing is crucial for maintaining the efficiency and safety of your heating system. It helps prevent breakdowns, extends the lifespan of your boiler, ensures compliance with safety regulations, and improves energy efficiency, reducing your overall heating costs.",
              },
              {
                ques: "How often should a boiler be serviced?",
                ans: "A boiler should be serviced annually to ensure it remains in good working condition. Regular servicing helps identify and address potential issues before they become major problems, ensuring reliable performance throughout the year.",
              },
              {
                ques: "What does a boiler service include?",
                ans: "A boiler service typically includes a thorough inspection of the boiler and its components, cleaning of key parts, checking for leaks, testing the pressure and functionality, and ensuring compliance with safety standards. The service may also include a detailed report on the boiler's condition and any recommended repairs.",
              },
              {
                ques: "What should I do if my boiler needs repair?",
                ans: "If your boiler needs repair, contact a qualified technician as soon as possible to diagnose and fix the issue. Delaying repairs can lead to more significant problems and potentially increase repair costs. Ensure that repairs are conducted by a certified professional to maintain safety and efficiency.",
              },
              {
                ques: "How long does a boiler service take?",
                ans: "A typical boiler service takes between 30 minutes to 1 hour, depending on the type and condition of the boiler. More complex systems or issues may require additional time.",
              },
              {
                ques: "Can I perform boiler repairs myself?",
                ans: "No, boiler repairs should only be performed by a qualified and certified technician. Attempting DIY repairs can be dangerous and may result in further damage or safety hazards. Always seek professional help for boiler repairs.",
              },
            ],
          },
        ],
      },
      {
        label: "Fire Services",
        path: "/fire-services",
        description:
          "Protect your property and loved ones with our advanced fire safety measures.",

        children: [
          {
            label: "Fire Risk Assessment",
            path: "/fire-risk-assessment",

            image: backgroundImage,
            description:
              "Identify and mitigate fire hazards in your home with our comprehensive fire risk assessments.",
            detailedDesc: {
              details:
                "Our Fire Risk Assessment service ensures your property is fully compliant with UK fire safety regulations. We conduct thorough inspections to identify potential hazards and provide actionable recommendations to enhance safety. With our expert assessment, you can protect your property and occupants from fire risks, ensuring peace of mind.",

              points: [
                "Comprehensive fire safety inspections",
                "Identification of potential fire hazards",
                "Ensures compliance with UK fire safety regulations",
              ],
            },
            pageContent: {
              title:
                "Mitigating Risks with Comprehensive Fire Risk Assessments",
              html: `
  <div class="max-w-4xl mx-auto">
  <p class="text-lg mb-6">
    Ensuring the safety of your property and its occupants is paramount. At London Home Safety Limited, we provide comprehensive Fire Risk Assessment services designed to identify potential fire hazards, evaluate risks, and implement preventive measures. Our certified professionals are equipped with the knowledge and experience to assess both residential and commercial properties, helping you to comply with legal obligations and maintain a safe environment.
  </p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">What is a Fire Risk Assessment?</h2>
    <p class="mb-4">
      A Fire Risk Assessment is a systematic evaluation of your property to identify fire hazards, assess the risk to people, and recommend measures to minimize or eliminate those risks. This process is crucial for ensuring the safety of your property and compliance with fire safety regulations.
    </p>
    <p class="font-bold mb-2">Key Elements of a Fire Risk Assessment:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Hazard Identification:</span> Pinpointing sources of ignition, fuel, and oxygen that could contribute to a fire.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Risk Evaluation:</span> Assessing the likelihood of a fire occurring and its potential impact on occupants and property.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Preventive Measures:</span> Recommending actions to reduce or eliminate identified risks, such as improving fire detection systems or implementing safety protocols.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Emergency Planning:</span> Developing or reviewing fire evacuation plans and ensuring clear communication channels during emergencies.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-red-50 text-lg p-6 rounded-lg mb-8">
    <p>
      Remember, a thorough Fire Risk Assessment is not just a legal requirement; it’s a critical step in protecting lives and property. Don’t wait until it’s too late—ensure your property is fire-safe today.
    </p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">Why is a Fire Risk Assessment Essential?</h2>
  <p class="mb-4">
    Conducting a Fire Risk Assessment is a legal obligation for most businesses and landlords. Beyond legal compliance, it plays a vital role in protecting lives and property by identifying and mitigating fire hazards before they escalate into emergencies.
  </p>
  <p class="font-bold mb-2">Reasons to Conduct a Fire Risk Assessment:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Legal Compliance:</span> Fulfills your legal duty under fire safety regulations, reducing the risk of penalties and legal action.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Life Safety:</span> Helps protect occupants by identifying risks and implementing necessary safety measures.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Protection:</span> Minimizes potential damage to property by preventing fire incidents through proactive risk management.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Peace of Mind:</span> Knowing that your property is safe and compliant provides reassurance to you, your employees, and your tenants.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Needs a Fire Risk Assessment?</h2>
  <p class="mb-4">
    Fire Risk Assessments are essential for a wide range of properties, including residential, commercial, and industrial buildings. Landlords, business owners, and property managers are particularly responsible for ensuring these assessments are conducted regularly.
  </p>
  <p class="font-bold mb-2">Who Should Get a Fire Risk Assessment:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Legally required to ensure rental properties meet fire safety standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Businesses:</span> Obligated to protect employees and customers by maintaining a fire-safe environment.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Managers:</span> Responsible for ensuring multi-occupancy buildings comply with fire safety regulations.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> While not always legally required, a Fire Risk Assessment can provide peace of mind and improve home safety.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Does a Fire Risk Assessment Include?</h2>
  <p class="mb-4">
    Our Fire Risk Assessment service covers a comprehensive evaluation of your property, from identifying fire hazards to recommending and implementing preventive measures. Our goal is to ensure your property is fully compliant with safety regulations and that you have a robust fire safety plan in place.
  </p>
  <p class="font-bold mb-2">Fire Risk Assessment Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Site Inspection:</span> A thorough examination of your property to identify potential fire hazards and assess existing fire safety measures.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Risk Analysis:</span> Evaluation of the likelihood of a fire occurring and the potential impact on property and occupants.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Recommendations:</span> Detailed advice on how to reduce or eliminate identified risks, including upgrades to fire safety systems or changes to safety protocols.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Fire Safety Plan:</span> Development or review of an existing fire safety plan, ensuring clear evacuation routes and procedures.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens After the Assessment?</h2>
  <p class="mb-4">
    After the assessment, you will receive a comprehensive report detailing the findings, along with actionable recommendations to improve fire safety. Our team will work with you to implement these measures, ensuring your property is fully compliant and as safe as possible.
  </p>
  <p class="font-bold mb-2">Post-Assessment Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Review Report:</span> Our experts will walk you through the assessment report, explaining each finding and recommendation in detail.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Implement Recommendations:</span> We will assist you in carrying out the recommended safety improvements, ensuring they are completed to the highest standard.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Ongoing Support:</span> Our team remains available for follow-up assessments, support, and any additional guidance you may need.</span>
    </li>
 

  
                `,
            },
            faqs: [
              {
                ques: "What is a Fire Risk Assessment?",
                ans: "A Fire Risk Assessment is a systematic evaluation of a property to identify potential fire hazards, assess the risks associated with those hazards, and determine appropriate measures to minimize or eliminate the risk. This assessment helps ensure that a property is compliant with fire safety regulations and that adequate precautions are in place.",
              },
              {
                ques: "Why is a Fire Risk Assessment necessary?",
                ans: "A Fire Risk Assessment is necessary to protect lives and property by identifying fire hazards and assessing the risk of fire. It helps ensure that appropriate fire safety measures are in place, meeting legal requirements, and reducing the likelihood of fire-related incidents.",
              },
              {
                ques: "How often should a Fire Risk Assessment be conducted?",
                ans: "Fire Risk Assessments should be conducted annually or whenever there are significant changes to the property or its use. Regular assessments help maintain up-to-date fire safety measures and ensure ongoing compliance with regulations.",
              },
              {
                ques: "What does a Fire Risk Assessment include?",
                ans: "A Fire Risk Assessment includes identifying potential fire hazards, assessing the risk of those hazards, evaluating existing fire safety measures, and recommending improvements. The assessment results in a detailed report outlining the findings and necessary actions to enhance fire safety.",
              },
              {
                ques: "What should I do if my Fire Risk Assessment identifies issues?",
                ans: "If your Fire Risk Assessment identifies issues, address them promptly by implementing the recommended changes or improvements. This may include installing additional fire safety equipment, enhancing fire evacuation plans, or conducting staff training.",
              },
              {
                ques: "Is a Fire Risk Assessment required by law?",
                ans: "Yes, a Fire Risk Assessment is required by law for all non-domestic properties. It ensures that the property complies with fire safety regulations and that adequate measures are in place to protect occupants and property from fire hazards.",
              },
              {
                ques: "How long does a Fire Risk Assessment take?",
                ans: "The duration of a Fire Risk Assessment varies depending on the size and complexity of the property. It typically takes a few hours to a full day to complete, including the evaluation and preparation of the detailed report.",
              },
            ],
          },
          {
            label: "Fire Alarm Certificate",
            path: "/fire-alarm-certificate",

            image: backgroundImage,
            description:
              "Certify your fire alarm system to ensure it meets all safety regulations.",
            detailedDesc: {
              details:
                "Our Fire Alarm Certificate service guarantees that your fire alarm system meets all necessary UK safety standards. We provide thorough testing and certification to ensure your alarm system is fully operational and compliant. With our expert service, you can be confident that your fire alarms will perform effectively in an emergency, protecting lives and property.",

              points: [
                "Detailed testing of fire alarm systems",
                "Official certification of compliance",
                "Ensures reliable and effective fire alarm performance",
              ],
            },
            pageContent: {
              title:
                "Ensuring Safety Compliance with Professional Fire Alarm Certification",
              html: `
    <div class="max-w-4xl mx-auto">
  <p class="text-lg mb-6">
    At London Home Safety Limited, we understand the importance of a reliable fire alarm system in protecting lives and property. Our Fire Alarm Certificate service ensures that your fire alarm systems are compliant with the latest regulations and are fully operational, providing you with the assurance that your property is safeguarded against fire risks.
  </p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">What is a Fire Alarm Certificate?</h2>
    <p class="mb-4">
      A Fire Alarm Certificate is an official document that confirms your fire alarm system has been installed, tested, and maintained in accordance with the relevant fire safety standards. It serves as proof that your property is equipped with a functional and compliant fire alarm system, which is a critical component of your overall fire safety strategy.
    </p>
    <p class="font-bold mb-2">Key Components of a Fire Alarm Certificate:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">System Installation Verification:</span> Confirmation that the fire alarm system has been correctly installed following the necessary codes and regulations.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Testing and Commissioning:</span> Detailed testing to ensure that all components of the fire alarm system are functioning as intended.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Maintenance Records:</span> Documentation of regular maintenance checks, which are essential for the ongoing reliability of the system.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Compliance Confirmation:</span> Assurance that the fire alarm system meets all relevant fire safety regulations and standards.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-red-50 text-lg p-6 rounded-lg mb-8">
    <p>
      A Fire Alarm Certificate is more than just a piece of paper—it's your peace of mind. Ensure your property is protected with a certified fire alarm system that you can rely on in an emergency.
    </p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">Why is a Fire Alarm Certificate Important?</h2>
  <p class="mb-4">
    A Fire Alarm Certificate is not only a legal requirement for many properties but also a crucial aspect of your fire safety strategy. It provides evidence that your fire alarm system is in working order and capable of alerting occupants in the event of a fire, thereby helping to prevent loss of life and property damage.
  </p>
  <p class="font-bold mb-2">Reasons to Obtain a Fire Alarm Certificate:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Legal Compliance:</span> Fulfills your legal obligation under fire safety regulations, reducing the risk of penalties and legal issues.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Life Safety:</span> Ensures your fire alarm system is capable of providing early warning in case of a fire, helping to save lives.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Insurance Requirements:</span> Many insurance policies require a valid Fire Alarm Certificate as part of their terms and conditions.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Peace of Mind:</span> Knowing your fire alarm system is certified and fully functional offers reassurance to you, your employees, and your tenants.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Who Needs a Fire Alarm Certificate?</h2>
  <p class="mb-4">
    Fire Alarm Certificates are essential for a variety of properties, particularly those that are required by law to have a working fire alarm system. This includes commercial buildings, residential complexes, and any property where people live or work.
  </p>
  <p class="font-bold mb-2">Who Should Obtain a Fire Alarm Certificate:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Landlords:</span> Required to ensure that rental properties are equipped with functional and certified fire alarm systems.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Business Owners:</span> Must ensure their premises comply with fire safety regulations, including having a certified fire alarm system.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Property Managers:</span> Responsible for maintaining fire alarm systems in multi-occupancy buildings and ensuring they are certified.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Homeowners:</span> While not always legally required, obtaining a Fire Alarm Certificate can enhance the safety of your home.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Does a Fire Alarm Certification Process Involve?</h2>
  <p class="mb-4">
    Our Fire Alarm Certification process involves a thorough examination of your fire alarm system to ensure it meets all regulatory requirements. This process includes system installation verification, comprehensive testing, and the issuance of a Fire Alarm Certificate that confirms your system's compliance.
  </p>
  <p class="font-bold mb-2">Fire Alarm Certification Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">System Inspection:</span> Our experts will inspect the fire alarm system to verify that it has been installed correctly and in accordance with the relevant standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Functional Testing:</span> Comprehensive testing of the system's components to ensure they are working properly and can effectively alert occupants in case of a fire.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Certification:</span> After successful testing, a Fire Alarm Certificate is issued, confirming that the system complies with all necessary regulations and standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Maintenance Scheduling:</span> We will set up a maintenance schedule to ensure that your fire alarm system remains fully operational and compliant.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens After Certification?</h2>
  <p class="mb-4">
    Once your fire alarm system has been certified, it’s important to maintain its functionality through regular inspections and testing. We provide ongoing support to help you keep your system in top condition, ensuring continuous compliance and safety.
  </p>
  <p class="font-bold mb-2">Post-Certification Steps:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Regular Maintenance:</span> Scheduled checks and testing to keep your fire alarm system fully operational and compliant with regulations.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> Keeping detailed records of all maintenance activities and updates to ensure ongoing compliance.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
       <span><span class="font-semibold">Support and Assistance:</span> Our team is always available to provide advice, support, and any necessary updates to your fire alarm system.</span>
    </li>
  </ul>
</div>
               `,
            },
            faqs: [
              {
                ques: "What is a Fire Alarm Certificate?",
                ans: "A Fire Alarm Certificate is an official document issued after a fire alarm system has been inspected, tested, and confirmed to meet legal safety standards. It verifies that the system is functioning correctly and complies with fire safety regulations.",
              },
              {
                ques: "Why do I need a Fire Alarm Certificate?",
                ans: "A Fire Alarm Certificate is essential for ensuring that your fire alarm system is operational and compliant with safety standards. It provides proof that the system has been properly installed and maintained, offering protection for occupants and meeting legal requirements.",
              },
              {
                ques: "How often should a Fire Alarm Certificate be renewed?",
                ans: "A Fire Alarm Certificate should be renewed annually or after significant modifications to the fire alarm system. Regular inspections and certifications ensure ongoing compliance with safety standards and reliable performance of the fire alarm system.",
              },
              {
                ques: "What does the Fire Alarm certification process involve?",
                ans: "The Fire Alarm certification process involves a comprehensive inspection and testing of the fire alarm system by a qualified technician. This includes checking the functionality of alarms, detectors, control panels, and ensuring compliance with relevant safety regulations.",
              },
              {
                ques: "What should I do if my Fire Alarm Certificate identifies issues?",
                ans: "If issues are identified during the certification process, address them promptly by arranging for necessary repairs or upgrades. Once the issues are resolved, a new Fire Alarm Certificate can be issued to confirm that the system meets all safety standards.",
              },
              {
                ques: "Is a Fire Alarm Certificate mandatory for all buildings?",
                ans: "Yes, a Fire Alarm Certificate is mandatory for all buildings, particularly those used for commercial purposes or multi-occupancy residential buildings. It ensures that fire alarm systems are installed and maintained according to safety regulations.",
              },
              {
                ques: "How long does it take to get a Fire Alarm Certificate?",
                ans: "The time to obtain a Fire Alarm Certificate depends on the complexity of the fire alarm system and any issues that may need to be addressed. The inspection and certification process typically take a few hours, with additional time required for issuing the certificate after successful completion.",
              },
            ],
          },
          {
            label: "Fire Alarm Installation",
            path: "/fire-alarm-installation",

            image: backgroundImage,
            description:
              "Install a reliable fire alarm system to protect your home and loved ones.",
            detailedDesc: {
              details:
                "Our Fire Alarm Installation service provides you with the latest fire detection technology, expertly installed to ensure maximum protection. We tailor each installation to meet the specific needs of your property, ensuring comprehensive coverage and compliance with UK regulations. Trust our experienced team to install a reliable fire alarm system that safeguards your premises and occupants.",

              points: [
                "Custom-designed fire alarm systems",
                "Expert installation for optimal coverage",
                "Compliance with UK fire safety standards",
              ],
            },
            pageContent: {
              title:
                "Protecting Lives with Reliable Fire Alarm Installation Services",
              html: `
                 <div class="max-w-4xl mx-auto">
  <p class="text-lg mb-6">
    At London Home Safety Limited, we specialize in providing top-notch Fire Alarm Installation services to ensure your property is equipped with the best fire safety solutions. Our expert team is committed to designing, installing, and maintaining fire alarm systems that comply with the highest safety standards, offering you peace of mind and protection for your property and its occupants.
  </p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Why is Professional Fire Alarm Installation Essential?</h2>
    <p class="mb-4">
      Professional fire alarm installation is critical for ensuring that your fire alarm system operates efficiently and effectively. Proper installation not only maximizes the system's reliability but also ensures compliance with fire safety regulations, providing early warning in the event of a fire and minimizing potential risks.
    </p>
    <p class="font-bold mb-2">Benefits of Professional Fire Alarm Installation:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Enhanced Safety:</span> Ensures that your fire alarm system is installed correctly to provide early detection and warning, helping to safeguard lives and property.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Regulatory Compliance:</span> Guarantees that your fire alarm system meets all relevant fire safety standards and regulations, avoiding potential legal issues.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Optimized Performance:</span> Ensures that all components of the fire alarm system are installed and configured for optimal performance.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Peace of Mind:</span> Provides confidence that your fire alarm system is reliable and capable of responding effectively in an emergency.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-red-50 text-lg p-6 rounded-lg mb-8">
    <p>
      A professionally installed fire alarm system is your first line of defense against fire hazards. Ensure your property is protected with an expertly installed fire alarm system from London Home Safety Limited.
    </p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">What Does Our Fire Alarm Installation Service Include?</h2>
  <p class="mb-4">
    Our comprehensive fire alarm installation service covers everything from the initial consultation to the final testing of your system. We work closely with you to design a system that meets your specific needs and ensures complete coverage of your property.
  </p>
  <p class="font-bold mb-2">Installation Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Consultation:</span> We assess your property and discuss your fire safety requirements to design a tailored fire alarm system.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">System Design:</span> Our experts create a detailed plan for the installation, including the placement of sensors, alarms, and control panels.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Installation:</span> Professional installation of all system components, ensuring proper placement and secure fitting.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Testing and Commissioning:</span> Thorough testing of the entire system to ensure it operates correctly and meets all safety standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Training:</span> We provide training on how to operate and maintain your new fire alarm system effectively.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Why Choose Us for Your Fire Alarm Installation?</h2>
  <p class="mb-4">
    London Home Safety Limited is committed to delivering exceptional fire alarm installation services with a focus on quality, reliability, and compliance. Our experienced team uses the latest technology and best practices to ensure your fire alarm system provides optimal protection for your property.
  </p>
  <p class="font-bold mb-2">Reasons to Choose Our Service:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Experienced Professionals:</span> Our team consists of qualified and experienced engineers who are experts in fire alarm systems.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Custom Solutions:</span> We provide tailored solutions that meet your specific fire safety needs and requirements.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Compliance Assurance:</span> We ensure that all installations comply with the latest fire safety regulations and standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Reliable Support:</span> Our team offers ongoing support and maintenance to keep your fire alarm system in top condition.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What to Expect After Installation?</h2>
  <p class="mb-4">
    After the installation of your fire alarm system, we provide a detailed handover including all necessary documentation and training. Our commitment to your safety continues with regular maintenance and support to ensure that your system remains effective and compliant.
  </p>
  <p class="font-bold mb-2">Post-Installation Services:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Documentation:</span> You will receive comprehensive documentation including system specifications, testing reports, and maintenance schedules.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Training:</span> Our team will provide training on how to use and maintain the system effectively.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Ongoing Support:</span> We offer ongoing support and maintenance services to ensure your fire alarm system remains in optimal working order.</span>
    </li>
  </ul>
</div>

                `,
            },
            faqs: [
              {
                ques: "What is Fire Alarm Installation?",
                ans: "Fire Alarm Installation involves setting up a fire alarm system within a property to detect and alert occupants of a fire. This process includes selecting the appropriate alarm components, installing detectors and alarms, and ensuring the system is integrated with other fire safety measures.",
              },
              {
                ques: "Why is professional Fire Alarm Installation important?",
                ans: "Professional Fire Alarm Installation is crucial to ensure that the system is installed correctly, meets safety regulations, and functions effectively in the event of a fire. Proper installation ensures reliable detection and alerting, providing essential protection for occupants and property.",
              },
              {
                ques: "What does the Fire Alarm Installation process involve?",
                ans: "The Fire Alarm Installation process includes assessing the property to determine the best placement for alarms and detectors, installing the necessary equipment, integrating the system with existing safety measures, and conducting tests to ensure everything operates correctly.",
              },
              {
                ques: "How long does Fire Alarm Installation take?",
                ans: "The duration of Fire Alarm Installation depends on the size and complexity of the property. It typically takes between one day to several days to complete, including assessment, installation, and testing of the system.",
              },
              {
                ques: "Can I install a fire alarm system myself?",
                ans: "While it is possible to install a fire alarm system yourself, it is highly recommended to hire a professional to ensure proper installation and compliance with safety regulations. Professionals have the expertise to handle complex installations and ensure the system functions effectively.",
              },
              {
                ques: "What types of fire alarm systems are available?",
                ans: "Fire alarm systems vary in type, including conventional systems, addressable systems, and wireless systems. Each type has specific features and benefits depending on the property's size, layout, and fire safety needs. A professional can help determine the best system for your requirements.",
              },
              {
                ques: "What should I do after the fire alarm system is installed?",
                ans: "After installation, ensure that the fire alarm system is tested and inspected to confirm it operates correctly. Schedule regular maintenance and testing to keep the system in optimal condition and ensure ongoing compliance with safety standards.",
              },
            ],
          },
        ],
      },
      {
        label: "Health & Safety Services",
        path: "/health-and-safety-services",
        description:
          "Maintain a safe and healthy living environment with our comprehensive safety solutions.",

        children: [
          {
            label: "Energy Performance Certificate",
            path: "/energy-performance-certificate",
            abbr: "EPC",
            Icon: EpcIcon,
            description:
              "Assess the energy efficiency of your home and get certified with our EPC service.",
            image: backgroundImage,
            detailedDesc: {
              details:
                "An EPC provides an assessment of your property's energy efficiency and recommendations for improvement. It is essential for buying, selling, or renting both residential and commercial properties. Our experts will conduct a thorough inspection and provide you with an official certificate.",
              points: [
                "Detailed energy efficiency rating",
                "Recommendations for improving energy efficiency",
                "Mandatory for selling or renting properties",
              ],
            },
            pageContent: {
              title:
                "Enhancing Efficiency with Expert Energy Performance Certification",
              html: `
               <div class="max-w-4xl mx-auto">
  <p class="text-lg mb-6">
    At London Home Safety Limited, we offer expert Energy Performance Certificate (EPC) services to help you understand and improve the energy efficiency of your property. Our certified assessors provide detailed evaluations that not only ensure compliance with legal requirements but also offer valuable insights to enhance your property's energy performance, reduce utility costs, and contribute to a more sustainable environment.
  </p>

  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Why is an Energy Performance Certificate Important?</h2>
    <p class="mb-4 text-body">
      An Energy Performance Certificate (EPC) is essential for assessing the energy efficiency of a property. It provides a clear rating on how energy-efficient your property is and highlights areas where improvements can be made. This certificate is crucial for property sales, rentals, and compliance with energy efficiency regulations.
    </p>
    <p class="font-bold mb-2">Benefits of an Energy Performance Certificate:</p>
    <ul class="space-y-2">
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Compliance:</span> Ensures that your property meets legal requirements for energy efficiency, especially for sales or rental transactions.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Cost Savings:</span> Identifies opportunities to reduce energy consumption and lower utility bills through recommended improvements.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Increased Property Value:</span> Enhances the attractiveness of your property to potential buyers or tenants by demonstrating energy efficiency.</span>
      </li>
      <li class="flex items-start">
        <span class="text-black font-bold mr-2">•</span>
        <span><span class="font-semibold">Environmental Impact:</span> Contributes to a reduction in your carbon footprint and supports sustainability efforts.</span>
      </li>
    </ul>
  </div>

  <blockquote class="bg-green-50 text-lg p-6 rounded-lg mb-8">
    <p>
      Obtaining an Energy Performance Certificate is a proactive step towards improving your property's energy efficiency and ensuring compliance with regulations. Let us help you make informed decisions for a more energy-efficient future.
    </p>
  </blockquote>

  <h2 class="text-2xl font-bold mb-4">What Does an Energy Performance Certificate Include?</h2>
  <p class="mb-4">
    An Energy Performance Certificate provides a comprehensive assessment of your property's energy efficiency. It includes a rating from A (most efficient) to G (least efficient) and offers practical recommendations for improving energy performance.
  </p>
  <p class="font-bold mb-2">EPC Contents:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Energy Rating:</span> A letter rating indicating the overall energy efficiency of the property.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Estimated Energy Costs:</span> Information on the likely cost of energy for the property based on current performance.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Recommendations:</span> Practical suggestions for improving energy efficiency, such as insulation upgrades or energy-efficient appliances.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Environmental Impact:</span> Assessment of the property's impact on the environment, including CO2 emissions.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">How is the Energy Performance Certificate Issued?</h2>
  <p class="mb-4">
    The process of obtaining an Energy Performance Certificate involves a thorough assessment of your property by a qualified energy assessor. The assessor will evaluate various aspects of the property's energy usage and efficiency to provide an accurate and reliable certificate.
  </p>
  <p class="font-bold mb-2">EPC Process:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Assessment:</span> An energy assessor will visit your property to conduct a detailed evaluation.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Report Generation:</span> The assessor will compile their findings into a comprehensive report, including the energy rating and recommendations.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Certification:</span> You will receive an official Energy Performance Certificate, which can be used for property transactions or regulatory compliance.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">Why Choose Us for Your Energy Performance Certificate?</h2>
  <p class="mb-4">
    London Home Safety Limited provides reliable and professional Energy Performance Certificate services, ensuring that your property meets all required standards and offering valuable insights into energy efficiency improvements. Our team of certified assessors is dedicated to delivering accurate and actionable results for your property.
  </p>
  <p class="font-bold mb-2">Reasons to Choose Our Service:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Qualified Assessors:</span> Our team consists of experienced and certified energy assessors who provide accurate and thorough evaluations.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Comprehensive Reports:</span> We deliver detailed reports with practical recommendations for improving energy efficiency.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Regulatory Compliance:</span> Ensures that your property meets all legal requirements and energy efficiency standards.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Customer Focused:</span> We offer personalized service and support, addressing all your queries and providing guidance throughout the process.</span>
    </li>
  </ul>

  <h2 class="text-2xl font-bold mb-4">What Happens After You Receive Your EPC?</h2>
  <p class="mb-4">
    After receiving your Energy Performance Certificate, you can use it for property sales, rentals, or to make informed decisions about energy efficiency improvements. We also offer ongoing support and advice to help you implement the recommendations and enhance your property's performance.
  </p>
  <p class="font-bold mb-2">Post-Certificate Support:</p>
  <ul class="space-y-2 mb-6">
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Review Recommendations:</span> Discuss the recommendations with our team to plan any necessary improvements.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Implementation Advice:</span> Get guidance on how to implement recommended improvements effectively.</span>
    </li>
    <li class="flex items-start">
      <span class="text-black font-bold mr-2">•</span>
      <span><span class="font-semibold">Ongoing Support:</span> We offer continued support and advice to ensure your property remains energy efficient and compliant.</span>
    </li>
  </ul>
</div>

              `,
            },
            faqs: [
              {
                ques: "What is an Energy Performance Certificate (EPC)?",
                ans: "An Energy Performance Certificate (EPC) provides an assessment of a property's energy efficiency, including recommendations for improving its energy performance. It rates the property on a scale from A (most efficient) to G (least efficient) and helps inform potential buyers or tenants about energy costs and efficiency.",
              },
              {
                ques: "Why do I need an Energy Performance Certificate?",
                ans: "An Energy Performance Certificate is required by law for properties being sold or rented. It provides valuable information about the property's energy efficiency, helping buyers and tenants make informed decisions and encouraging improvements to reduce energy consumption and costs.",
              },
              {
                ques: "How often should an Energy Performance Certificate be renewed?",
                ans: "An Energy Performance Certificate should be renewed every 10 years. However, if significant changes are made to the property that could affect its energy performance, it is advisable to obtain a new certificate to reflect the updated efficiency rating.",
              },
              {
                ques: "What does an EPC assessment involve?",
                ans: "An EPC assessment involves evaluating the property's energy efficiency by analyzing factors such as insulation, heating systems, windows, and lighting. The assessor will also review the property's energy usage and recommend improvements to enhance efficiency and reduce energy costs.",
              },
              {
                ques: "What should I do if my EPC report recommends improvements?",
                ans: "If your EPC report recommends improvements, consider implementing the suggested measures to enhance the property's energy efficiency. This may include upgrading insulation, installing energy-efficient windows or heating systems, and improving overall energy use to reduce costs and increase the property's value.",
              },
              {
                ques: "Is an Energy Performance Certificate mandatory for all properties?",
                ans: "Yes, an Energy Performance Certificate is mandatory for all properties that are being sold or rented. It ensures transparency about the property's energy efficiency and encourages improvements to reduce energy consumption and environmental impact.",
              },
              {
                ques: "How long does it take to get an Energy Performance Certificate?",
                ans: "The time to obtain an Energy Performance Certificate depends on the size and complexity of the property. The assessment typically takes a few hours, with the certificate being issued within a few days after the assessment is completed.",
              },
            ],
          },
        ],
      },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export const ALL_SERVICES: NavLeafItem[] =
  NAV_ITEMS.find((item) => item.label === "Services")?.children?.flatMap(
    (category) =>
      (category.children || []).map((service) => ({
        ...service,
        categoryPath: category.path,
      }))
  ) ?? [];

export const FAQ_HOME = [
  {
    title: "What is an EPC and why do I need one?",
    content:
      "An Energy Performance Certificate (EPC) provides information about the energy efficiency of a property. It's required for properties being sold or rented and helps improve energy use and reduce costs.",
  },
  {
    title:
      "How often should I have an Electrical Installation Condition Report (EICR) conducted?",
    content:
      "It's recommended to have an EICR conducted every 5 years for rented properties and every 10 years for owner-occupied homes. Regular inspections ensure your electrical systems are safe and compliant with regulations.",
  },
  {
    title: "What does a Gas Safety Certificate entail?",
    content:
      "A Gas Safety Certificate confirms that all gas appliances, fittings, and flues in a property are safe to use. It's a legal requirement for landlords to have an annual gas safety check conducted by a registered engineer.",
  },
  {
    title: "Why is PAT Testing important for my home?",
    content:
      "Portable Appliance Testing (PAT) is important to ensure that electrical appliances are safe to use. Regular PAT testing helps prevent electrical hazards and ensures compliance with safety standards.",
  },
  {
    title: "How can I benefit from installing an EV charging station at home?",
    content:
      "Installing an EV charging station at home offers convenience and cost savings for electric vehicle owners. It ensures your vehicle is always ready to go and can increase the value of your property.",
  },
];

export const ADVANTAGES = [
  {
    id: 1,
    advantageName: "Certified Experts",
    advantageDetail: "Highly trained and accredited professionals.",
    Icon: EngineerIcon,
  },
  {
    id: 2,
    advantageName: "Price Match Guarantee",
    advantageDetail: "We promise unbeatable pricing.",
    Icon: LowerPriceIcon,
  },
  {
    id: 3,
    advantageName: "Rapid Response",
    advantageDetail: "Appointments available as early as tomorrow.",
    Icon: FastResponseIcon,
  },
  {
    id: 4,
    advantageName: "Flexible Scheduling",
    advantageDetail: "Book appointments at your convenience.",
    Icon: BookingIcon,
  },
];

export const CONTACT = [
  {
    id: 1,
    title: "Address:",
    info: `43 Felton Road, Barking,  London IG11 7YA`,
    icons: <LocationIcon size={45} className="fill-primary" />,
  },

  {
    id: 2,
    title: "Work Hours:",
    info: "Mon-Fri 08:00 AM - 05:00 PM Sat-Sun: Emergency only",
    icons: <FaClock size={45} className="fill-primary" />,
  },
  {
    id: 3,
    title: "Contact Info:",
    info: "020 8146 6698 info@londonhomesafety.co.uk",
    icons: <IoMail size={45} className="fill-primary" />,
  },
];

export const SOCIALS = [
  {
    id: 1,
    href: "Facebook",
    label: "Facebook",
    icons: <RiFacebookBoxFill size={24} className="fill-primary" />,
  },
  {
    id: 2,
    href: "Facebook",
    label: "X",
    icons: <FaXTwitter size={24} className="fill-primary" />,
  },
  {
    id: 3,
    href: "YouTube",
    label: "YouTube",
    icons: <FaYoutube size={24} className="fill-primary" />,
  },
  {
    id: 4,
    href: "Instagram",
    label: "Instagram",
    icons: <CiInstagram size={24} className="fill-primary" />,
  },
];

export const BUSINESS_NAME: string = "London Home Safety Limited";
export const ADDRESS: string = "43 Felton Road, Barking, London IG11 7YA";
export const PHONE_NO: string = "020 8146 6698";
export const WEBSITE_URL: string = "www.londonhomesafety.co.uk";
export const EMAIL_ADDRESS: string = "info@londonhomesafety.co.uk";
