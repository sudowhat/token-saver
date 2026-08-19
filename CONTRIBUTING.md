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

If two tools solve the same problem, prefer a provider-neutral policy with one or more optional reference providers rather than stacking both blindly.

## Core invariants

Please preserve these principles:

- project/user instructions and correctness come before optimization;
- current canonical source and live project/version-control state beat cached or remembered data;
- exact evidence stays exact when the decision depends on it;
- retrieve narrowly before compressing;
- one optimization/intelligence layer owns each context surface;
- optional providers fail open to native project workflows;
- no AI vendor, IDE, MCP host, external tool, or version-control system is mandatory;
- third-party source code is not redistributed by this repository unless its license and the project explicitly allow it.

## Pull requests

Keep pull requests focused and explain:

- the problem being solved;
- the proposed rule/provider change;
- which Token Saver surface it belongs to;
- why it does not collide with existing layers;
- any security/privacy/licensing implications;
- evidence or examples supporting the change when applicable.

Small, clear improvements are preferred over broad rewrites.
