import EicrIcon from "@/components/icons/eicr";
import EpcIcon from "@/components/icons/epc";
import FuseBoxIcon from "@/components/icons/fuse-box";
import PatIcon from "@/components/icons/pat";
import backgroundImage from "@/images/about-bg.jpeg";
import { NavItem, NavLeafItem } from "@/types/misc";
import { v4 as uuidv4 } from "uuid";

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
    <p>An Electrical Installation Condition Report (EICR) is a detailed assessment of the electrical installations in your property. It identifies any potential hazards, deficiencies, or non-compliance with current safety standards. Our certified experts at London Home Safety Limited conduct thorough EICR inspections to ensure your electrical systems are safe and up to code. Whether for residential or commercial properties, our professional EICR services provide peace of mind, knowing that your environment is secure and compliant. Trust us to deliver reliable and comprehensive EICR solutions tailored to your needs.</p>

    <div>
      <div>
        <h2>Why Do You Need an EICR?</h2>
        <p>An EICR is essential for ensuring the safety of your property’s electrical systems. Over time, electrical installations can deteriorate due to wear and tear, environmental conditions, or previous poor workmanship. Regular EICR inspections help identify these issues before they become serious hazards.</p>
        <p><strong>Benefits of EICR:</strong></p>
        <ul>
          <li><strong>Safety:</strong> Identifies potential electrical hazards and prevents accidents such as fires or electric shocks.</li>
          <li><strong>Compliance:</strong> Ensures your property complies with current electrical safety standards.</li>
          <li><strong>Peace of Mind:</strong> Provides assurance that your electrical installations are safe and reliable.</li>
          <li><strong>Insurance:</strong> Many insurance policies require an up-to-date EICR to maintain coverage.</li>
        </ul>
      </div>
      <blockquote style="background:   font-size: 18px; padding: 20px; border-radius: 10px; margin: 0; margin-top: 20px">
        <p style="margin:0">Did you know that outdated or faulty electrical installations can pose serious safety risks? Regular EICR inspections are essential to identify potential hazards and ensure compliance with safety standards.</p>
      </blockquote>
    </div>

    <h2>Why Is It Required?</h2>
    <p>EICR inspections are required to ensure compliance with safety regulations and standards, particularly in rented and commercial properties. Landlords are legally obligated to ensure their properties are electrically safe, and regular EICR checks are a key part of this responsibility.</p>
    <p><strong>Legal Requirements:</strong></p>
    <ul>
      <li><strong>Landlords:</strong> Must have an EICR conducted at least every 5 years or at the change of tenancy.</li>
      <li><strong>Businesses:</strong> Should conduct EICR inspections regularly to comply with health and safety regulations and insurance requirements.</li>
      <li><strong>Homeowners:</strong> While not legally required, it is recommended to have an EICR conducted every 10 years for safety and peace of mind.</li>
    </ul>

    <h2>What Will It Do?</h2>
    <p>An EICR assesses the safety and condition of your electrical installations. It identifies any faults or defects that could pose a risk to the occupants.</p>
    <p><strong>EICR Outcomes:</strong></p>
    <ul>
      <li><strong>Identification of Defects:</strong> Lists any issues with the electrical installations, such as outdated wiring or faulty components.</li>
      <li><strong>Risk Assessment:</strong> Evaluates the level of risk associated with each defect.</li>
      <li><strong>Recommendations:</strong> Provides guidance on necessary repairs or upgrades to ensure safety and compliance.</li>
    </ul>

    <h2>Who Should Take It?</h2>
    <p>EICR inspections are recommended for various types of property owners and occupants:</p>
    <p><strong>Who Needs an EICR:</strong></p>
    <ul>
      <li><strong>Landlords:</strong> To ensure rental properties are safe and compliant with legal standards.</li>
      <li><strong>Homeowners:</strong> For peace of mind and to address any potential electrical issues in their homes.</li>
      <li><strong>Business Owners:</strong> To comply with health and safety regulations and protect employees and customers.</li>
      <li><strong>Property Buyers/Sellers:</strong> To assess the condition of the electrical installations before completing a transaction.</li>
    </ul>

    <h2>What Happens During an EICR?</h2>
    <p>During an EICR inspection, a qualified electrician will perform a thorough examination of your property’s electrical systems.</p>
    <p><strong>Inspection Process:</strong></p>
    <ul>
      <li><strong>Visual Inspection:</strong> Checks for visible signs of damage or wear.</li>
      <li><strong>Testing:</strong> Conducts tests on the electrical installations to ensure they are functioning correctly and safely.</li>
      <li><strong>Documentation:</strong> Records the findings and provides a detailed report, including any defects and recommendations.</li>
    </ul>

    <h2>What Happens Afterwards?</h2>
    <p>After the EICR inspection, you will receive a comprehensive report detailing the condition of your electrical installations and any required actions.</p>
    <p><strong>Post-Inspection Steps:</strong></p>
    <ul>
      <li><strong>Review Report:</strong> Go through the findings with the electrician to understand the condition of your electrical systems.</li>
      <li><strong>Address Defects:</strong> Schedule necessary repairs or upgrades as recommended in the report.</li>
      <li><strong>Certification:</strong> Once any required work is completed, you will receive a certificate confirming that your property meets the required safety standards.</li>
    </ul>
    <p>By following these steps, you can ensure that your property’s electrical systems are safe, compliant, and functioning properly. Regular EICR inspections are a proactive measure to protect your property and its occupants from electrical hazards.</p>
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
                <p>Portable Appliance Testing (PAT) is a vital process to ensure that electrical appliances in your property are safe to use. Our PAT service involves thorough inspections and tests conducted by qualified technicians, ensuring compliance with safety standards and preventing potential electrical hazards.</p>
                
                <h2>What Appliances Need PAT Testing?</h2>
                <p>PAT testing is necessary for various types of portable electrical appliances, including but not limited to:</p>
                <ul>
                  <li>Computers and peripherals</li>
                  <li>Kitchen appliances (e.g., kettles, toasters)</li>
                  <li>Office equipment (e.g., printers, copiers)</li>
                  <li>Power tools</li>
                  <li>Extension cords and chargers</li>
                </ul>
                
                <h2>Who Should Get PAT Testing?</h2>
                <p>PAT testing is recommended for a wide range of property owners and users:</p>
                <ul>
                  <li><strong>Landlords:</strong> To ensure rental properties are safe and comply with regulations.</li>
                  <li><strong>Homeowners:</strong> For peace of mind and to ensure the safety of appliances in the home.</li>
                  <li><strong>Business Owners:</strong> To comply with health and safety regulations and protect employees and customers.</li>
                  <li><strong>Educational Institutions:</strong> To ensure the safety of students and staff.</li>
                </ul>
                
                <h2>What Happens During PAT Testing?</h2>
                <p>During PAT testing, a qualified technician will perform a thorough examination of your portable appliances.</p>
                <p><strong>Inspection Process:</strong></p>
                <ul>
                  <li><strong>Pre-Testing Inspection:</strong> Initial visual inspection to check for any visible damage or wear.</li>
                  <li><strong>Electrical Testing:</strong> Conducts electrical tests to ensure appliances are functioning correctly and safely.</li>
                  <li><strong>Documentation:</strong> Records the findings and provides a detailed report, including any defects and recommendations.</li>
                </ul>
                
                <h2>What Happens After PAT Testing?</h2>
                <p>After the PAT testing, you will receive a comprehensive report detailing the condition of your appliances and any required actions.</p>
                <p><strong>Post-Testing Steps:</strong></p>
                <ul>
                  <li><strong>Review Report:</strong> Go through the findings with the technician to understand the condition of your appliances.</li>
                  <li><strong>Address Faults:</strong> Schedule necessary repairs or replacements as recommended in the report.</li>
                  <li><strong>Certification:</strong> Once any required work is completed, you will receive a certificate confirming that your appliances meet the required safety standards.</li>
                </ul>
                <p>By following these steps, you can ensure that your property’s electrical appliances are safe, compliant, and functioning properly. Regular PAT testing is a proactive measure to protect your property and its occupants from electrical hazards.</p>
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
                <p>A properly installed fuse box is critical for maintaining the safety and efficiency of your property's electrical system. At London Home Safety Limited, our experienced electricians provide expert fuse box installations and upgrades to meet the latest safety standards and handle the electrical demands of modern homes and businesses.</p>
                
                <h2>Why Upgrade Your Fuse Box?</h2>
                <p>Upgrading your fuse box can address several issues and improve the overall safety and performance of your electrical system:</p>
                <ul>
                  <li><strong>Enhanced Safety:</strong> Reduces the risk of electrical fires and other hazards.</li>
                  <li><strong>Regulatory Compliance:</strong> Ensures your electrical system meets current regulations.</li>
                  <li><strong>Increased Capacity:</strong> Supports the electrical load of modern appliances and devices.</li>
                  <li><strong>Improved Reliability:</strong> Minimizes the likelihood of electrical faults and power outages.</li>
                </ul>
                
                <h2>Who Needs a Fuse Box Upgrade?</h2>
                <p>Several scenarios may necessitate a fuse box upgrade:</p>
                <ul>
                  <li><strong>Older Properties:</strong> Homes and businesses with outdated fuse boxes may not meet current safety standards.</li>
                  <li><strong>Home Renovations:</strong> Upgrades are often needed when adding new rooms or major appliances.</li>
                  <li><strong>Increased Electrical Demand:</strong> Properties that have seen an increase in electrical usage.</li>
                  <li><strong>Safety Concerns:</strong> Addressing frequent electrical issues or concerns about safety.</li>
                </ul>
                
                <h2>What Happens During Fuse Box Installation?</h2>
                <p>Our professional installation process ensures your new fuse box is safely and efficiently installed:</p>
                <ul>
                  <li><strong>Assessment:</strong> Initial assessment of your current electrical system and fuse box.</li>
                  <li><strong>Installation:</strong> Safe removal of the old fuse box and installation of the new one.</li>
                  <li><strong>Testing:</strong> Comprehensive testing to ensure the new fuse box is functioning correctly.</li>
                  <li><strong>Documentation:</strong> Providing you with all necessary certifications and documentation.</li>
                </ul>
                
                <h2>What to Expect After Installation?</h2>
                <p>After the installation of your new fuse box, you can expect several benefits:</p>
                <ul>
                  <li><strong>Improved Safety:</strong> Reduced risk of electrical hazards and enhanced safety for occupants.</li>
                  <li><strong>Increased Reliability:</strong> More stable and reliable electrical system performance.</li>
                  <li><strong>Peace of Mind:</strong> Knowing that your property meets current safety standards and regulations.</li>
                </ul>
                <p>By upgrading or installing a new fuse box, you are taking a proactive step towards ensuring the safety and efficiency of your property's electrical system. Contact London Home Safety Limited today to schedule your fuse box installation.</p>
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
                <p>At London Home Safety Limited, we understand the importance of having a reliable and safe electrical system. Our certified professionals offer comprehensive electrical repair services, ensuring that any issues you face are resolved efficiently and effectively.</p>
                
                <h2>Why Choose Our Electrical Repair Services?</h2>
                <p>We provide a wide range of repair services to address all your electrical needs, whether it's a simple fix or a complex problem:</p>
                <ul>
                  <li><strong>Minor Repairs:</strong> Fixes for common issues such as broken outlets, switches, and minor wiring problems.</li>
                  <li><strong>Major Repairs:</strong> Handling more complex issues including faulty wiring, circuit breaker problems, and system overhauls.</li>
                  <li><strong>Emergency Call-Out:</strong> Rapid response for urgent electrical issues that require immediate attention.</li>
                </ul>
                
                <h2>Who Can Benefit from Our Services?</h2>
                <p>Our electrical repair services are designed for a variety of clients:</p>
                <ul>
                  <li><strong>Homeowners:</strong> Ensuring your home’s electrical system is safe and functional.</li>
                  <li><strong>Landlords:</strong> Maintaining electrical safety and compliance in rental properties.</li>
                  <li><strong>Business Owners:</strong> Keeping your business’s electrical systems operational to avoid downtime.</li>
                  <li><strong>Property Managers:</strong> Managing electrical repairs and maintenance for multiple properties.</li>
                </ul>
                
                <h2>What Happens During an Electrical Repair?</h2>
                <p>Our repair process is thorough and designed to address any issues effectively:</p>
                <ul>
                  <li><strong>Initial Assessment:</strong> Identifying the problem through a detailed inspection.</li>
                  <li><strong>Repair Work:</strong> Conducting the necessary repairs using high-quality materials and professional techniques.</li>
                  <li><strong>Testing:</strong> Ensuring that the repaired system is functioning safely and correctly.</li>
                  <li><strong>Documentation:</strong> Providing a detailed report of the work carried out and any further recommendations.</li>
                </ul>
                
                <h2>What to Expect After the Repair?</h2>
                <p>After completing the repair, we ensure your electrical system is safe and reliable:</p>
                <ul>
                  <li><strong>Improved Safety:</strong> Addressing potential hazards to prevent future issues.</li>
                  <li><strong>Enhanced Reliability:</strong> Ensuring your electrical system operates smoothly and efficiently.</li>
                  <li><strong>Ongoing Support:</strong> Offering advice and support for maintaining your electrical system.</li>
                </ul>
                <p>With our professional electrical repair services, you can have peace of mind knowing that your electrical systems are in safe hands. Contact London Home Safety Limited today to schedule a repair.</p>
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
                <p>Electric vehicle (EV) chargers provide the convenience of charging your vehicle at home or at your business premises. At London Home Safety Limited, we offer professional EV charger installation services, ensuring safe and efficient setups tailored to your specific needs.</p>
                
                <h2>Why Install an EV Charger?</h2>
                <p>Installing an EV charger at your home or business offers numerous benefits:</p>
                <ul>
                  <li><strong>Convenience:</strong> Charge your EV at your own premises without relying on public charging stations.</li>
                  <li><strong>Cost Savings:</strong> Reduce the cost of charging compared to using public charging points.</li>
                  <li><strong>Increased Property Value:</strong> Enhance the value of your property by adding modern EV charging facilities.</li>
                  <li><strong>Environmental Benefits:</strong> Support sustainable practices by promoting the use of electric vehicles.</li>
                </ul>
                
                <h2>Our EV Charger Installation Process</h2>
                <p>Our professional installation process ensures a seamless and efficient setup:</p>
                <ul>
                  <li><strong>Assessment:</strong> Evaluate your electrical system and determine the best location for the charger.</li>
                  <li><strong>Recommendation:</strong> Suggest the most suitable EV charger based on your vehicle and usage needs.</li>
                  <li><strong>Installation:</strong> Safely install the charger, ensuring it meets all safety and regulatory standards.</li>
                  <li><strong>Testing:</strong> Conduct thorough testing to ensure the charger is functioning correctly and safely.</li>
                </ul>
                
                <h2>Who Can Benefit from EV Charger Installation?</h2>
                <p>Our EV charger installation services are ideal for a variety of clients:</p>
                <ul>
                  <li><strong>Homeowners:</strong> Install a charger for personal use, enhancing convenience and property value.</li>
                  <li><strong>Landlords:</strong> Provide EV charging options for tenants, making your property more attractive.</li>
                  <li><strong>Business Owners:</strong> Offer charging facilities for employees and customers, supporting sustainability initiatives.</li>
                  <li><strong>Property Developers:</strong> Include EV chargers in new developments to meet growing demand.</li>
                </ul>
                
                <h2>What to Expect After Installation?</h2>
                <p>Once the installation is complete, you can enjoy the following benefits:</p>
                <ul>
                  <li><strong>Seamless Charging:</strong> Easily charge your EV at home or work.</li>
                  <li><strong>Reduced Costs:</strong> Save money on charging compared to public stations.</li>
                  <li><strong>Enhanced Convenience:</strong> Charge your vehicle at your convenience, without the need to visit public chargers.</li>
                  <li><strong>Ongoing Support:</strong> Receive support and maintenance services to ensure your charger remains in optimal condition.</li>
                </ul>
                <p>By installing an EV charger, you take a significant step towards sustainable living and support the growing infrastructure for electric vehicles. Contact London Home Safety Limited today to schedule your EV charger installation.</p>
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
