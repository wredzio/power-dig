import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl, useCdn } from "./sanity.api";
import { navigationQuery } from "./schemas/settings.queries";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
    stega: { enabled: !!preview?.token, studioUrl },
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "drafts",
    });
  }
  return client;
}

export async function getNavigationData(locale: string = "pl") {
  try {
    const client = getClient();
    return await client.fetch(
      navigationQuery,
      { language: locale },
      { next: { revalidate: 3600 } },
    );
  } catch {
    return null;
  }
}
