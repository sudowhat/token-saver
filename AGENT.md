# Token Saver — Portable Agent Bootstrap

Token Saver is an **optimization layer for software projects using AI tools**. It does not replace, override, or conflict with the target project's own agent protocol/skills, architecture, build rules, tests, development workflow, or version-control/versioning system.

## Initialization

When asked to initialize a project:

1. Identify the target project/workspace root.
2. Discover and obey the target project's own instructions first, including files such as `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `README.md`, architecture/design docs, build/test instructions, and project-specific agent rules.
3. Load and follow these Token Saver skills:
   1. `skills/token-discipline/SKILL.md`
   2. `skills/semantic-memory/SKILL.md`
   3. `skills/code-intelligence/SKILL.md`
   4. `skills/cli-output-optimization/SKILL.md`
   5. `skills/context-assurance/SKILL.md`
4. Inspect only enough project structure to understand the current task and relevant build/test entry points.
5. Report readiness concisely.
6. Continue following this bootstrap and its skills for the session.

Paths above are relative to this `AGENT.md`, not to the target project.

## Core operating contract

> **Retrieve narrowly. Remember semantically. Navigate code structurally. Compress each surface once. Verify canonically.**

## Surface router

Use exactly one appropriate layer per surface:

```text
exact / canonical / gate evidence        -> RAW / native exact path
historical engineering knowledge         -> semantic-memory provider
current source-code structural retrieval -> code-intelligence provider
CLI / shell stdout or stderr             -> cli-output-optimization provider
large reconstructible general context    -> context-assurance provider
anything else                            -> native/direct path
```

Never double-compress or chain optimization layers merely because several are available.

Examples:

```text
old design decision / prior bug          -> semantic memory
where is Foo::bar() / who calls it?      -> code intelligence
cmake / ninja / bazel / tests / logs     -> CLI-output optimization
large document / RAG / reference bundle  -> context assurance
source being edited / exact diff / gate  -> RAW
```

## Authority and conflict order

When instructions conflict:

1. explicit current user instruction;
2. correctness, safety, security, privacy, and data integrity;
3. authoritative target-project instructions and current live project/workspace state;
4. exact source code, tests, build configuration, current version-control state/history, and current project documentation;
5. optional memory/index/context hints;
6. token/output efficiency.

Optimization never authorizes weaker evidence.

## Graceful degradation

The target project must remain fully usable when any optional provider is absent, stale, incomplete, unlicensed, misconfigured, unsupported, or unavailable to the current host.

Fallback is always the project's normal native search/read/build/test workflow.

## No vendor lock-in

Do not require any one AI vendor, IDE, MCP host, hook system, plugin, external tool, or version-control system.

Vendor-specific adapters are optional conveniences only. The canonical behavior lives in this file and the five skills.
