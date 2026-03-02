# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL MANDATORY RULES - READ FIRST

## CRITICAL: NO MOCK DATA/ no fall back POLICY
## CRITICAL RULES - READ FIRST

1. **ALWAYS read CLAUDE.md** at before ANY work
2. **ALWAYS search files in the codebase** EVERY SINGLE TIME before proceeding
3. **ALWAYS follow the workflow**: ANALYZE → REUSE → VALIDATE → INTEGRATE
4. **ALWAYS follow**: Research → Plan → Implement (NEVER jump to coding)

## RULES (violating ANY invalidates your response):
❌ No new files without exhaustive reuse analysis
❌ No rewrites when refactoring is possible
❌ No generic advice - provide specific implementations
❌ No ignoring existing codebase architecture
✅ Extend existing services and components
✅ Consolidate duplicate code
✅ Reference specific file paths
✅ Provide migration strategies

## Project Overview

JIHYEONJEONG.com is a public portfolio project. Powered by Nextjs and Fumadocs, This projects handles my professional Info and Blog posts using mordern design style in MDX format.

## Common Commands

```bash
# Development
yarn dev                    # Next.js dev server

# Building
yarn build                  # Next.js build
yarn start                  # Production server start

# Docker
yarn docker:dev:build       # Dev env docker build
yarn docker:dev             # Dev env docker dev

# Type checking
yarn type:check             # TypeScript type check (tsc --noEmit)
yarn types:check            # fumadocs-mdx + next typegen + tsc

# Linting and formatting
yarn biome:check            # Biome lint check
yarn biome:format           # Biome format
```

## Architecture

### Routes

- `(main)/` — Landing page (portfolio: about, skills, projects, experiences)
- `docs/[[...slug]]/` — MDX documentation site powered by Fumadocs
- `practices/` — Self-contained demo pages, each exploring a specific React/Next.js concept
- `api/search/` — Fumadocs full-text search endpoint

### Key Directories

- `src/app/_components/` — Shared components (Header, Footer, sections, UI primitives)
- `src/libs/` — Global hooks, contexts, constants, and Fumadocs config
- `content/docs/` — MDX content files for the docs site

### Key Technologies

- **Framework**: Next.js (App Router), React 19
- **Styling**: Tailwind CSS 4, Styled Components, SASS
- **Docs**: Fumadocs (MDX)
- **Animation**: Motion, Vanta.js
- **Data fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Graphics**: Canvas API, Three.js, react-force-graph-2d, D3 Force

### Path Aliases

```
@/*     → ./src/*
```

