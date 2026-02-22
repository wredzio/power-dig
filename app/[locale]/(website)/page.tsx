import { setRequestLocale } from "next-intl/server";

import { SanityComponents } from "@/components/cms/sanity-components";
import type { PageQueryResult } from "@/components/cms/sanity-types";
import { getClient } from "@/sanity/sanity.client";
import { pageQuery } from "@/sanity/schemas/pages/page.queries";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    const client = getClient();
    const page = await client.fetch<PageQueryResult>(pageQuery, {
      slug: "/",
      language: locale,
    });

    if (!page?.sections) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Core3</h1>
            <p className="text-muted-foreground mt-4">
              Configure your Sanity project and create a page with slug &quot;/&quot; to get
              started.
            </p>
          </div>
        </div>
      );
    }

    return <SanityComponents pageType="page" sanityComponentsData={page.sections} />;
  } catch {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Core3</h1>
          <p className="text-muted-foreground mt-4">
            Set up your Sanity environment variables in .env.local to connect your CMS.
          </p>
        </div>
      </div>
    );
  }
}
