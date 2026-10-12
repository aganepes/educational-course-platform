import { NextResponse } from "next/server";
import { CheckoutFormSchema, BankRegisterResponseSchema } from "@/lib/validations/checkout";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validation
    const validation = CheckoutFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Nädogry maglumatlar" }, { status: 400 });
    }

    const { fullName, contactInfo, address, amount } = validation.data;
    const internalOrderId = `ORD-${Date.now()}`;

    // 2. Bazada sargyt döretmek (Pseudo-code)
    // await db.order.create({ data: { id: internalOrderId, status: 'PENDING', amount, fullName } });

    // 3. Bank Gateway-e Request taýýarlamak
    const bankParams = new URLSearchParams({
      userName: process.env.BANK_MERCHANT_USER!,
      password: process.env.BANK_MERCHANT_PASSWORD!,
      orderNumber: internalOrderId,
      amount: (amount * 100).toString(), // Teňňä öwürmek (150 TMT = 15000)
      currency: "934", // TMT ISO kody
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/callback`,
      failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failed`,
      description: `Sargyt #${internalOrderId} - ${fullName}`,
    });

    // 4. Bank API Request
    const bankRes = await fetch(`${process.env.BANK_GATEWAY_URL}/register.do`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bankParams.toString(),
    });

    const bankData = await bankRes.json();
    const parsedBankRes = BankRegisterResponseSchema.safeParse(bankData);

    if (!parsedBankRes.success || parsedBankRes.data.errorCode !== "0") {
      return NextResponse.json(
        { error: bankData.errorMessage || "Bank bilen baglaşykda ýalňyşlyk" },
        { status: 500 }
      );
    }

    // 5. Bazada bankyň orderId-sini täzelemek
    // await db.order.update({ where: { id: internalOrderId }, data: { bankOrderId: parsedBankRes.data.orderId } });

    return NextResponse.json({ formUrl: parsedBankRes.data.formUrl });
  } catch (error) {
    return NextResponse.json({ error: "Serwer ýalňyşlygy" }, { status: 500 });
  }
}