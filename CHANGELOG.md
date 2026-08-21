# Changelog

All notable changes to Token Saver are documented here.

Token Saver follows [Semantic Versioning](https://semver.org/):

- **PATCH** — fixes, wording/safety improvements, installer corrections.
- **MINOR** — backward-compatible capabilities, skills, providers, or toolchain support.
- **MAJOR** — incompatible bootstrap, CLI, routing, or precedence changes.

## [Unreleased]

## [0.2.0] - 2026-08-21

### Code intelligence
- Expanded the code-intelligence contract to cover structural relationships, blast radius, changed-symbol mapping, bounded code-context assembly, risk/refactoring preflight and freshness/coverage metadata.
- Expanded jCodeMunch guidance from symbol-oriented retrieval into the full current-code structural contract while keeping it the first optional reference provider for that surface.
- Added an explicit provider boundary: jCodeMunch planners/context assemblers may optimize the code-intelligence surface but do not take over Token Saver's cross-surface routing.
- Added exact-source guidance for cases where live bytes, whole-file ordering, generated/configuration content, security evidence, parser limits or patch context are material.
- Added a benchmark-scope rule: provider retrieval savings must not be presented as universal whole-session savings.

### Complements, never collides
- Added a general provider-boundary contract for tools that grow into planners, compressors, memory, config auditing, prompt policies, watchers or enforcement hooks.
- Provider-supplied prompts/rules/hooks remain subordinate to the host project's instructions and Token Saver's authority order.
- Provider setup must not automatically mutate agent-policy files, MCP/client configuration or enforcement hooks when those changes could collide with project rules or suppress a required RAW/native verification path.
- Conflicting optional provider features are suppressed narrowly while non-conflicting capabilities remain usable.

### Security and licensing
- Clarified that a code index/cache is another source-derived copy and must be protected accordingly.
- Clarified that jCodeMunch's raw source-retrieval paths are not a substitute for project secret scanning/access controls.
- Corrected jCodeMunch terminology to **source-available under a dual-use license** and documented the current commercial-license requirement without bundling or redistributing it.

### Contribution policy
- Added admission checks for provider-side planners/compressors, agent-rule/config/hook mutations, and benchmark scope.
- Added a rule to re-evaluate provider boundaries as upstream tools expand: use useful new capabilities without inheriting new collisions.

### Documentation
- Marked npm/npx as the recommended managed-install path.
- Documented optional global CLI installation and normal update flow.
- Recorded successful clean external-user installation of `@sudowhat/token-saver@0.1.0`.

## [0.1.0] - 2026-08-20

### Added
- Portable `AGENT.md` bootstrap for AI-assisted software projects.
- Five complementary context surfaces: token discipline, semantic memory, code intelligence, CLI-output optimization, and context assurance.
- Reference providers/ideas including Caveman/Beeline principles, Supermemory, jCodeMunch, RTK, and Entroly.
- Explicit project-first precedence and native fallback behavior.
- npm/Bun-compatible CLI packaging with install, update, doctor, version, print-init, and uninstall commands.
- curl and PowerShell release installers with SHA-256 verification.
- Community contribution guidance and third-party licensing notes.

### Principle
- **Complements, never collides:** project rules win; only the conflicting Token Saver capability is suppressed.
