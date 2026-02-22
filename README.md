# Core3

Minimal forkable core project built with Next.js 16, React 19, Sanity CMS, Tailwind CSS 4, and Storybook 10.

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity project credentials

# Start development server
pnpm dev

# Start Storybook
pnpm storybook
```

## Stack

- **Next.js 16** with Turbopack
- **React 19** (Server Components by default)
- **Sanity CMS** (embedded Studio at `/studio`)
- **Tailwind CSS 4** with PostCSS
- **Storybook 10** with `@storybook/nextjs-vite`
- **Shadcn/UI** components (New York style)

## Project Structure

```
app/             → Next.js routes
components/
  cms/           → Sanity data adapters & registry
  layout/        → Site layout (header, footer, main)
  sections/      → Pure UI sections
  ui/            → Reusable UI components
lib/             → Utilities (cn, Result, assertUnreachable)
sanity/          → Sanity config, schemas, queries
```
