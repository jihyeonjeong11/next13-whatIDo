# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Automaker is an autonomous AI development studio built as an npm workspace monorepo. It provides a Kanban-based workflow where AI agents (powered by Claude Agent SDK) implement features in isolated git worktrees.

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