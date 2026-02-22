import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-primary font-bold" style={{ fontSize: "clamp(6rem, 20vw, 12rem)", lineHeight: 1 }}>
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-md text-base">{t("description")}</p>
      <nav className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground border px-6 py-2 text-sm font-semibold transition-colors"
        >
          {t("home")}
        </Link>
        <Link
          href="/kontakt"
          className="border-border hover:border-primary hover:text-primary border px-6 py-2 text-sm font-semibold transition-colors"
        >
          {t("contact")}
        </Link>
      </nav>
    </div>
  );
}
