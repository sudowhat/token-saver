# Token Saver

A small, vendor-neutral efficiency pack for AI coding agents working on **large codebases**.

Clone this repository directly into your home directory:

```bash
git clone https://github.com/sudowhat/token-saver ~/token-saver
```

Then, from any project, give a new agent this as the first instruction:

```text
Read ~/token-saver/AGENT.md and initialize this project. Then continue to follow it for this session.
```

After that, interact with the agent normally. You should not need to repeatedly tell it which optimization tool to use.

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

## Routing rule

The agent should use only one layer for each context surface:

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

If any optional provider is missing, stale, unsupported or unsuitable, the agent simply falls back to normal targeted search/read/build/test commands.

## Repository layout

```text
token-saver/
├── AGENT.md
├── README.md
├── CONTRIBUTING.md
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

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the design principles and what makes a useful addition.

## Licensing

This Token Saver repository is MIT licensed.

The referenced external tools retain their own licenses and commercial terms. In particular, verify **jCodeMunch's current upstream license before office/company use**; its upstream project currently uses a dual-use model with commercial licensing requirements.

See [`THIRD_PARTY.md`](THIRD_PARTY.md) for links and notes.
