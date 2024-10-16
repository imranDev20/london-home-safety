const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const generateFakeUser = (role) => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  role: role,
  expertise:
    role === "STAFF"
      ? faker.helpers.arrayElement([
          "Electrical",
          "Fire",
          "Gas",
          "Health & Safety",
        ])
      : undefined,
  address: {
    create: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode(),
    },
  },
});

const serviceNames = [
  "Electrical Installation Condition Report",
  "Portable Appliance Testing",
  "Fuse Box Installation",
  "Electrical Diagnostic & Repair Services",
  "EV Charger Installation",
  "Gas Safety Certificates",
  "Boiler Servicing & Repair",
  "Fire Risk Assessment",
  "Fire Alarm Certificates",
  "Fire Alarm Installation",
  "Emergency Lighting Installation",
  "Emergency Lighting Certificates",
  "Fire Extinguisher Check",
  "Energy Performance Certificate",
  "Asbestos Surveys",
  "Inventory Services",
];

const generateFakePackage = (serviceName, propertyType) => {
  let category;
  if (
    serviceName.includes("Electrical") ||
    serviceName.includes("EV Charger")
  ) {
    category = "ELECTRICAL";
  } else if (serviceName.includes("Gas") || serviceName.includes("Boiler")) {
    category = "GAS";
  } else if (
    serviceName.includes("Fire") ||
    serviceName.includes("Emergency Lighting")
  ) {
    category = "FIRE";
  } else {
    category = "HEALTH_SAFETY";
  }

  return {
    name: `${serviceName}`,
    category: category,
    serviceName: serviceName,
    type: faker.helpers.arrayElement([
      "CERTIFICATE",
      "REPAIR",
      "INSTALLATION",
      "INSPECTION",
      "OTHER",
    ]),
    propertyType: propertyType,
    residentialType:
      propertyType === "RESIDENTIAL"
        ? faker.helpers.arrayElement([
            "BUNGALOW",
            "MID_TERRACED_HOUSE",
            "DETACHED_HOUSE",
            "SEMI_DETACHED_HOUSE",
            "FLAT",
            "APARTMENT",
            "OTHER",
          ])
        : null,
    commercialType:
      propertyType === "COMMERCIAL"
        ? faker.helpers.arrayElement([
            "PUB",
            "STORE",
            "OFFICE",
            "RESTAURANT",
            "WAREHOUSE",
            "OTHER",
          ])
        : null,
    unitType: faker.helpers.arrayElement([
      "per hour",
      "per visit",
      "per sq ft",
      "flat rate",
    ]),
    price: parseFloat(faker.finance.amount({ min: 20, max: 200, dec: 2 })),
    priceType: faker.helpers.arrayElement(["FIXED", "FROM", "RANGE"]),
  };
};

const generateFakeOrder = (startDate, endDate) => ({
  status: faker.helpers.arrayElement([
    "PENDING",
    "CONFIRMED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ]),
  paymentStatus: faker.helpers.arrayElement([
    "UNPAID",
    "PARTIALLY_PAID",
    "PAID",
    "REFUNDED",
  ]),
  paymentMethod: faker.helpers.arrayElement([
    "CREDIT_CARD",
    "CASH_TO_ENGINEER",
    "BANK_TRANSFER",
  ]),
  parkingOptions: faker.helpers.arrayElement(["PAID", "FREE", "NO"]),
  isCongestionZone: faker.datatype.boolean(),
  inspectionTime: faker.helpers.arrayElement([
    "MORNING",
    "AFTERNOON",
    "EVENING",
  ]),
  date: faker.date.between({ from: startDate, to: endDate }),
  orderNotes: faker.lorem.sentence(),
  totalPrice: parseFloat(faker.finance.amount({ min: 50, max: 500, dec: 2 })),
  invoice: faker.finance.accountNumber(),
  propertyType: faker.helpers.arrayElement([
    "RESIDENTIAL",
    "COMMERCIAL",
    "NOT_APPLICABLE",
    "HMO",
    "COMMUNAL_AREA",
    "BUSINESS_SECTOR",
  ]),
  residentialType: faker.helpers.arrayElement([
    "BUNGALOW",
    "MID_TERRACED_HOUSE",
    "DETACHED_HOUSE",
    "SEMI_DETACHED_HOUSE",
    "FLAT",
    "APARTMENT",
    "OTHER",
  ]),
  commercialType: faker.helpers.arrayElement([
    "PUB",
    "STORE",
    "OFFICE",
    "RESTAURANT",
    "WAREHOUSE",
    "OTHER",
  ]),
});

const seedDatabase = async () => {
  try {
    // Create 5 customers
    console.log("Creating customers...");
    const customers = await Promise.all(
      Array.from({ length: 5 }, () =>
        prisma.user.create({ data: generateFakeUser("CUSTOMER") })
      )
    );
    console.log(`${customers.length} customers created.`);

    // Create 3 engineers
    console.log("Creating engineers...");
    const engineers = await Promise.all(
      Array.from({ length: 3 }, () =>
        prisma.user.create({ data: generateFakeUser("STAFF") })
      )
    );
    console.log(`${engineers.length} engineers created.`);

    // Create packages
    console.log("Creating packages...");
    const packages = [];
    for (const [index, serviceName] of serviceNames.entries()) {
      if (index < 2) {
        // First two services: Residential and Commercial
        packages.push(
          ...(await Promise.all([
            ...Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "RESIDENTIAL"),
              })
            ),
            ...Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "COMMERCIAL"),
              })
            ),
          ]))
        );
      } else if (index < 4) {
        // Next two services: HMO, Communal, Business Area
        packages.push(
          ...(await Promise.all([
            ...Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "HMO"),
              })
            ),
            ...Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "COMMUNAL_AREA"),
              })
            ),
            ...Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "BUSINESS_SECTOR"),
              })
            ),
          ]))
        );
      } else if (index < 14) {
        // Rest of the services: Not Applicable
        packages.push(
          ...(await Promise.all(
            Array.from({ length: 3 }, () =>
              prisma.package.create({
                data: generateFakePackage(serviceName, "NOT_APPLICABLE"),
              })
            )
          ))
        );
      }
      // Last two services: No packages
    }
    console.log(`${packages.length} packages created.`);

    // Create 10 orders
    console.log("Creating orders...");
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date();
    const orders = await Promise.all(
      Array.from({ length: 10 }, () => {
        const fakeOrder = generateFakeOrder(startDate, endDate);
        return prisma.order.create({
          data: {
            ...fakeOrder,
            user: { connect: { id: faker.helpers.arrayElement(customers).id } },
            assignedEngineer: {
              connect: { id: faker.helpers.arrayElement(engineers).id },
            },
            packages: {
              connect: [
                { id: faker.helpers.arrayElement(packages).id },
                { id: faker.helpers.arrayElement(packages).id },
              ],
            },
          },
        });
      })
    );
    console.log(`${orders.length} orders created.`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase().then(() => console.log("Seeding process finished."));
