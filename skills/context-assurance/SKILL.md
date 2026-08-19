---
name: context-assurance
description: Optional provider-neutral control for reducing large model-bound general evidence/context with provenance, recovery, and raw fallback. Entroly is the first reference provider.
---

# Context Assurance

Entroly is the first reference implementation: https://github.com/juyterman1000/entroly

Use this layer only when token discipline has already narrowed retrieval and the **remaining necessary general model-bound context is still materially large**.

> **Select/compress reconstructible context; preserve engineering truth exactly.**

## Surface boundary

This layer owns large reconstructible general context such as non-authoritative document/reference sets, RAG evidence bundles, verbose non-CLI API/tool payloads, and necessary background context where originals remain available.

It does not own exact/canonical/gate evidence, historical semantic lookup, current-source structural retrieval, or CLI stdout/stderr.

## Router

```text
exact / canonical / gate evidence        -> RAW
historical knowledge                     -> semantic-memory
current source-code structure            -> code-intelligence
CLI stdout/stderr                        -> cli-output-optimization
large reconstructible general context    -> context-assurance
otherwise                                -> direct/native
```

## One optimizer per surface

Never:
- RTK -> Entroly for the same CLI output;
- jCodeMunch -> Entroly merely to shrink already-targeted source;
- use Entroly memory as a hidden replacement for semantic-memory policy;
- reduce exact evidence required for an edit/review/security/correctness decision.

## Provider requirements

Use a context-assurance provider only when the environment can establish that:
1. the request actually traverses the provider;
2. the payload is allowed by privacy/security policy;
3. selected/omitted context is sufficiently attributable;
4. recovery/reacquisition of exact originals is available where needed;
5. uncertainty/failure can fall back to unchanged/native context.

## Recovery

```text
reduced context
    ↓
enough for decision?
 yes -> continue
 no  -> recover/reacquire exact original evidence
```

Never approve/review/promote based on reduced context if omitted material could change the conclusion.

## Receipts/provenance

Treat receipts as operational evidence about the transformation, not as project truth. Useful receipt information includes what was considered, what was selected/omitted/transformed, source provenance, warnings/uncertainty, and recovery references where promised.

## Failure semantics

On provider absence, timeout, uncertainty, malformed result, missing recovery, or unsupported host, use original/native context and continue. Do not silently switch to another optimizer. Security failures remain fail-closed.

## Privacy

A provider may create caches, receipts, recovery bundles, indexes, or other source-derived state. Understand retention, storage location, access control, telemetry, project isolation, and secret/PII handling before sensitive use.

## Measurement honesty

Do not repeat vendor headline percentages as project-wide savings. Measure representative tasks using original vs reduced context, evidence loss, recovery frequency, extra latency/tool calls, and correctness against the raw baseline. A reduction that causes rereads or wrong decisions may not be a net saving.
