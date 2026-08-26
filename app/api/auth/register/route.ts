import { NextResponse } from "next/server";
import { db } from "@/database";
import { users } from "@/database/schemas/users";
import { insertUserSchema } from "@/database/zod-schemas/users";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { setAuthCookiesOfResponse } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Zod arkaly Gelýän Maglumatlary Barlamak
    const validation = insertUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, email, phone, password } = validation.data;

    const normalizedUsername = username.toLowerCase().trim();
    const normalizedEmail = email ? email.toLowerCase().trim() : null;
    const normalizedPhone = phone ? phone.trim().replace(/\s+/g, "") : null;
    // Bazada Username, Email ýa-da Phone Bar-Ýokdugyny Barlamak
    const conditions = [eq(users.username, normalizedUsername)];
    if (normalizedEmail) conditions.push(eq(users.email, normalizedEmail));
    if (normalizedPhone) conditions.push(eq(users.phone, normalizedPhone));

    const existingUser = await db.query.users.findFirst({
      where: or(...conditions),
    });

    if (existingUser) {
      let message = "error-message.has-username";
      if (normalizedEmail && existingUser.email === normalizedEmail) {
        message = "error-message.has-email";
      } else if (normalizedPhone && existingUser.phone === normalizedPhone) {
        message = "error-message.has-phone";
      }

      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    // Paroly Hashlemek
    const hashedPassword = await bcrypt.hash(password, 10);
    // Database Täze Ulanyjyny Goşmak
    const newUser = await db.insert(users).values({
      username: normalizedUsername,
      email: normalizedEmail,
      phone: normalizedPhone,
      password: hashedPassword,
      activeSessionId:crypto.randomUUID()
    }).returning();

    const respone = NextResponse.json(
      { success: true, message: "success-message.success-register" },
      { status: 201 }
    );
    
    return (await setAuthCookiesOfResponse(respone, newUser[0]))
    
  } catch (error: any) {
    // Postgres Unique Constraint Violation (23505) - Race Condition Goragy
    if (error?.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          message: "error-message.has-username-email-phone",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "error-message.server-error" },
      { status: 500 }
    );
  }
}
/* 
// TEST
bcrypt.hash('05051991', 10)
.then(hashedPassword=>console.log(hashedPassword))
// $2b$10$Te.ttqX5mvei/zB2SXjb7.5kAIz7y0WFl3O7QXyzRVHmWpnaigCVC */
