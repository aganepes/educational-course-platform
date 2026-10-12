"use client";

import Link from "next/link";

export default function CheckoutFailedPage() {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow border text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        ✕
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Töleg Amala Aşmady</h1>
      <p className="text-gray-600 text-sm mb-4">
        Töleg wagtynda ýalňyşlyk döredi ýa-da saklandy. Karta serretleriňizi barlap, täzeden synanyşyp bilersiňiz.
      </p>
      <div className="flex space-x-3 justify-center">
        <Link 
          href="/checkout"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          Täzeden Synanyşmak
        </Link>
        <Link 
          href="/"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition text-sm"
        >
          Baş Sahypa
        </Link>
      </div>
    </div>
  );
}