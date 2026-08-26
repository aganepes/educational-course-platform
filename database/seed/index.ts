// main-seed.ts
import { seedInstructors } from "./instructors";
import { seedCourses } from "./courses";
import { seedUsers } from "./users";
import { seedPurchases } from "./purchases";

async function main() {
  console.log("🚀 Ähli baza seed prosesi başlandy...");

    // 1. Mugallymlary girizmeli (courses üçin gerek)
    await seedInstructors();

    // 2. Kurslary girizmeli (purchases üçin gerek)
    await seedCourses();

    // 3. Ulanyjylary girizmeli (purchases üçin gerek)
    await seedUsers();

    // 4. Satyn alnanlary girizmeli (users we courses bar bolmaly)
    await seedPurchases();

    console.log("🎉 Ähli maglumatlar bazaga üstünlikli ýazyldy!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});