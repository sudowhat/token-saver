---
name: token-discipline
description: Vendor-neutral token-efficiency rules for software-development agents. Reduce unnecessary retrieval, tool output, and narration while preserving exact engineering evidence.
---

# Token Discipline

> **Small mouth, full brain. Compress chatter; preserve engineering signal.**

This skill incorporates useful principles from concise-agent approaches such as Caveman and Beeline without requiring either product, plugin, hook, or vendor.

## Retrieve narrowly

Before opening/searching material, identify the concrete fact needed.

Prefer:
1. targeted symbol/text/structural search;
2. likely files/directories;
3. relevant ranges/symbols;
4. broader exploration only when evidence requires it.

Avoid recursive repo dumps, rereading stable material for reassurance, and opening whole files when one symbol/range is enough.

## Tool discipline

1. Filter at the source when safe.
2. Batch independent tool calls when supported.
3. Use the narrowest verification that would actually fail if the change were wrong.
4. An empty filtered result is not automatically proof of absence; verify coverage or widen the search.
5. Do not save a few tokens if doing so predictably causes another avoidable turn.
6. Do not rerun expensive successful checks without a mutation/freshness/gate reason.

## Exact-read rule

Indexed, summarized, structural, or compressed results may locate relevant material, but exact-read current canonical source when exact bytes matter, especially before edits/reviews involving APIs, schemas, concurrency, security/privacy, exact diffs, build/test gates, or authoritative instructions.

## Preserve losslessly

Do not compress away:
- source code whose exact form matters;
- paths, symbols, APIs, schemas;
- exact commands and exit semantics;
- diagnostically relevant compiler/linker/test failures;
- acceptance criteria;
- security/privacy constraints;
- exact review diffs/patches;
- reproduction steps where omission changes behavior.

Trim noise, not signal.

## Conversation discipline

Do not narrate every read/search/edit/build/test step. Report meaningful findings, state changes, blockers, and validation results.

## Surface ownership

```text
exact / canonical / gate evidence        -> RAW
historical engineering knowledge         -> semantic-memory
current source-code structural retrieval -> code-intelligence
CLI stdout/stderr                        -> cli-output-optimization
large reconstructible general context    -> context-assurance
otherwise                                -> native/direct
```

**One layer per surface. Do not chain optimizers.**

## No guessing for savings

If information is missing, stale, contradictory, incomplete, or safety-critical, investigate further. A shorter wrong answer is not an optimization.
