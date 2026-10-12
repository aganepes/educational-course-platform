import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { PaymentMethodsSelect } from "@/database/schemas";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "course.meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale,
      type: "website",
    },
  };
}

interface CardSelectProps {
  onSelect?: (cardId: string) => void;
}

export const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.ok
      ? (res.json() as Promise<{
          data: PaymentMethodsSelect[] | null;
          success: boolean;
        }>)
      : null,
  );

export default function CardSelect({ onSelect }: CardSelectProps) {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const { data, error } = useSWR("/api/payment/cards", fetcher);
  const paymentMethods = data?.data ?? null;

  const locale = useLocale() as "tm" | "ru" | "en";
  const t = useTranslations("course-buy");

  const handleSelect = (bankId: string) => {
    setSelectedBank(bankId);
    onSelect?.(bankId);
  };

  const handleNext = () => {
    if (!selectedBank) return;

    router.push(`/payment?card=${selectedBank}`);
  };

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <label className="block text-lg font-medium text-gray-400 mb-3">
        {t("title")}
      </label>

      <div className="grid grid-cols-2 gap-3">
        {paymentMethods?.map((bank) => {
          const isSelected = selectedBank === bank.id;

          return (
            <div
              key={bank.id}
              onClick={() => handleSelect(bank.id)}
              className={`relative overflow-hidden h-30 flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 bg-white ${
                isSelected
                  ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {/* Radio */}
              <div className="absolute top-2 right-2 z-10">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={bank.id}
                  checked={isSelected}
                  onChange={() => handleSelect(bank.id)}
                  className="h-4 w-4 text-blue-600 cursor-pointer"
                />
              </div>

              {/* Logo */}
              <Image
                src={bank.logo}
                alt={bank.name[locale]}
                fill
                className="w-[150%]"
              />

              {/* Name */}
              <span
                className={`text-xs font-semibold text-center absolute bottom-0 z-10 ${
                  isSelected ? "text-blue-900" : "text-gray-900"
                }`}
              >
                {bank.name[locale]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!selectedBank}
        className="w-full mt-5 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Indiki
      </button>
    </div>
  );
}
