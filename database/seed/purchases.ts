import { db } from "../";
import { purchases, type PurchaseInsert } from "../schemas/purchases";

export async function seedPurchases() {
  console.log("🌱 Satyn alnanlar (Purchases) seed başlandy...");

  // Ähli öňki taýýarlanylan kurs ID-leri
  const courseIds = [
    // Construction
    "autocad-2d-1",
    "autocad-3d-1",
    "3dsmax-modeling-1",
    "3dsmax-rendering-1",
    // Frontend
    "frontend-react-1",
    "frontend-vue-1",
    "frontend-angular-1",
    // Backend
    "backend-django-1",
    "backend-nodejs-1",
    "backend-spring-1",
    // Mobile
    "mobile-rn-1",
    "mobile-flutter-1",
    // Data Science
    "ds-python-1",
    "ds-r-1",
  ];

  // ID: 100 bolan ulanyjy üçin ähli kurslary satyn alnan hökmünde taýýarlamak
  const purchaseData: PurchaseInsert[] = courseIds.map((courseId) => ({
    userId: "100",
    courseId: courseId,
    pricePaid: 10,
    status: "active",
  }));

  await db
    .insert(purchases)
    .values(purchaseData)
    .onConflictDoNothing();

  console.log("✅ Satyn alnanlar seed üstünlikli tamamlandy!");
}