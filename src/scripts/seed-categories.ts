import { db } from "@/db";
import { categories } from "@/db/schema";

const categoriesNames = [
  "Gaming",
  "Music",
  "Films and animation",
  "Books",
  "TV Shows",
  "Travel and events",
  "Art and design",
  "Science and technology",
  "History",
  "Sports",
  "People and blogs",
  "Comedy",
  "News and politics",
  "Pets and animals",
  "Development",
  "Podcasts",
];

async function main() {
  try {
    const values = categoriesNames.map((name) => ({
      name,
      description: `Videos related to ${name.toUpperCase()}`,
    }));

    await db.insert(categories).values(values);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

main();
