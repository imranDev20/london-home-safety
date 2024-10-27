const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const generateFakeUser = (role) => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: faker.name.fullName(),
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
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      postcode: faker.address.zipCode(),
    },
  },
});

const generateFakePackage = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  category: faker.helpers.arrayElement([
    "ELECTRICAL",
    "FIRE",
    "GAS",
    "HEALTH_SAFETY",
    "PROPERTY_MANAGEMENT",
  ]),
  serviceName: faker.helpers.arrayElement([
    "Electrical Inspection",
    "Fire Alarm Installation",
    "Gas Safety Check",
    "Health and Safety Audit",
    "Property Maintenance",
  ]),
  type: faker.helpers.arrayElement([
    "CERTIFICATE",
    "REPAIR",
    "INSTALLATION",
    "INSPECTION",
    "OTHER",
  ]),
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
  unitType: faker.helpers.arrayElement([
    "per hour",
    "per visit",
    "per sq ft",
    "flat rate",
  ]),
  price: parseFloat(faker.finance.amount(20, 200, 2)),
});

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
  date: faker.date.between(startDate, endDate),
  orderNotes: faker.lorem.sentence(),
  totalPrice: parseFloat(faker.finance.amount(50, 500, 2)),
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
    // Create 300 customers
    console.log("Creating customers...");
    const customerPromises = Array(1)
      .fill()
      .map(() => prisma.user.create({ data: generateFakeUser("CUSTOMER") }));
    const customers = await Promise.all(customerPromises);
    console.log(`${customers.length} customers created.`);

    // Create 20 engineers
    console.log("Creating engineers...");
    const engineerPromises = Array(1)
      .fill()
      .map(() => prisma.user.create({ data: generateFakeUser("STAFF") }));
    const engineers = await Promise.all(engineerPromises);
    console.log(`${engineers.length} engineers created.`);

    // Create 50 packages
    console.log("Creating packages...");
    const packagePromises = Array(1)
      .fill()
      .map(() => prisma.package.create({ data: generateFakePackage() }));
    const packages = await Promise.all(packagePromises);
    console.log(`${packages.length} packages created.`);

    // Create 1000 orders
    console.log("Creating orders...");
    // const startDate = new Date(2024, 0, 1);
    const startDate = new Date();
    const endDate = new Date();
    const orderPromises = Array(30)
      .fill()
      .map(() => {
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
      });
    const orders = await Promise.all(orderPromises);
    console.log(`${orders.length} orders created.`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase().then(() => console.log("Seeding process finished."));
