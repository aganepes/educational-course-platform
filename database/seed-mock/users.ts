import { db } from "../";
import { users} from "../schemas/users";
import type { InsertUser} from "../zod-schemas/users";


export async function seedUsers() {
  console.log("🌱 Ulanyjylar (Users) seed başlandy...");

  const userData: InsertUser[] = [
    {
      id: "100",
      username: "Aganepes",
      email: "aaganepes@gmial.com",
      phone: "+99361363517",
      password: "$2b$10$Te.ttqX5mvei/zB2SXjb7.5kAIz7y0WFl3O7QXyzRVHmWpnaigCVC", // Hash-lenen parol (05051991)
      role: "user",
    },
    {
      id: "101",
      username: "Ahmedow",
      email: "aganepes_math@gmial.com",
      phone: "+99361000000",
      password: "$2b$10$Te.ttqX5mvei/zB2SXjb7.5kAIz7y0WFl3O7QXyzRVHmWpnaigCVC", // Hash-lenen parol (05051991)
      role: "admin",
    },
  ];

  await db
    .insert(users)
    .values(userData)
    .onConflictDoNothing();

  console.log("✅ Ulanyjylar seed üstünlikli tamamlandy!");
}