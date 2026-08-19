---
name: semantic-memory
description: Provider-neutral policy for using Supermemory or another semantic-memory system as an advisory index over historical project knowledge.
---

# Semantic Memory

Supermemory is the first reference provider: https://github.com/supermemoryai/supermemory

> **Memory tells you where to look. The repository tells you what is true.**

Use semantic memory for prior architecture decisions, regressions, analogous fixes, rejected approaches, and durable cross-session/project lessons.

Do not use it for current branch/SHA, working-tree state, current source implementation, active ticket/ownership state, live test/build results, or exact acceptance criteria. Read those live.

## Retrieval workflow

```text
current problem
    ↓
narrow semantic query
    ↓
small candidate result set
    ↓
inspect provenance/source
    ↓
read current canonical artifact
    ↓
verify still valid
    ↓
use
```

Prefer a few highly relevant results over broad profile/memory injection.

## Provenance

Prefer results carrying project/repository, source path, ticket/commit locator, source revision, observation time, scope, and supersession information.

A recalled summary never gains more authority than its source.

## Stale/conflicting memory

Current canonical project state wins immediately. Treat contradictions as a reason to inspect canonical sources, not to average memories.

## What to remember

Prefer accepted architecture decisions, important regression causes, recurring traps, compatibility constraints, significant QA/review findings, and reusable lessons.

Avoid routine progress, every command, temporary hypotheses, duplicate ticket text, secrets/credentials, and raw conversational chatter.

## Cross-project recall

Label cross-project results as analogies. Do not import project-specific assumptions without local verification.

## Failure semantics

If memory is absent, unavailable, malformed, stale, or lacks provenance, continue with normal repository/history search. Never block work because semantic memory is unavailable.
