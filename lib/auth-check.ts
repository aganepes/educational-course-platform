import { db } from "@/database";
import { users } from "@/database/schemas/users";
import { eq } from "drizzle-orm";

export async function validateUserSession(userId: string, tokenSessionId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  // Eger Token-däki sessionId bazadaky bilen deň BOLMASA:
  // Diýmek, bu ulanyjy başga bir enjamdan/brauzerden login edipdir!
  if (!user || user.activeSessionId !== tokenSessionId) {
    return false; // Sessiýa garama kätip edildi! (Logout etmeli)
  }

  return true; // Sessiýa dogry
}