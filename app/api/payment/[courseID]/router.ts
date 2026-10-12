import { NextResponse } from "next/server";
import { db } from "@/database";
import { paymenMethods } from "@/database/schemas/payment-methods";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const method = await db
      .select()
      .from(paymenMethods)
      .where(eq(paymenMethods.id, id))
      .limit(1);

    if (!method.length) {
      return NextResponse.json(
        { success: false, message: "Tölleg usuly tapylmady" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: method[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Serwerde säwlik ýüze çykdy" },
      { status: 500 }
    );
  }
}