# Token Saver

[![npm version](https://img.shields.io/npm/v/@sudowhat/token-saver.svg)](https://www.npmjs.com/package/@sudowhat/token-saver)

A small, vendor-neutral efficiency pack for AI coding agents working on **large codebases**.

> **Use less context. Keep the engineering signal.**  
> **Complements, never collides.**

Current stable release: **`@sudowhat/token-saver@0.1.0`** — published on npm and validated through a clean external-user install.

## 5-second view

```text
                         TOKEN SAVER
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
   Historical            Current code          CLI output
   knowledge              structure             / logs
        │                     │                     │
        ↓                     ↓                     ↓
  Semantic memory       Code intelligence       RTK-style
   (Supermemory)          (jCodeMunch)          optimization

Large general context  ───────────────→  Context assurance (Entroly)
Exact/canonical evidence ─────────────→  RAW / untouched
```

The rule is simple: **use one appropriate optimization/intelligence layer for each context surface, and leave exact engineering evidence exact.**

## Install

All supported managed-install methods target `~/token-saver`.

### Recommended: npm / npx

No global install is required:

```bash
npx @sudowhat/token-saver@latest install
```

### Bun

```bash
bunx @sudowhat/token-saver@latest install
```

### pnpm

```bash
pnpm dlx @sudowhat/token-saver@latest install
```

### Permanent CLI (optional)

If you prefer a globally available `token-saver` command:

```bash
npm install -g @sudowhat/token-saver@latest
token-saver install
```

### curl (macOS / Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/sudowhat/token-saver/main/install.sh | sh
```

The curl installer downloads the latest GitHub Release and verifies its SHA-256 checksum before installing.

### PowerShell

```powershell
irm https://raw.githubusercontent.com/sudowhat/token-saver/main/install.ps1 | iex
```

### Git / another version-control checkout

```bash
git clone https://github.com/sudowhat/token-saver ~/token-saver
```

If `~/token-saver` is a Git checkout, Token Saver installers deliberately refuse to overwrite it; update it through its version-control workflow instead.

## Start an agent

From any AI-assisted software project, give a new agent this as its first instruction:

```text
Read ~/token-saver/AGENT.md and initialize this project. Then continue to follow it for this session.
```

After that, interact with the agent normally. You should not need to repeatedly tell it which optimization tool to use.

## Update normally

For npm/npx installations:

```bash
npx @sudowhat/token-saver@latest update
```

For Bun:

```bash
bunx @sudowhat/token-saver@latest update
```

For a globally installed CLI:

```bash
npm install -g @sudowhat/token-saver@latest
token-saver update
```

For curl/PowerShell installs, rerun the same installer command. Managed installers refuse to overwrite locally changed Token Saver files unless an explicit force path is used.

Useful CLI commands:

```text
token-saver install
token-saver update
token-saver doctor
token-saver version
token-saver print-init
token-saver uninstall
```

The short `token-saver ...` form is available when the npm package is installed globally. With `npx`/`bunx`, prefix the command with the corresponding runner.

## What Token Saver does

Token Saver combines five complementary ideas/tools, while keeping your actual project files, source code, tests, project instructions, and current version-control/workspace state authoritative:

| Layer | First reference | Best for |
|---|---|---|
| **Token discipline** | Caveman + selected Beeline principles | Avoiding unnecessary reads, tool calls and agent chatter |
| **Semantic memory** | Supermemory | Finding relevant historical decisions, regressions and lessons |
| **Code intelligence** | jCodeMunch | Fast symbol/AST-based navigation of large current codebases |
| **CLI output optimization** | RTK | Compressing noisy build/test/log output |
| **Context assurance** | Entroly | Reducing large general model-bound context with recovery/provenance |

The external tools are **optional and are not bundled in this repository**.

## Complements, never collides

Token Saver is a compatibility/optimization layer, not a replacement agent framework.

**Project rules win.** If one Token Saver capability conflicts with an authoritative host-project rule, the agent suppresses only that capability and falls back to the project's native workflow for that surface. Unrelated Token Saver capabilities may continue normally.

Conflicts are reduced by design because:

- project instructions are read before Token Saver optimization is applied;
- each context surface has one optimization/intelligence owner;
- external providers are optional;
- exact/canonical engineering evidence has a RAW path;
- every optional provider has a native fallback;
- Token Saver does not require a specific AI vendor, IDE, MCP host, external tool, or version-control system.

Token Saver cannot technically guarantee that every AI host will implement instruction precedence perfectly, so the policy is deliberately conservative: **when uncertain, yield to the project/native path.**

## Routing rule

```text
exact / canonical / gate evidence        -> RAW / native exact path
historical engineering knowledge         -> semantic-memory provider
current source-code structural retrieval -> code-intelligence provider
CLI / shell stdout or stderr             -> CLI-output optimizer
large reconstructible general context    -> context-assurance provider
anything else                            -> native/direct path
```

This prevents collisions such as RTK output being compressed again by Entroly, or jCodeMunch's already-targeted source being passed through another compressor.

## Important safety rule

**Optimization never overrides correctness.**

Source being edited, exact diffs/changesets, security-sensitive evidence, test failures, machine-readable gates and current version-control/workspace state must remain exact whenever the decision depends on their exact contents.

If any optional provider is missing, stale, unsupported, unsuitable or conflicting, the agent falls back to normal targeted search/read/build/test commands.

## Releases and versioning

Token Saver follows Semantic Versioning:

```text
PATCH  fixes / safety / installer corrections
MINOR  backward-compatible skills, providers or capabilities
MAJOR  incompatible bootstrap, CLI, routing or precedence changes
```

Every release keeps these aligned:

```text
package.json version
Git tag vX.Y.Z
npm @sudowhat/token-saver@X.Y.Z
GitHub Release vX.Y.Z
CHANGELOG.md
```

See [`CHANGELOG.md`](CHANGELOG.md) for human-readable release notes.

## Repository layout

```text
token-saver/
├── AGENT.md
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── package.json
├── bin/token-saver.mjs
├── install.sh
├── install.ps1
├── INIT_PROMPT.txt
├── OPTIONAL_PROJECT_STUB.md
├── THIRD_PARTY.md
├── LICENSE
└── skills/
    ├── token-discipline/SKILL.md
    ├── semantic-memory/SKILL.md
    ├── code-intelligence/SKILL.md
    ├── cli-output-optimization/SKILL.md
    └── context-assurance/SKILL.md
```

There is intentionally **no nested `agent-efficiency-pack` directory**. `token-saver` is the pack.

## Large C/C++ projects

The `code-intelligence` layer is especially useful on large C/C++ codebases: structural indexing can locate symbols, implementations, callers, inheritance relationships and blast radius before the agent reads source. If SCIP/clang-derived reference data already exists, it may optionally improve accuracy.

The index is still not live truth: stale or incomplete results must fall back to current native source/search.

## Contributions welcome

Token Saver is intended to improve through real developer usage.

Contributions are welcome for better routing rules, additional toolchains/languages, measurable token/context savings, safer fallback behavior, and new reference providers. A proposed new tool should ideally fill a **distinct surface** rather than duplicate an existing layer.

New token-saving tools enter the pack only when they **complement rather than collide** with existing Token Saver layers and the host project's own rules.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the design principles and what makes a useful addition.

## Licensing

This Token Saver repository is MIT licensed.

The referenced external tools retain their own licenses and commercial terms. In particular, verify **jCodeMunch's current upstream license before office/company use**; its upstream project currently uses a dual-use model with commercial licensing requirements.

See [`THIRD_PARTY.md`](THIRD_PARTY.md) for links and notes.
