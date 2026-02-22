# Sanity Content Management

Manage Sanity CMS content via API using `scripts/sanity-admin.ts`.

## How to use

Write inline `npx tsx` scripts that import from `./scripts/sanity-admin.ts`. Run them from the project root.

**Template:**

```bash
cd /Users/wojciech/Documents/project2026/core3 && npx tsx <<'SCRIPT'
import { listDocuments, createPage, createSettings, patchDocument, deleteDocument, sections, linkTranslations, query, log } from "./scripts/sanity-admin.ts";

// ... your operations here

SCRIPT
```

## Common operations

### List all pages

```typescript
const pages = await listDocuments("page");
log("Pages", pages);
```

### List pages for a language

```typescript
const plPages = await listDocuments("page", "pl");
log("PL Pages", plPages);
```

### Create a page with sections

```typescript
const page = await createPage({
  title: "O nas",
  slug: "o-nas",
  language: "pl",
  sections: [
    sections.hero({ heading: "O nas", subheading: "Poznaj naszą firmę" }),
    sections.about({
      heading: "Kim jesteśmy",
      features: [
        { title: "Doświadczenie", description: "10 lat na rynku" },
        { title: "Jakość", description: "Najwyższe standardy" },
      ],
    }),
    sections.faq({
      heading: "FAQ",
      items: [{ question: "Jak działa?", answer: "Bardzo prosto." }],
    }),
    sections.contact({ heading: "Kontakt" }),
  ],
});
log("Created page", page);
```

### Create settings for a language

```typescript
const settings = await createSettings({
  language: "pl",
  title: "Core3",
  description: "Minimal forkable core project",
  url: "https://example.com",
  phone: "+48 123 456 789",
  mail: "kontakt@example.com",
  address: "ul. Przykładowa 1, Warszawa",
  keywords: ["core3", "next.js", "sanity"],
  navigation: [
    { label: "Strona główna", href: "/", order: 1 },
    { label: "O nas", href: "/o-nas", order: 2 },
    { label: "Kontakt", href: "#kontakt", order: 3 },
  ],
  social: [
    { media: "Facebook", url: "https://facebook.com/example" },
    { media: "Instagram", url: "https://instagram.com/example" },
  ],
});
log("Created settings", settings);
```

### Link translations

```typescript
await linkTranslations({ pl: "page-pl-id", en: "page-en-id" });
```

### Update a document

```typescript
await patchDocument("document-id", { title: "Nowy tytuł" });
```

### Delete a document

```typescript
await deleteDocument("document-id");
```

### Run any GROQ query

```typescript
const result = await query('*[_type == "page"]{ _id, title, language }');
log("Result", result);
```

## Available section builders

- `sections.hero({ heading, subheading?, ctaText?, ctaHref? })`
- `sections.about({ heading, description?, features?: [{ title, description }] })`
- `sections.faq({ heading, items: [{ question, answer }] })`
- `sections.contact({ heading, description? })`
- `sections.subheading({ heading, body? })`

## Requirements

- `SANITY_API_WRITE_TOKEN` must be set in `.env.local` (Editor or Admin role token)
