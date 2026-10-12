"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow border text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Töleg Üstünlikli Geçdi!</h1>
      <p className="text-gray-600 text-sm mb-4">
        Siziň sargydyňyz üstünlikli kabul edildi. Töleg ID: <span className="font-mono font-semibold">{orderId}</span>
      </p>
      <Link 
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Baş Sahypa Gaýtmak
      </Link>
    </div>
  );
}