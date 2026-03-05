---
name: agile-workflow
description: Tech startup agile SDLC workflow with TDD. Use this skill when the user asks to "start a new feature", "begin planning", "run agile workflow", "follow SDLC", "start sprint", or wants to go through the full development lifecycle from planning to maintenance.
version: 1.0.0
---

# Agile Workflow Skill

## Overview

This skill orchestrates a 6-phase agile SDLC for a tech startup, integrating specialized sub-skills at each phase. TDD is applied in Phase 4 and 5.

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
**Skills**: `product-management` (PRD), `web-design-guidelines` (UX audit)
**Goal**: Define acceptance criteria and user flows.

Steps:
1. Generate a PRD from the roadmap using `product-management`
2. Audit UX flows using `web-design-guidelines`
3. Document user journeys and edge cases
4. Output: `requirements.md` with Acceptance Criteria, user flow diagrams

---

## Phase 3 — Design

**Role**: Architect
**Skill**: `architecture-skills:specification-architect`
**Goal**: Produce traceable architectural documents.

Steps:
1. Run `architecture-skills:specification-architect` with the PRD as input
2. Generate five documents:
   - `blueprint.md` — system scope and data flow
   - `requirements.md` — functional requirements
   - `design.md` — component/API specs
   - `tasks.md` — implementation checklist (Phase 1–N)
   - `validation.md` — requirements-to-tasks traceability matrix
3. Confirm 100% AC coverage before proceeding

---

## Phase 4 — Implementation (TDD)

**Role**: Developer
**Skills**: `vercel-react-best-practices`, `vercel-composition-patterns`, `simplify`
**Goal**: Build features test-first.

TDD Cycle per task in `tasks.md`:
```
Red   → Write a failing test based on the AC
Green → Write the minimum code to pass the test
Refactor → Clean up with `simplify` skill
```

Tools:
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright

Rules:
- Every implementation file must have a corresponding test file
- Tests are derived directly from `validation.md` Acceptance Criteria
- No code is written without a failing test first

---

## Phase 5 — Testing & Integration (TDD)

**Role**: QA + Developer
**Skills**: `web-design-guidelines` (a11y audit), `simplify` (code review)
**Goal**: Validate the full system against ACs.

Steps:
1. Run integration tests: component interaction scenarios
2. Run E2E tests: full user flow via Playwright
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
| 2. Analysis | BA + UX | `product-management`, `web-design-guidelines` | — |
| 3. Design | Architect | `architecture-skills:specification-architect` | — |
| 4. Implementation | Developer | `vercel-react-best-practices`, `simplify` | Red → Green → Refactor |
| 5. Testing | QA + Dev | `web-design-guidelines`, `simplify` | Integration → E2E → Feedback |
| 6. Maintenance | PM | `product-management` | — |

## Usage

When the user specifies a phase, jump directly to that phase.
When no phase is specified, start from Phase 1 and confirm before advancing to the next phase.
Always ask the user to approve phase transition before proceeding.
