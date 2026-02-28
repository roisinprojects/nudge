# CLAUDE.md

This file documents the **Nudge** repository for AI assistants (Claude Code and similar tools).

---

## Project Overview

**Nudge** is a mobile web app that removes friend group coordination friction by automating regular hangout scheduling. Every 6 weeks it nudges a group, collects individual availability, uses AI to find overlapping times, surfaces venue options via OpenTable, and handles booking logistics.

**Core insight:** Remove the organiser burden from one person. Make hanging out a scheduled, low-friction habit.

**Target user:** Busy adults (especially parents) who value friendships but struggle with scheduling overhead.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (mobile-first) |
| Styling | Custom CSS design system (dark mode only) |
| State | Local state / mock data (prototype phase — no backend yet) |
| Backend | Planned (not yet built): Node/Express or similar, database, auth, scheduling, OpenTable API, email/calendar |

### Prototype Scope (Current Phase)

- **Frontend only** — interactive UI with hardcoded/mock data
- No real auth (fake login/signup)
- No database
- No real availability matching (hardcoded results)
- No real OpenTable integration (mock venue data)
- No real notifications (manual trigger for testing)

---

## Repository Structure

```
nudge/
├── README.md                  # One-line project description
├── CLAUDE.md                  # This file
└── Nudge_Project_Brief.md     # Full product spec and design system
```

Source code directories will be added as development progresses. Update this section as the project grows.

---

## Design System

### Viewport

- **Mobile frame:** 390px × 844px (iPhone 14/15)
- **Always design mobile-first**; dark mode only (no light mode for MVP)

### Colours (Dark Mode)

| Role | Hex |
|---|---|
| Background | `#0F0F0F` |
| Surface | `#1A1A1A` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#CCCCCC` |
| Coral / Primary CTA | `#E85D4D` |
| Mauve / Secondary | `#A88FA0` |
| Taupe / Tertiary | `#8B8680` |
| Success | `#6BB6A0` |
| Warning | `#D4A574` |
| Error | `#C85C3C` |
| Disabled | `#444444` |

### Typography

- **Font stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Logo:** Poppins Bold, 40px, `#E85D4D`
- **Tagline:** Poppins Regular, 16px, `#CCCCCC`
- **Headings:** 24–32px, weight 600
- **Body:** 16px, weight 400
- **Buttons:** 16px, weight 600

### Layout & Spacing

- **Grid:** 4 columns, 16px margins, 12px gutters
- **Spacing scale (8px baseline):** 8, 16, 24, 32, 40, 48px
- **Button height:** 48px; full-width 358px; half-width 173px
- **Corner radius:** 8px (buttons, cards, inputs)

### Component States

Always implement all states: Default, Hover, Active, Disabled, Loading, Error, Success.

---

## Application Flows

### The 6-Week Cycle

1. **Idle (weeks 1–6):** App is quiet; optional calendar sync runs in background.
2. **Nudge sent (week 6):** Push notification + email to the whole group.
3. **Response window (48 hrs):** Each member picks 3 date/time slots (Fri/Sat/Sun only) and 2 activity preferences. Responses are hidden from others.
4. **Matching:** AI finds overlapping availability + majority activity preference; searches OpenTable for 3 venues; randomly assigns a booker.
5. **Results:** Group sees matched date/time/activity; booker sees 3 venue options with OpenTable links.
6. **Booking:** Booker completes reservation on OpenTable, returns to app, confirms; app sends calendar invites with venue details to everyone.
7. **Post-hangout (optional):** Rate the hangout, view history.

### Key User Flows

| Flow | Entry point |
|---|---|
| Onboarding (new user) | Sign up → create group → invite friends |
| Invited user | Email link → sign up/login → join group |
| Response (every 6 weeks) | Notification → select 3 dates + times + 2 activities → lock in |
| Matching & results | 48 hr deadline → loading → results → venue selection → booking |
| Home screen (idle) | Lists all groups, next reminder countdown, last hangout date |

