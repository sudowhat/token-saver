---
name: code-intelligence
description: Optional provider-neutral structural source-code retrieval. jCodeMunch is the first reference provider.
---

# Code Intelligence

First reference provider: https://github.com/jgravelle/jcodemunch-mcp

> **Index broadly enough to navigate; retrieve narrowly enough to reason; verify live source before changing it.**

Use this layer for current-source questions such as symbol lookup, exact function/class retrieval, outlines, callers/callees, importers, implementations/inheritance, blast radius, changed-symbol mapping, dependency/coupling analysis, hotspots, and code-oriented task context.

Do not use it for historical decisions, build/test/log output, general documents/RAG, live Git/gate state, or authoritative project protocol/ticket/architecture instructions.

## Freshness and coverage

Treat indexed results conceptually as:
- `FRESH_LOCATOR` — good for navigation;
- `FRESH_SOURCE` — useful source for a known indexed revision;
- `STALE_LOCATOR` — locator only, verify live;
- `INCOMPLETE` — cannot support absence/safety conclusions;
- `UNUSABLE` — missing trustworthy provenance/freshness.

Stale results may locate code but cannot prove current absence, callers, impact, or safety. Skipped/withheld files prevent complete absence claims. If freshness/coverage is insufficient, fall back to native targeted search/read.

## Exact-source rule

```text
symbol/structural query
    ↓
identify exact file/symbol/range
    ↓
retrieve narrow indexed source if useful
    ↓
edit/review/correctness depends on current exact bytes?
    yes -> exact-read current live source/range
```

The index reduces where/how much to read; it does not weaken the evidence standard.

## One layer per surface

Do not feed jCodeMunch source/context into Entroly merely to shrink it further. Do not run code-intelligence output through RTK. Do not use optional jCodeMunch memory features as the historical-memory layer.

## C/C++ note

For large C/C++ repositories, structural indexing can add substantial value over grep alone. If SCIP/clang-derived reference data already exists and the provider can import it, it may strengthen caller/reference/implementation analysis. Compiler-derived evidence still applies to the indexed revision and does not replace live-source freshness checks.

## Large-repo policy

Before relying on absence/impact results, verify indexed directories/languages/files, provider file-count/file-size limits, ignored/excluded/withheld files, and index revision/freshness. Prefer module-scoped indexes when full-monorepo indexing is operationally expensive.

Do not hard-code upstream provider limits; inspect the installed version.

## Security and licensing

A code index/cache is another source-derived copy of the repository and should be protected accordingly. Review storage, permissions, backups, secret exclusions, telemetry, watchers and hooks.

For jCodeMunch, upstream currently documents local index/cache state under `~/.code-index/` by default.

Verify current upstream licensing before use. At the time this pack was authored, jCodeMunch used a dual-use license requiring commercial licensing for for-profit/company use.

## Failure semantics

If the provider is unavailable, stale, incomplete, unlicensed, or unsupported, use native targeted search followed by an exact narrow source read. Never block work.
