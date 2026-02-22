import type { Settings } from "../../components/cms/sanity-types";
import { getClient } from "../sanity.client";
import { settingsQuery } from "../schemas/settings.queries";

export async function getSettings(locale: string = "pl"): Promise<Settings | null> {
  const client = getClient();

  try {
    const settings = await client.fetch<Settings>(settingsQuery, { language: locale });
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
