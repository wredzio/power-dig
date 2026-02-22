import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { settingsStructure, singletonPlugin } from "./plugins/singleton-plugin";
import { apiVersion, dataset, PREVIEW_MODE_ROUTE, projectId } from "./sanity.api";
import { schemaTypes } from "./schemas";
import { settingsType } from "./schemas/settings";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Core3";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: settingsStructure([settingsType]),
    }),
    presentationTool({
      previewUrl: { previewMode: { enable: PREVIEW_MODE_ROUTE } },
    }),
    singletonPlugin({ types: [] }),
    documentInternationalization({
      supportedLanguages: [
        { id: "pl", title: "Polski" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["page", "settings"],
    }),
    ...(process.env.NODE_ENV !== "production"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
});
