import { db } from "../";
import { paymenMethods, type PaymentMethodsInsert } from "../schemas/payment-methods";

export async function seedPaymentMethods() {
  console.log("🌱 Tölleg usullary (Payment Methods) seed başlandy...");

  const paymentMethodsData = [
    {
      id: "altyn_asyr",
      name: {
        tm: "Altyn Asyr",
        ru: "Алтын Асыр",
        en: "Altyn Asyr",
      },
      logo: "/images/cards/altyn-asyr.png",
    },
    {
      id: "senagaty_bank",
      name: {
        tm: "Senagaty Bank",
        ru: "Сенагат Банк",
        en: "Senagaty Bank",
      },
      logo: "/images/cards/senagat.png",
    },
    {
      id: "rysgal_bank",
      name: {
        tm: "Rysgal Bank",
        ru: "Rysgal Bank",
        en: "Rysgal Bank",
      },
      logo: "/images/cards/rysgal.png",
    },
    {
      id: "tfeb",
      name: {
        tm: "TDB (Daşary Ykdysady)",
        ru: "Внешэкономбанк (TDB)",
        en: "State Bank for Foreign Economic Affairs (TDB)",
      },
      logo: "/images/cards/tdb.png",
    },
  ];

  const recordsToInsert: PaymentMethodsInsert[] = paymentMethodsData.map((data) => ({
    id: data.id,
    name: data.name,
    logo: data.logo,
  }));

  await db
    .insert(paymenMethods)
    .values(recordsToInsert)
    .onConflictDoNothing({ target: paymenMethods.id });

  console.log("✅ Tölleg usullary seed üstünlikli tamamlandy!");
}