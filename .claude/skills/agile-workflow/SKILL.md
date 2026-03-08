---
name: agile-workflow
description: Tech startup agile SDLC workflow with TDD. Use this skill when the user asks to "start a new feature", "begin planning", "run agile workflow", "follow SDLC", "start sprint", or wants to go through the full development lifecycle from planning to maintenance.
metadata:
  author: jihyeonjeong
  version: "1.0.0"
  website: https://jihyeonjeong.com
---

# Agile Workflow Skill

## Overview

This skill orchestrates a 7-phase agile SDLC for a tech startup, integrating specialized sub-skills at each phase. TDD is split: Phase 4 writes all failing tests, Phase 5 implements task-by-task to make them pass.

> **Beforehand**: Explain the user what to do first. Don't jump up to next phase but return what did happened first. When a phase is done, save a doc file to its root directory.

> **Beforehand**: Generated md file must be placed at root directory/_docs routing

## Glossary(for only this project!)
- root directory: root app router routing directory means where its page located. `./src/app/practices/<root>`
- root naming: `<use-something>`

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

## Phase 4 — Test Writing (Red Phase)

**Role**: QA Engineer
**Goal**: Write ALL failing tests upfront before any implementation code is written.

**Testing tool**: Currently `playwright` only

> **STRICT RULE**: Do NOT write any implementation code in this phase. Only test files.

Steps:
1. Create `/_e2e` directory under root directory (if not exists)
2. For each task `T` in `tasks.md`, write a failing test derived from `validation.md` ACs:
   - Map each AC → one or more test cases
   - Use descriptive test names that reflect the AC
3. Run all tests → confirm **every test FAILS** (all Red)
4. Show the user the full failing output
5. Output: test file(s) in `/_e2e/`, all in Red state

Tools:
- **E2E**: `playwright-skill` (plugin at `~/.claude/plugins/marketplaces/playwright-skill/skills/playwright-skill`)
  - Setup (first time): `cd $SKILL_DIR && npm run setup`
  - Always run `detectDevServers()` before writing E2E tests
  - Write test scripts to `/tmp/playwright-test-*.js`, never to project
- **Unit/Integration**: Vitest + React Testing Library (when E2E is insufficient)

Rules:
- No implementation code — tests only
- Tests must fail for the right reason (missing feature, not syntax error)
- All tasks in `tasks.md` must have test coverage before proceeding

---

## Phase 5 — Implementation (Green + Refactor, task-by-task)

**Role**: Developer
**Skills**: `vercel-react-best-practices`, `vercel-composition-patterns`, `simplify`
**Goal**: Make each failing test pass, one task at a time.

> **RULE**: Understand the existing codebase before proposing any changes. Ask for approval before adding new
  dependencies.
> **RULE**: Do NOT proceed to the next task until the current task is Green + Refactored and the user confirms.

For each task `T` in `tasks.md` (in order):

```
──────────────────────────────────────────
TASK T: <task title from tasks.md>
──────────────────────────────────────────

[Announce] State which task is starting and which tests it must satisfy.

[Green]
  1. Write the minimum implementation code to pass task T's tests
  2. Apply vercel-react-best-practices and vercel-composition-patterns
  3. Run only task T's tests → confirm PASSES
  4. Run ALL tests → confirm no regressions
  5. Show the user the passing output

[Refactor]
  6. Run `simplify` skill on the new code
  7. Re-run all tests → still green

[Confirm]
  8. "Task T complete ✓. Move to next task? (y/n)"
  9. Wait for user approval before advancing
──────────────────────────────────────────
```

Rules:
- Never write new tests here — only implementation code
- Never skip the [Confirm] step
- If a test can't be made green, surface the blocker to the user before continuing

---

## Phase 6 — Testing & Integration

**Role**: QA + Developer
**Skills**: `playwright-skill` (E2E), `web-design-guidelines` (a11y audit), `simplify` (code review)
**Goal**: Validate the full system against ACs.

**Beforehand**: Respect current codebase. Ask the user if the change is absolutely needed.

Steps:
1. Run the full E2E suite via `playwright-skill` against `validation.md` ACs
2. Run integration tests: component interaction scenarios (Vitest + RTL)
3. Run `web-design-guidelines` for accessibility audit
4. Run `simplify` for final code review
5. Failed tests → feed back to Phase 5
6. Output: test coverage report, audit results

---

## Phase 7 — Feedback & Maintenance

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

| Phase | Role | Skill | Focus |
|-------|------|-------|-------|
| 1. Planning | PM | `product-management` | What & Why |
| 2. Analysis | BA + UX | `product-management` + agent:`ux-researcher` | AC & User Flows |
| 3. Design | Architect | `architecture-skills:specification-architect` | Docs only |
| 4. Test Writing | QA Engineer | `playwright-skill` | **Red** — all tests failing |
| 5. Implementation | Developer | `vercel-react-best-practices`, `vercel-composition-patterns`, `simplify` | **Green → Refactor** per task |
| 6. Testing & Integration | QA + Dev | `playwright-skill`, `web-design-guidelines`, `simplify` | Full suite + a11y |
| 7. Maintenance | PM | `product-management` | Next sprint |

## Usage

When the user specifies a phase, jump directly to that phase.
When no phase is specified, start from Phase 1 and confirm before advancing to the next phase.
Always ask the user to approve phase transition before proceeding.
