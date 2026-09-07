import type { SettingsQueryResult } from "../../components/cms/sanity-types";
import { getClient } from "../sanity.client";
import { settingsQuery } from "../schemas/settings.queries";

export type SiteSettings = NonNullable<SettingsQueryResult>;

export async function getSettings(locale: string = "pl"): Promise<SiteSettings | null> {
  const client = getClient();

  try {
    return await client.fetch(settingsQuery, { language: locale }, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
