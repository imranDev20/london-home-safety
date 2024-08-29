import BookingIcon from "@/components/icons/booking-icon";
import EicrIcon from "@/components/icons/eicr";
import ElectricalRepairs from "@/components/icons/electrical-repairs";
import EngineerIcon from "@/components/icons/engineer";
import EpcIcon from "@/components/icons/epc";
import EvCrarger from "@/components/icons/ev-charger";
import FastResponseIcon from "@/components/icons/fast-response-icon";
import FuseBoxIcon from "@/components/icons/fuse-box";
import LocationIcon from "@/components/icons/location-icon";
import LowerPriceIcon from "@/components/icons/lower-price-icon";
import PatIcon from "@/components/icons/pat";
import backgroundImage from "@/images/about-bg.jpeg";
import { NavItem, NavLeafItem } from "@/types/misc";
import { FaClock } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiFacebookBoxFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { CiInstagram } from "react-icons/ci";

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
            image: backgroundImage,
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

                packages: [
                  {
                    id: uuidv4(),
                    name: "EICR for Studio Flat",
                    price: 70,
                    propertyType: "RESIDENTIAL",
                  },
                  {
                    id: uuidv4(),
                    name: "EICR for 1-2 bedrooms",
                    price: 90,
                    propertyType: "RESIDENTIAL",
                  },
                  {
                    id: uuidv4(),

                    name: "EICR for 3-4 bedrooms",
                    price: 110,
                    propertyType: "RESIDENTIAL",
                  },
                  {
                    id: uuidv4(),

                    name: "EICR for 5-6 bedrooms",
                    price: 150,
                    propertyType: "RESIDENTIAL",
                  },
                ],
              },

              {
                type: "COMMERCIAL",
                unit: "circuit",

                description:
                  "Comprehensive electrical safety reports for commercial properties.",

                packages: [
                  {
                    id: uuidv4(),

                    name: "EICR for 1-5 circuits",
                    price: 120,
                    propertyType: "COMMERCIAL",
                  },
                  {
                    id: uuidv4(),

                    name: "EICR for 6-10 circuits",
                    price: 160,
                    propertyType: "COMMERCIAL",
                  },
                  {
                    id: uuidv4(),

                    name: "EICR for 11-20 circuits",
                    price: 250,
                    propertyType: "COMMERCIAL",
                  },
                ],
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

                packages: [
                  {
                    id: uuidv4(),

                    name: "EPC Upto 10 Appliances",
                    price: 59.99,
                  },
                  {
                    id: uuidv4(),

                    name: "EPC Upto 20 Appliances",
                    price: 69.99,
                  },
                ],
              },
              {
                type: "COMMERCIAL",
                unit: "item",

                description:
                  "Comprehensive PAT testing for commercial properties.",

                packages: [
                  {
                    id: uuidv4(),

                    name: "EPC Upto 10 Appliances",
                    price: 79.99,
                  },
                  {
                    id: uuidv4(),

                    name: "EPC Upto 20 Appliances",
                    price: 99.99,
                  },
                ],
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

                packages: [
                  {
                    id: uuidv4(),

                    name: "Domestic Fuse Box Installation",
                    price: 299.99,
                  },
                ],
              },
              {
                type: "COMMERCIAL",
                unit: "installation",

                description:
                  "Ensure your business is compliant and safe with a new fuse box.",

                packages: [
                  {
                    id: uuidv4(),

                    name: "Commercial Fuse Box Installation",
                    price: 799.99,
                  },
                ],
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

                packages: [
                  {
                    id: uuidv4(),

                    name: "Fuse box repairs",
                    price: 0,
                  },
                  {
                    id: uuidv4(),

                    name: "Earth Bonding",
                    price: 0,
                  },
                  {
                    id: uuidv4(),

                    name: "Electrical alters",
                    price: 0,
                  },
                  {
                    id: uuidv4(),

                    name: "Socket setup",
                    price: 0,
                  },
                  {
                    id: uuidv4(),

                    name: "Bath circuit",
                    price: 0,
                  },
                  {
                    id: uuidv4(),

                    name: "Spotlight placement",
                    price: 0,
                  },
                ],
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
          },
          {
            label: "Boiler Service & Repair",
            path: "/boiler-service-repair",

            image: backgroundImage,
            description:
              "Maintain and repair your boiler to ensure efficient and safe operation.",

            pricingDetails: [
              {
                type: "RESIDENTIAL",
                unit: "boiler",
                description: "",

                packages: [],
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
          },
          {
            label: "Fire Alarm Certificate",
            path: "/fire-alarm-certificate",

            image: backgroundImage,
            description:
              "Certify your fire alarm system to ensure it meets all safety regulations.",
          },
          {
            label: "Fire Alarm Installation",
            path: "/fire-alarm-installation",

            image: backgroundImage,
            description:
              "Install a reliable fire alarm system to protect your home and loved ones.",
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

export const CONTACT= [
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
    id:2,
    href: "Facebook",
    label: "X",
    icons: <FaXTwitter size={24} className="fill-primary" />,
  },
  {
    id:3,
    href: "YouTube",
    label: "YouTube",
    icons: <FaYoutube size={24}  className="fill-primary"/>,
  },
  {
    id:4,
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