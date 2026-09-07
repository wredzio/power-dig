import { getTranslations } from "next-intl/server";

/** Shown on the homepage when Sanity has no page with slug "/" yet. */
export async function SetupNotice() {
  const t = await getTranslations("page");
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <h1 className="mb-4 text-3xl font-black uppercase">{t("setupTitle")}</h1>
        <p className="text-muted-foreground">{t("setupDescription")}</p>
      </div>
    </section>
  );
}