---

## Wireframe Status

**Completed:**
- Sign up, secure account (password), create group, invite friends
- Home screen (your groups)
- Invited user flow

**Still needed:**
- Reminder notification / "Respond now" prompt
- Response form: calendar picker, time-of-day selection, activity preferences
- Response submitted confirmation
- Waiting for others screen (with countdown, who's responded)
- Loading / AI matching state
- Results screen (date + time + activity + 3 venue options)
- Venue details / booking confirmation
- Calendar invite screen
- Group history / home screen detail view
- Error states: no overlap found, no venues found, booking failed

---

## Development Priorities

Build in this order (core loop first):

1. Response form screens (calendar picker, time selection, activity preferences)
2. Results / matching screen
3. Venue search results screen
4. Mock OpenTable data integration
5. Error states and edge cases
6. End-to-end user flow test
7. Backend planning (auth, database, scheduling, real notifications, real OpenTable)

---

## Success Criteria (MVP)

1. User can sign up and create a group
2. User can invite friends and see them in the group
3. User can respond to a reminder with availability & preferences
4. System matches availability and shows results
5. User can see 3 venue options and click through to OpenTable
6. System generates and shows a calendar invite
7. User flow feels smooth and native on mobile

---

## Brand Voice

- **Friendly** — conversational, warm, approachable
- **Direct** — clear CTAs, no ambiguity
- **Playful** — subtle humour, social energy
- **Modern** — clean, no clutter
- **Empowering** — removes friction, makes hangouts effortless

---

## Conventions for AI Assistants

1. **Read before editing.** Always read an existing file in full before modifying it.
2. **Mobile-first.** All UI work targets the 390px × 844px mobile frame. Dark mode only.
3. **Use the design system.** All colours, spacing, typography, and corner radii must match the specs above — do not introduce new values.
4. **Implement all component states.** Default, Hover, Active, Disabled, Loading, Error, Success.
5. **Prototype constraints.** Do not wire up real APIs, real auth, or a real database until explicitly instructed. Use mock/hardcoded data.
6. **Minimal changes.** Only change what is directly requested; do not refactor surrounding code or add unrequested features.
7. **No speculative files.** Do not create config files, helpers, or documentation that aren't needed yet.
8. **Security.** Avoid OWASP Top 10 vulnerabilities (XSS, injection, etc.) even in prototype code.
9. **No time estimates.** Focus on what needs to be done, not how long it will take.

## Git Conventions

- **Main branch:** `master` (or `main` — confirm with owner)
- **AI feature branches:** `claude/<task-slug>` — never push directly to the main branch without permission
- **Push command:** `git push -u origin <branch-name>`
- **Commit style:** Present-tense imperative (`Add feature`, `Fix bug`, `Update config`), subject line ≤ 72 characters

---

## Key Reference Files

| File | Purpose |
|---|---|
| `Nudge_Project_Brief.md` | Full product spec, wireframe descriptions, feature rationale |
| `Nudge_UI_Design_System.md` | **Source of truth for all UI decisions** — tokens, typography, spacing, components, accessibility |

Read both before making product or UX decisions. `Nudge_UI_Design_System.md` overrides any design values in this file.

### Design System Quick Reference

- **Text primary:** `#E5E5E5` — NEVER use pure `#FFFFFF`
- **Borders:** `1px solid rgba(255,255,255,0.06)` (default) / `rgba(255,255,255,0.10)` (strong)
- **Spacing:** 8pt grid — valid values: 4, 8, 12, 16, 24, 32, 40, 48, 64px
- **Buttons:** hover = background-color change (not opacity), all 6 states required
- **Semantic alerts:** use `--color-{success|warning|error|info}-{bg|border|text}` tokens
- **Radius:** `--radius-md` (6px) for inputs/buttons, `--radius-lg` (8px) for cards, `--radius-xl` (12px) for modals
