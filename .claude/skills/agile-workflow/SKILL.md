---
name: agile-workflow
description: Tech startup agile SDLC workflow with TDD. Use this skill when the user asks to "start a new feature", "begin planning", "run agile workflow", "follow SDLC", "start sprint", or wants to go through the full development lifecycle from planning to maintenance.
version: 1.0.0
---

# Agile Workflow Skill

## Overview

This skill orchestrates a 6-phase agile SDLC for a tech startup, integrating specialized sub-skills at each phase. TDD is applied in Phase 4 and 5.

> **For Future improvements - For myself!!!**: Implement monorepo structure for each practices.

> **Beforehand**: Explain the user what to do first. Don't jump up to next phase but return what did happened first. When a phase is done, save a doc file to its root directory.

> **Beforehand**: Generated md file must be placed at root directory/_docs routing

## Glossary
- root directory: root app router routing directory means where its page located. `./src/app/practices/<root>`
- root naming: `use-anything`

---

## Phase 1 — Planning

**Role**: PM
**Skill**: `product-management`
**Goal**: Define what to build and why.

Steps:
1. Run the `product-management` skill to analyze the feature request
2. Produce prioritized feature list using the WINNING filter
3. Create a roadmap and GitHub Issues
4. Output: `roadmap.md`, GitHub Issues

---

## Phase 2 — Analysis

**Role**: Business Analyst + UX Researcher
**Skills**: `product-management` (PRD)
**Agents**: `ux-researcher` (UX audit — `~/.claude/agents/ux-researcher.md`)
**Goal**: Define acceptance criteria and user flows.

Steps:
1. Generate a PRD from the roadmap using `product-management`
2. Audit UX flows using `ux-researcher` agent
3. Document user journeys and edge cases
4. Output: `requirements.md` with Acceptance Criteria, user flow diagrams

---

## Phase 3 — Design

**Role**: Architect
**Skill**: `architecture-skills:specification-architect`
**Goal**: Produce traceable architectural documents.

> **STRICT RULE**: Phase 3 outputs are DOCUMENTS ONLY. Do NOT create any source code files (`.ts`, `.tsx`, `.js`, `.css`, etc.). No component scaffolding, no schema files, no type files. Only markdown documents.

Steps:
1. Run `architecture-skills:specification-architect` with the PRD as input
2. Generate documents (always required):
   - `blueprint.md` — system scope and data flow
   - `design.md` — component/API specs (pseudocode and interfaces only, no runnable code)
   - `tasks.md` — implementation checklist (Phase 1–N)
3. Generate conditionally:
   - `validation.md` — AC-to-task traceability matrix. **Only when the task has explicit Acceptance Criteria** (e.g. forms, multi-step flows, data validation features). Skip for UI demos, refactoring, or exploratory tasks.
4. Confirm all required docs are complete before proceeding

---

## Phase 4 — Implementation (TDD)

**Role**: Developer
**Skills**: `vercel-react-best-practices`, `vercel-composition-patterns`, `simplify`
**Goal**: Build features test-first.

**Testing tool**: Currently `playwright` only

Steps:
1. Create /_e2e directory from root directory
2. Fill failing tests based on the AC
3. Not determined yet.

TDD Cycle per task in `tasks.md`:
```
Red   → Write a failing test based on the AC
Green → Write the minimum code to pass the test
Refactor → Clean up with `simplify` skill
```

Tools:
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: `playwright-skill` (plugin at `~/.claude/plugins/marketplaces/playwright-skill/skills/playwright-skill`)
  - Setup (first time): `cd $SKILL_DIR && npm run setup`
  - Always run `detectDevServers()` before writing E2E tests
  - Write test scripts to `/tmp/playwright-test-*.js`, never to project

Rules:
- Every implementation file must have a corresponding test file
- Tests are derived directly from `validation.md` Acceptance Criteria
- No code is written without a failing test first

---

## Phase 5 — Testing & Integration (TDD)

**Role**: QA + Developer
**Skills**: `playwright-skill` (E2E), `web-design-guidelines` (a11y audit), `simplify` (code review)
**Goal**: Validate the full system against ACs.

Steps:
1. Run integration tests: component interaction scenarios (Vitest + RTL)
2. Run E2E tests via `playwright-skill`: full user flow validation against `validation.md` ACs
3. Run `web-design-guidelines` for accessibility audit
4. Run `simplify` for final code review
5. Failed tests → feed back to Phase 4
6. Output: test coverage report, audit results

---

## Phase 6 — Feedback & Maintenance

**Role**: PM
**Skill**: `product-management`
**Goal**: Capture feedback and plan next sprint.

Steps:
1. Collect user/stakeholder feedback
2. Triage issues and new feature requests via `product-management`
3. Update GitHub Issues and backlog
4. Prioritize next sprint using WINNING filter
5. Output: updated roadmap, next sprint scope

---

## Workflow Summary

| Phase | Role | Skill | TDD |
|-------|------|-------|-----|
| 1. Planning | PM | `product-management` | — |
| 2. Analysis | BA + UX | `product-management` + agent:`ux-researcher` | — |
| 3. Design | Architect | `architecture-skills:specification-architect` | — |
| 4. Implementation | Developer | `vercel-react-best-practices`, `vercel-composition-patterns`, `simplify`, `playwright-skill` | Red → Green → Refactor |
| 5. Testing | QA + Dev | `playwright-skill`, `web-design-guidelines`, `simplify` | Integration → E2E → Feedback |
| 6. Maintenance | PM | `product-management` | — |

## Usage

When the user specifies a phase, jump directly to that phase.
When no phase is specified, start from Phase 1 and confirm before advancing to the next phase.
Always ask the user to approve phase transition before proceeding.
