---
name: cli-output-optimization
description: Provider-neutral policy for optionally using RTK to reduce noisy local CLI/build/test/log output while preserving exact evidence and raw recovery.
---

# CLI Output Optimization

RTK (Rust Token Killer) is the first reference implementation: https://github.com/rtk-ai/rtk

> **Compress machine noise, not engineering truth.**

Use this layer mainly where the agent executes commands in a local shell.

## Good candidates

- verbose builds;
- test runners with large passing output;
- linters;
- repetitive application logs;
- dependency inventories;
- container/orchestration listings/logs;
- non-authoritative Git orientation/history;
- broad exploratory listings/search output.

For C/C++ this may include CMake, Ninja/Make, Bazel, CTest/test frameworks, clang-tidy/static analysis, package/dependency tools, and server/application logs.

## RAW / lossless class

Do not compress when exact output is part of correctness or a machine contract, including:
- exact source/config;
- machine-readable gate output;
- exact Git porcelain;
- exact SHA/revision evidence;
- exact review patches/diffs;
- security/privacy evidence;
- compiler/linker diagnostics when compact output is insufficient;
- test failure evidence when compact output hides identity/cause;
- anything explicitly requested raw.

## Recovery

```text
compressed result
    ↓
enough evidence?
 yes -> continue
 no  -> inspect persisted/raw output
```

Prefer raw-output recovery over rerunning expensive build/test commands. Never guess from an ambiguous compressed failure.

## Exit semantics

When workflow logic depends on exit status, ensure the optimization path preserves native exit semantics; otherwise run native.

## One layer per surface

CLI stdout/stderr belongs here. Do not pass RTK-compressed output through Entroly for another compression pass. If RTK is absent, native CLI output remains the fallback; Entroly does not inherit this surface.

## Privacy

Output tee/history files can contain raw failures, secrets, personal data, or fixtures. Review telemetry and retention settings before sensitive use.

## Vendor independence

Do not require vendor-specific hooks. The rule is simply:

```text
safe noisy CLI output + optimizer available -> optimized path
otherwise                                   -> native command
```
