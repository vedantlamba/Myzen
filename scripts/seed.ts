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
        { name: "Fashion" },
        { name: "Cooking" },
        { name: "Anime Drawing" },
        { name: "Music" },
      ],
      skipDuplicates: true, 
    });

    console.log("✅ Categories seeded successfully!");
  } catch (error) {
    console.error("[SEEDING_ERROR]", error);
  } finally {
    await database.$disconnect();
  }
}

main();
