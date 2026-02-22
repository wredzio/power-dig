import "../globals.css";

import type { Metadata } from "next";
import { Heebo, Lato } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { CookieBanner } from "@/components/ui/cookie-banner/cookie-banner";
import { routing } from "@/i18n/routing";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PowerDig Serwis — Daniel Głogowski",
    template: "%s | PowerDig Serwis",
  },
  description:
    "PowerDig Serwis — instalacje elektryczne, serwis AGD, monitoring, smart home, usługi minikoparką. Tel: 795-704-504",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pl" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${lato.variable} ${heebo.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
