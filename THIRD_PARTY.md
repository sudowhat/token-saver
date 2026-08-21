# Third-Party References

Token Saver does **not** bundle, redistribute, or require the projects below. They are reference implementations for optional capabilities.

Always verify current upstream documentation, security posture, licensing, and installation instructions before enabling them.

## Supermemory
Semantic-memory reference provider.

- GitHub: https://github.com/supermemoryai/supermemory

## jCodeMunch MCP
Primary code-intelligence reference provider.

- GitHub: https://github.com/jgravelle/jcodemunch-mcp
- Role in Token Saver: current-code structural discovery, symbol-level source retrieval, relationships/blast radius, bounded code context, and related code-risk/navigation capabilities.
- Licensing: **source-available under a dual-use license**, not conventional permissive open source. Upstream currently permits qualifying non-commercial use under its terms and requires a paid license for commercial/for-profit use, including internal tooling supporting revenue-generating operations. Always verify the current upstream license before use.
- Token Saver does **not** copy, bundle, republish, or rebrand jCodeMunch.
- Upstream setup can optionally write MCP/client configuration, agent prompt policies, watchers or enforcement hooks. Token Saver does not automatically adopt those mutations; enable them only when the host/project permits them and they do not block Token Saver's RAW/native verification path.
- Upstream documents local index/cache state under `~/.code-index/` by default. Treat it as another source-derived copy of the repository and protect it accordingly.
- Upstream documents secret-file exclusions/redaction, but raw source retrieval can still return secrets hardcoded in ordinary source. Keep project secret scanning and access controls authoritative.
- Benchmark note: upstream publishes strong code-retrieval savings, including a reproducible grep-top-3 comparison. Treat those as retrieval-specific evidence, not a guarantee of whole-session savings; consult the current upstream methodology/caveats.

## RTK — Rust Token Killer
CLI-output optimization reference provider.

- GitHub: https://github.com/rtk-ai/rtk

## Entroly
Context-assurance reference provider.

- GitHub: https://github.com/juyterman1000/entroly

## Caveman
Source of useful concise-agent principles incorporated conceptually into Token Saver's vendor-neutral token-discipline skill.

- GitHub: https://github.com/JuliusBrussee/caveman

## Beeline
Source of additional tool-discipline/turn-efficiency principles incorporated conceptually into Token Saver's vendor-neutral token-discipline skill.

- GitHub: https://github.com/iceHub82/beeline

Token Saver's policy files are independently authored and do not include third-party source code.
