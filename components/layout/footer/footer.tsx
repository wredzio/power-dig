import { getLocale } from "next-intl/server";

import { SanityFooter } from "@/components/cms/sanity-footer";
import { getSettings } from "@/sanity/lib/get-settings";

export async function Footer() {
  const locale = await getLocale();
  const settings = await getSettings(locale);

  if (!settings) {
    return (
      <footer className="bg-secondary text-secondary-foreground p-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return <SanityFooter {...settings} />;
}
