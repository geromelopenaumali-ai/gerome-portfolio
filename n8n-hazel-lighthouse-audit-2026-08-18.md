# n8n, Hazel, and Lighthouse-style audit — 2026-08-18

## n8n interaction pass

The live page exposed four n8n project tabs. Each tab remained active after selection and had a visible shared terminal with a project-specific label, input field, and RUN button. Each RUN action produced a trace/result state. Loaded visible workflow images were present throughout the pass.

| Project | Terminal label | Input | RUN | Trace/result state |
|---|---|---:|---:|---:|
| RAG AI Agent | Ask the knowledge base | Yes | Yes | Passed |
| AI Customer Support Agent with Human Approval | Test a support request | Yes | Yes | Passed |
| Lead Qualification, Enrichment & Sales Routing | Test a new lead | Yes | Yes | Passed |
| Facebook Messenger AI Support Agent | Ask the support agent | Yes | Yes | Passed |

The non-n8n tab groups remained present separately, confirming the interaction pass was scoped to the four n8n projects.

## Hazel verification

The live featured project title is restored as two deliberate lines, `AI Receptionist` and `(Hazel)`. The `Hazel` span uses the expected `lightswind-shiny-text` class. Computed styles confirm the glow-only effect is active through `hazel-glow-breathe` at `3.2s`, with neutral gray text, visible text-shadow, no moving gradient background, and visible overflow-safe title styling.

## Lighthouse audit

A Lighthouse CLI audit was run against the live preview URL on 2026-08-18. Scores were: Performance 47, Accessibility 100, Best Practices 96, SEO 100, and Agentic Browsing 100.

The measured lab metrics were FCP 33.1s, LCP 62.9s, Speed Index 33.1s, TBT 350ms, CLS 0.001, and TTI 63.0s. The unusually high load metrics are specific to the temporary Vite development preview/proxy and should not be treated as a production hosting benchmark.

The largest flagged opportunities were unminified JavaScript, estimated savings 9,226 KiB; unused JavaScript, estimated savings 719 KiB; render-blocking requests, estimated savings 2,320 ms; total payload 12,285 KiB; unminified CSS, estimated savings 44 KiB; and image delivery, estimated savings 97 KiB. The Lighthouse JSON is preserved at `lighthouse-report-2026-08-18.json`.
