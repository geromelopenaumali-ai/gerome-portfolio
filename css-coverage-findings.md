# CSS Coverage Findings

The live homepage stylesheet was inspected in the browser after hydration.

- The document contained one inline critical style block and the application stylesheet.
- The live CSS traversal found 1,023 matched style rules before the browser output was truncated.
- The unmatched sample was dominated by Tailwind/browser reset selectors (`hr`, `table`, `textarea`, pseudo-elements, and input-related rules), which are not safe to remove without changing the global reset contract.
- Static source-token matching reported 190 candidates, but this is not sufficient evidence for deletion because `SmoothLayer.tsx` queries legacy selectors dynamically and several interactive states are not present in the initial DOM.
- High-confidence cleanup should therefore target exact duplicate blocks or unused imported runtime dependencies, not broad removal based only on selector absence.
