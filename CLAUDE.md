# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Next.js dev server (Turbopack)
pnpm build                # Production build
pnpm lint                 # ESLint (eslint .)
pnpm storybook            # Storybook on port 6006
pnpm build-storybook      # Static Storybook build
pnpm typegen              # Sanity typegen → components/cms/sanity-types.ts
```

## Overview

Minimal forkable core project. Next.js 16 + React 19 + Sanity CMS + Tailwind 4 + Storybook 10. Dark theme default, Inter font, neutral design tokens. Package manager: **pnpm**. Polish used in Sanity schema descriptions.

## Sanity

- **Project ID**: `ifnso4q0`
- **Dataset**: `production`
- **API version**: `2025-08-07`
- **Studio**: `/studio` (outside locale routing)
- **i18n**: `@sanity/document-internationalization` — document-level, `language` field on `page` and `settings`
- **Supported languages**: `pl` (Polski, default), `en` (English)
- **Schemas**: `sanity/schemas/` — `page`, `settings`, 7 section types, `responsiveImage` object
- **Queries**: GROQ with `(language == $language || !defined(language))` fallback for legacy docs
- **Config**: `sanity/sanity.config.ts` — structureTool, presentationTool, documentInternationalization, visionTool (dev only)

### Sanity Schema Types

| Type                | File                                            | Description                                   |
| ------------------- | ----------------------------------------------- | --------------------------------------------- |
| `page`              | `sanity/schemas/pages/page.ts`                  | Pages with sections, slug scoped per language |
| `settings`          | `sanity/schemas/settings.ts`                    | Site settings (per language, not singleton)   |
| `heroSection`       | `sanity/schemas/sections/hero-section.ts`       | Hero with background image                    |
| `aboutSection`      | `sanity/schemas/sections/about-section.ts`      | About with features list                      |
| `faqSection`        | `sanity/schemas/sections/faq-section.ts`        | FAQ accordion                                 |
| `contactSection`    | `sanity/schemas/sections/contact-section.ts`    | Contact form                                  |
| `imageSection`      | `sanity/schemas/sections/image-section.ts`      | Responsive image                              |
| `subheadingSection` | `sanity/schemas/sections/subheading-section.ts` | Subheading with rich text                     |
| `dividerSection`    | `sanity/schemas/sections/divider-section.ts`    | Divider / section separator                   |
| `responsiveImage`   | `sanity/schemas/objects/responsive-image.ts`    | Reusable image object                         |

## i18n (next-intl)

- **Locales**: `pl` (default), `en`
- **Routing**: `[locale]` segment — `/pl/...`, `/en/...`
- **Config files**: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`
- **Messages**: `messages/pl.json`, `messages/en.json`
- **Middleware**: `middleware.ts` — locale detection, excludes `/studio`, `/api`, `/_next`
- **Navigation**: Always use `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/navigation` (not from `next/link` or `next/navigation`)
- **Server components**: Use `setRequestLocale(locale)` for static rendering, `getLocale()` / `getTranslations()` from `next-intl/server`
- **Client components**: Use `useLocale()`, `useTranslations()` from `next-intl`
- **Sanity queries**: Always pass `{ language: locale }` as query param

## Architecture — 4-Layer Component Hierarchy

Every Sanity section flows through these layers:

1. **Route** (`app/[locale]/(website)/page.tsx`, `app/[locale]/(website)/[...slug]/page.tsx`) — fetches data from Sanity via GROQ with locale, passes to `<SanityComponents>`
2. **Registry** (`components/cms/sanity-component.tsx` → `sanity-components.tsx`) — dynamically imports the correct page registry, resolves `_type` to component. Uses `satisfies SanityPageComponents` for type safety
3. **CMS Adapter** (`components/cms/page/components/sanity-*.tsx`) — transforms Sanity data shapes into clean props for presentation components, wraps in `<PageSection>`
4. **Presentation** (`components/sections/*/`) — pure UI with zero CMS dependencies, receives only typed props. Each has a `.stories.tsx` file

### Adding a New Section

1. Create Sanity schema in `sanity/schemas/sections/` and register in `sanity/schemas/index.ts`
2. Add the type to the `sections` array in `sanity/schemas/pages/page.ts`
3. Expand the GROQ query in `sanity/schemas/pages/page.queries.ts`
4. Run `pnpm typegen` to regenerate `components/cms/sanity-types.ts`
5. Create presentation component in `components/sections/` with a story
6. Create CMS adapter in `components/cms/page/components/sanity-*.tsx`
7. Add entry to registry in `components/cms/page/sanity-page.tsx` — TypeScript will enforce completeness via `satisfies SanityPageComponents`

### Type Safety Chain

`PageQueryResult` (from typegen) → `PageSections` (union of all section types) → `PageSectionItem<T>` (extracts single section type) → used as props in each `sanity-*.tsx` adapter. The `satisfies SanityPageComponents` constraint ensures all `_type` values have a matching component.

## Route Structure

