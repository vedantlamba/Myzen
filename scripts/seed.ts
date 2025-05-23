import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Business" },
        { name: "Technology & Development" },
        { name: "Design & Creativity" },
        { name: "Lifestyle & Hobbies" },
        { name: "Personal Development" },
        { name: "Science & Engineering" },
        { name: "Health & Fitness" },
      ],
    });

    console.log("Successful seeding!");
  } catch (error) {
    console.log("[SEEDING_ERROR]", error);
  } finally {
    await database.$disconnect();
  }
}

main();
