---
name: code-intelligence
description: Optional provider-neutral structural source-code retrieval. jCodeMunch is the first reference provider.
---

# Code Intelligence

First reference provider: https://github.com/jgravelle/jcodemunch-mcp

> **Index broadly enough to navigate; retrieve narrowly enough to reason; verify live source before changing it.**

This layer owns the **current-source structural surface**: discovering where code lives, retrieving the smallest useful source span, understanding relationships, and bounding change impact.

Use it for current-source questions such as symbol lookup, exact function/class retrieval, outlines, callers/callees, importers, implementations/inheritance, blast radius, changed-symbol mapping, dependency/coupling analysis, structural searches, hotspots, dead-code candidates, refactoring/risk preflight, and tightly bounded code-oriented task context.

Do not use it for historical decisions, build/test/log output, general documents/RAG, live version-control/gate state, or authoritative project protocol/ticket/architecture instructions.

## Provider boundary

jCodeMunch has expanded beyond symbol retrieval into task-context assembly, turn planning, compact response encoding, edit/delete checks, configuration auditing, prompt policy, watchers, and optional enforcement hooks. Token Saver treats these as **capabilities**, not as a transfer of global agent control.

### Prefer jCodeMunch for the code surface when available and permitted

Representative capabilities include:

- symbol search and exact symbol-source retrieval;
- file outlines and targeted file/source context;
- importers, callers/callees, call/class hierarchy and implementations;
- blast radius, changed-symbol mapping, hotspots and structural/AST search;
- bounded code-context bundles;
- edit/delete/refactoring risk checks when they are useful as advisory structural evidence;
- freshness, confidence and coverage metadata when exposed by the installed version.

Tool names and behavior can evolve. Use the installed provider's current guide/schema rather than assuming an old API.

### Do not automatically hand jCodeMunch these surfaces

- cross-surface turn routing;
- historical/semantic memory;
- CLI/build/test/log compression;
- general-context compression;
- authoritative project policy;
- final exact-source/gate truth.

A provider-level planner such as a turn planner may help choose **code-intelligence operations**, but Token Saver still decides which surface owns the work.

A provider context assembler may be used when it returns a bounded code bundle. Do not pass that already-targeted bundle through Entroly merely to shrink it again.

Compact provider wire formats/compression are transport details of this surface; they do not authorize a second compression stage or weaker evidence.

## Policy/hooks boundary

Some provider setup flows can write MCP/client configuration, agent prompt-policy files, watchers or enforcement hooks. Do **not** install or enable those mutations automatically merely to gain code retrieval.

Before enabling them, confirm they are allowed by the host/project and do not:

- replace or outrank project `AGENTS.md`, `CLAUDE.md`, skills or equivalent policy;
- prohibit native/raw reads that Token Saver may require for exact verification;
- silently enable external/remote services disallowed by the project;
- create another owner for a surface already assigned elsewhere.

If an enforcement/policy feature collides, suppress that feature while retaining non-conflicting structural retrieval.

## Freshness and coverage

Treat indexed results conceptually as:

- `FRESH_LOCATOR` — good for navigation;
- `FRESH_SOURCE` — useful source for a known indexed revision;
- `STALE_LOCATOR` — locator only, verify live;
- `INCOMPLETE` — cannot support absence/safety conclusions;
- `UNUSABLE` — missing trustworthy provenance/freshness.

Stale results may locate code but cannot prove current absence, callers, impact, or safety. Skipped/withheld files prevent complete absence claims. If freshness/coverage is insufficient, fall back to native targeted search/read.

Provider confidence, coverage contracts, watchers, hooks or SCIP/compiler-derived references can strengthen evidence for the revision they describe; they do not make an index timeless.

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

The index reduces **where/how much** to read; it does not weaken the evidence standard.

Use RAW/native exact reads when whole-file ordering, generated/configuration content, security evidence, parser limitations, index freshness, exact patch context, or other correctness-sensitive details make the precise live bytes material.

## One layer per surface

Do not feed jCodeMunch source/context into Entroly merely to shrink it further. Do not run code-intelligence output through RTK. Do not use optional jCodeMunch memory features as the historical-memory layer.

```text
jCodeMunch targeted code -> model

not

jCodeMunch targeted code -> another compressor -> model
```

## Evidence and savings claims

Treat provider token-saving benchmarks as **code-retrieval evidence, not universal whole-session guarantees**.

jCodeMunch currently publishes a reproducible benchmark reporting 96.4% fewer retrieval tokens than its grep-top-3 baseline across 15 task runs (per-query multiples vary widely; upstream asks readers to consult the range and methodology, not the average alone). Its separate production-codebase A/B report shows smaller tool-layer savings. Use the methodology/caveats from the installed/current upstream release and measure the target workload when savings matter operationally.

Do not turn benchmark marketing numbers into Token Saver guarantees.

## C/C++ note

For large C/C++ repositories, structural indexing can add substantial value over grep alone. If SCIP/clang-derived reference data already exists and the provider can import it, it may strengthen caller/reference/implementation analysis. Compiler-derived evidence still applies to the indexed revision and does not replace live-source freshness checks.

## Large-repo policy

Before relying on absence/impact results, verify indexed directories/languages/files, provider file-count/file-size limits, ignored/excluded/withheld files, and index revision/freshness. Prefer module-scoped indexes when full-monorepo indexing is operationally expensive.

Do not hard-code upstream provider limits; inspect the installed version.

## Security and privacy

A code index/cache is another source-derived copy of the repository and should be protected accordingly. Review storage, permissions, backups, secret exclusions, telemetry, watchers, hooks, optional remote extras, and policy/config files.

For jCodeMunch, upstream currently documents local index/cache state under `~/.code-index/` by default and notes that cached bodies are another copy of indexed source.

Upstream also documents secret-file exclusion and response redaction, but raw source-retrieval paths intentionally return source content. Do not treat the provider as a substitute for the project's secret scanning, access controls, or data-handling policy; a credential hardcoded in ordinary source can still be retrieved as source.

## Licensing

jCodeMunch is **source-available under a dual-use license**, not conventional permissive open source. Its current upstream license permits non-commercial use subject to its terms and requires a paid commercial license for commercial/for-profit use, including internal tooling that supports revenue-generating operations.

Token Saver does not bundle or redistribute jCodeMunch. Verify the current upstream license before enabling it in the target environment.

## Failure semantics

If the provider is unavailable, stale, incomplete, unlicensed, unsupported, prohibited, or its optional policy/hooks conflict with the project, use native targeted search followed by an exact narrow source read. Never block work.
