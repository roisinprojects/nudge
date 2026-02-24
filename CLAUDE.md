# CLAUDE.md

This file documents the **nudge** repository for AI assistants (Claude Code and similar tools).

## Project Overview

**nudge** is a Hangouts application. The repository was initialized on 2026-02-24 and is in early development — no application code exists yet beyond the README.

## Current Repository State

```
nudge/
├── README.md       # Project title and one-line description
└── CLAUDE.md       # This file
```

The project has a single branch lineage:
- `master` — initial commit, source of truth
- `claude/*` — AI-assisted feature branches (see Branch Conventions below)

## Development Workflow

### Branches

- **`master`** is the main branch.
- AI-assisted work is done on `claude/<task-slug>` branches (e.g. `claude/claude-md-mm11sk6gqgwpk5f4-cC6uc`).
- Never commit directly to `master` from an AI session without explicit permission.
- Push with: `git push -u origin <branch-name>`

### Commit Style

- Use present-tense imperative messages: `Add feature`, `Fix bug`, `Update config`
- Keep the subject line under 72 characters
- Reference issues or task context in the body when relevant

## Key Conventions for AI Assistants

1. **Read before editing.** Always read an existing file before modifying it.
2. **Minimal changes.** Only change what is directly requested; do not refactor surrounding code or add unrequested features.
3. **No speculative files.** Do not create documentation, config files, or helpers that aren't needed yet.
4. **Security.** Avoid introducing OWASP Top 10 vulnerabilities (XSS, SQL injection, command injection, etc.).
5. **No time estimates.** Do not predict or promise delivery timelines.

## Building and Testing

No build system, test runner, or package manager has been configured yet. Update this section once the tech stack is decided and tooling is in place. Typical sections to add:

```markdown
### Install dependencies
<command here>

### Run tests
<command here>

### Lint / type-check
<command here>

### Start dev server
<command here>
```

## Tech Stack

To be determined. Update this section as the stack is chosen (language, framework, database, hosting, etc.).

## Notes

- Owner: roisinprojects (benson.roisin@gmail.com)
- This file should be kept up to date as the project evolves.
