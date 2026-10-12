import { NextResponse } from "next/server";
import { db } from "@/database"; // database baglanşyk ýoluňyz
import { paymenMethods } from "@/database/schemas/payment-methods";
import { eq } from "drizzle-orm";

// 1. Ähli tölleg usullaryny getirmek (GET)
export async function GET() {
  try {
    const methods = await db.select().from(paymenMethods);

    return NextResponse.json(
      {
        success: true,
        data: methods,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment methods GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Tölleg usullaryny alyp bolmady",
      },
      { status: 500 }
    );
  }
}

// 2. Täze tölleg usulyny goşmak (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, logo } = body;

    // Maglumatlaryň barlagy (validation)
    if (!name || !logo) {
      return NextResponse.json(
        {
          success: false,
          message: "Aty (name) we logotipi (logo) girizmek hökmany!",
        },
        { status: 400 }
      );
    }

    // Täze tölleg usulyny bazaha goşmak
    const [newMethod] = await db
      .insert(paymenMethods)
      .values({
        ...(id && { id }), // ID berlen bolsa ulanýar, bolmasa schema-daky UUID awtomatiki döreýär
        name,
        logo,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newMethod,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Payment methods POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Tölleg usulyny goşup bolmady",
      },
      { status: 500 }
    );
  }
}