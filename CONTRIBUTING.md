# Contributing to Token Saver

Contributions are welcome.

Token Saver should stay **small, vendor-neutral, evidence-driven, and easy to drop into any AI-assisted software project**.

## Good contributions

Useful contributions include:

- improving an existing skill or routing rule;
- making wording more vendor/version-control agnostic;
- adding safety, freshness, provenance, privacy, or fallback guidance;
- improving support for large codebases or additional languages/toolchains;
- proposing a better reference provider for an existing capability;
- proposing a genuinely new capability that fills a distinct context/tooling surface;
- adding practical measurements or reproducible comparisons showing where a rule/tool saves context, turns, or noisy output without weakening correctness.

## Before proposing another tool

Please avoid turning Token Saver into a catalog of every AI optimization project.

A new tool/provider should answer:

1. **What distinct problem/surface does it own?**
2. **Does an existing Token Saver layer already cover that surface?**
3. **Can it complement the current stack without double-processing the same context?**
4. **What is the raw/native fallback when it is unavailable?**
5. **How are freshness, provenance, exact recovery, security and privacy handled?**
6. **What are its current licensing/commercial-use constraints?**
7. **What evidence shows useful savings or better engineering outcomes on realistic projects?**
8. **Does its installer or runtime write agent rules, MCP/client config, hooks, watchers, global prompts, or enforcement policy? If so, can those mutations remain optional and subordinate to the host project?**
9. **Does it include its own planner, context assembler, memory, compressor, or router? If so, which parts stay inside the provider's assigned Token Saver surface and which would collide with an existing owner?**
10. **Are its savings claims scoped correctly?** Retrieval/output savings must not be presented as whole-session savings unless the evidence actually measures whole sessions.

If two tools solve the same problem, prefer a provider-neutral policy with one or more optional reference providers rather than stacking both blindly.

A provider may grow over time. Re-evaluate its boundary when new releases expand into surfaces that Token Saver already assigns elsewhere. **Use the best new capability; do not inherit a new collision.**

## Core invariants

Please preserve these principles:

- project/user instructions and correctness come before optimization;
- current canonical source and live project/version-control state beat cached or remembered data;
- exact evidence stays exact when the decision depends on it;
- retrieve narrowly before compressing;
- one optimization/intelligence layer owns each context surface;
- a provider owns only its assigned surface, even when it ships broader orchestration features;
- provider-supplied prompts, planners, hooks and enforcement never outrank the host project's rules or Token Saver's cross-surface routing;
- optional providers fail open to native project workflows;
- no AI vendor, IDE, MCP host, external tool, or version-control system is mandatory;
- third-party source code is not redistributed by this repository unless its license and the project explicitly allow it.

## Pull requests

Keep pull requests focused and explain:

- the problem being solved;
- the proposed rule/provider change;
- which Token Saver surface it belongs to;
- why it does not collide with existing layers;
- any installer/config/prompt/hook mutations the provider may make;
- any security/privacy/licensing implications;
- the scope of any benchmark or savings claim;
- evidence or examples supporting the change when applicable.

Small, clear improvements are preferred over broad rewrites.