```
app/
  layout.tsx                          # Minimal shell (return children, NO html/body)
  robots.ts
  [locale]/
    layout.tsx                        # html/body + Inter font + NextIntlClientProvider
    (website)/
      layout.tsx                      # SiteLayout + generateMetadata(locale)
      page.tsx                        # Homepage (slug="/", locale-scoped)
      [...slug]/page.tsx              # Dynamic pages (locale-scoped)
  (sanity)/
    layout.tsx                        # html/body for Studio (separate from locale)
    studio/[[...index]]/
      page.tsx                        # Sanity Studio entry
      studio.tsx                      # Client component with NextStudio
```

## Image System

Uses `getImageProps` from next/image + native `<picture>`/`<img>` elements (not `<Image>` component). This enables SSR-friendly art direction with Sanity hotspot/crop support.

- **`sanity-image-loader.ts`** — `createSanityLoader(source, aspectRatio?)` returns a Next.js-compatible loader closure that builds Sanity CDN URLs respecting hotspot/crop
- **`sanity-picture.tsx`** — Server Component. Accepts `breakpoints: BreakpointConfig[]`, generates `<picture>` with `<source media="..." srcSet="...">` per breakpoint via separate `getImageProps` calls. Supports LQIP blur via `blurDataURL` from `asset.metadata.lqip`
- **`sanity-image.tsx`** — Simple variant without art direction, single `getImageProps` call

GROQ queries must expand assets: `image{ ..., asset->{ _id, url, metadata { lqip, dimensions } } }`

`@next/next/no-img-element` is disabled for `components/ui/image/` since `<img>` usage is intentional.

## Theme System

Tailwind 4 with `@theme inline` in `app/globals.css`. CSS variables use space-separated RGB triplets (e.g., `--primary: 250 250 250`) wrapped in `rgb()`. Dark is default (`:root`), light is opt-in (`.light` class on `<html>`). Theme toggling uses the View Transitions API (`components/ui/animated-theme-toggler/`).

## Layout

`SiteLayout` is a compound component pattern (`SiteLayout.Header`, `SiteLayout.Main`, `SiteLayout.Footer`). Header is a client component (scroll/menu state). Footer is a server component that fetches settings from Sanity via `getLocale()`.

## Key Files

| File                                                | Purpose                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| `middleware.ts`                                     | next-intl locale routing, excludes /studio /api /\_next                   |
| `i18n/routing.ts`                                   | `defineRouting({ locales, defaultLocale })`                               |
| `i18n/navigation.ts`                                | `Link`, `redirect`, `usePathname`, `useRouter` — use THESE, not next/link |
| `sanity/sanity.client.ts`                           | `getClient()`, `getNavigationData(locale)`                                |
| `sanity/lib/get-settings.ts`                        | `getSettings(locale)`                                                     |
| `sanity/sanity.api.ts`                              | projectId, dataset, apiVersion, studioUrl exports                         |
| `sanity/sanity.config.ts`                           | Studio config with all plugins                                            |
| `sanity/plugins/singleton-plugin.ts`                | Structure + singleton plugin (settings now document list, not singleton)  |
| `components/cms/sanity-types.ts`                    | Auto-generated types (placeholder until `pnpm typegen`)                   |
| `components/ui/locale-switcher/locale-switcher.tsx` | PL↔EN toggle                                                              |
| `lib/utils.ts`                                      | `cn()` — clsx + tailwind-merge                                            |
| `lib/result.ts`                                     | Result<T,E> monad (success/failure)                                       |
| `lib/assert-unreachable.ts`                         | Exhaustiveness check helper                                               |
| `device-sizes.ts`                                   | Image size constants                                                      |

## Conventions

- Server Components by default, `'use client'` only when needed
- `cn()` from `lib/utils.ts` for class merging (clsx + tailwind-merge)
- Kebab-case filenames enforced by ESLint (`check-file` plugin)
- Folder naming follows `NEXT_JS_APP_ROUTER_CASE` (allows `(groups)`, `[params]`, `[[...catch]]`)
- Import sorting enforced by `simple-import-sort`
- Shadcn/UI New York style with Radix UI primitives and CVA
- Prettier with `prettier-plugin-tailwindcss`, printWidth 100, double quotes

## Gotchas

- Root `app/layout.tsx` is a minimal shell (`return children`) — NO `<html>`/`<body>` (both `[locale]` and `(sanity)` layouts provide their own)
- Studio lives at `/studio` OUTSIDE locale routing — middleware matcher excludes it
- GROQ queries ALWAYS need `(language == $language || !defined(language))` — the fallback ensures backward compat with docs created before i18n
- `settings` is NO LONGER a singleton — it's a document-per-language managed by `@sanity/document-internationalization`
- Slug uniqueness is scoped per language (custom `isUnique` in `page.ts`)
- `sanity-types.ts` is a placeholder — run `pnpm typegen` to regenerate from schema
- `.next/types/` can get stale after route changes — `rm -rf .next` fixes phantom TS errors
- ESLint import order: type imports (`import type`) before value imports, sorted alphabetically
- All fetch functions (`getSettings`, `getNavigationData`) require `locale` param (defaults to `"pl"`)
