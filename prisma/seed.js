const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const load = async () => {
  try {
    const userPromises = [];

    // for (let i = 0; i < 1000; i++) {
    //   // Adjust the number here for more or fewer entries
    //   userPromises.push(
    //     prisma.user.create({
    //       data: {
    //         email: faker.internet.email(),
    //         password: faker.internet.password(), // In a real application, hash the password.
    //         name: faker.name.fullName(),
    //         phone: faker.phone.number(),
    //         role: "CUSTOMER",
    //         expertise: faker.name.jobTitle(),
    //         address: {
    //           create: {
    //             street: faker.address.streetAddress(),
    //             city: faker.address.city(),
    //             postcode: faker.address.zipCode(),
    //           },
    //         },
    //       },
    //     })
    //   );
    // }

    for (let i = 0; i < 90; i++) {
      // Adjust the number here for more or fewer entries
      const email = faker.internet.email();

      // Check if the email already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        userPromises.push(
          prisma.user.create({
            data: {
              email: email,
              password: faker.internet.password(), // In a real application, hash the password.
              name: faker.name.fullName(),
              phone: faker.phone.number(),
              role: "STAFF", // Role set to STAFF for engineers
              expertise: faker.helpers.arrayElement([
                "Electrical services",
                "Fire services",
                "Gas services",
                "Other",
              ]), // Randomly select expertise
              address: {
                create: {
                  street: faker.address.streetAddress(),
                  city: faker.address.city(),
                  postcode: faker.address.zipCode(),
                },
              },
            },
          })
        );
      } else {
        console.log(`Email ${email} already exists. Skipping this entry.`);
      }
    }

    const users = await Promise.all(userPromises);
    console.log("Fake users created:", users.length);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
