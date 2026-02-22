# WordPress → Core3 Migration

Migrate a WordPress site to core3 (Next.js + Sanity CMS).

**Input:** `$ARGUMENTS` — the WordPress site URL to migrate (e.g., `https://restauracja-example.pl`)

## Instructions

You are the orchestrator for a 6-phase WordPress → core3 migration analysis. Execute each phase sequentially using the designated subagent. Each subagent writes its output file — your job is to chain them in order and pass context.

### Step 0: Setup

1. Extract `<site-name>` from the URL by taking the hostname, stripping `www.`, and replacing dots with hyphens (e.g., `restauracja-example-pl`)
2. Create the output directory: `docs/migration/<site-name>/`
3. Create the `docs/migration/<site-name>/assets/` subdirectory

### Step 1: Site Reconnaissance → `wp-scout`

Delegate to the **wp-scout** subagent:

> Analyze the WordPress site at `$ARGUMENTS`. Write your output to `docs/migration/<site-name>/01-scout.md`.

Wait for completion before proceeding.

### Step 2: Visual Analysis → `wp-designer`

Delegate to the **wp-designer** subagent:

> Analyze the visual design of `$ARGUMENTS`. Read `docs/migration/<site-name>/01-scout.md` for page context. Save screenshots to `docs/migration/<site-name>/assets/`. Write your output to `docs/migration/<site-name>/02-designer.md`.

Wait for completion before proceeding.

### Step 3: Component Mapping → `wp-architect`

Delegate to the **wp-architect** subagent:

> Map WordPress UI patterns from `$ARGUMENTS` to core3 components. Read `docs/migration/<site-name>/01-scout.md` and `docs/migration/<site-name>/02-designer.md` for context. Write your output to `docs/migration/<site-name>/03-architect.md`.

Wait for completion before proceeding.

### Step 4: Content Extraction → `wp-content`

Delegate to the **wp-content** subagent:

> Extract content from `$ARGUMENTS` for Sanity CMS migration. Read `docs/migration/<site-name>/01-scout.md` and `docs/migration/<site-name>/03-architect.md` for context. Write your output to `docs/migration/<site-name>/04-content.md`.

Wait for completion before proceeding.

### Step 5: Implementation Plan → `wp-implementor`

Delegate to the **wp-implementor** subagent:

> Create an implementation plan (PRD) for migrating `$ARGUMENTS` to core3. Read all previous outputs in `docs/migration/<site-name>/` (01 through 04). Write your output to `docs/migration/<site-name>/05-plan.json`.

Wait for completion before proceeding.

### Step 6: Review & Summary → `wp-reviewer`

Delegate to the **wp-reviewer** subagent:

> Review all migration analysis outputs for `$ARGUMENTS` in `docs/migration/<site-name>/`. Cross-reference completeness and consistency. Write your output to `docs/migration/<site-name>/00-overview.md`.

### Step 7: Final Summary

After all phases complete, display a summary:

- List all generated files with their sizes
- Show the page count and section type counts from `00-overview.md`
- Note any risk areas or warnings flagged by the reviewer
