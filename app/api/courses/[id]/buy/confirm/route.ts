import { NextResponse } from "next/server";
import { BankStatusResponseSchema } from "@/lib/validations/checkout";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bankOrderId = searchParams.get("orderId");

  if (!bankOrderId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`);
  }

  try {
    // 1. Bankdan statusy soramak
    const statusParams = new URLSearchParams({
      userName: process.env.BANK_MERCHANT_USER!,
      password: process.env.BANK_MERCHANT_PASSWORD!,
      orderId: bankOrderId,
    });

    const bankRes = await fetch(`${process.env.BANK_GATEWAY_URL}/getOrderStatusHTTP.do`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: statusParams.toString(),
    });

    const bankData = await bankRes.json();
    const parsedStatus = BankStatusResponseSchema.safeParse(bankData);

    // 2. Status Barlagy (orderStatus === 2 diňe üstünlikli töleg)
    if (parsedStatus.success && parsedStatus.data.orderStatus === 2) {
      // Bazada sargydy PAID diýip üýtgetmek
      // await db.order.update({ where: { bankOrderId }, data: { status: 'PAID' } });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${bankOrderId}`);
    } else {
      // Bazada statusy FAILED etmek
      // await db.order.update({ where: { bankOrderId }, data: { status: 'FAILED' } });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`);
    }
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`);
  }
}