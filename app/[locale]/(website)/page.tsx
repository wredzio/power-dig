import { setRequestLocale } from "next-intl/server";

import { PowerDigPage } from "@/components/sections/powerdig/powerdig-page";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PowerDigPage />;
}
