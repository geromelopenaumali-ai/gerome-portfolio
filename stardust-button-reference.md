# StardustButton reference

Source: https://lightswind.com/components/stardust-button

Confirmed API from the official Lightswind page:

```tsx
import StardustButton from "@/components/lightswind/stardust-button";
```

Props:
- `variant`: `"cosmic" | "aurora" | "nebula" | "glass"`, default `"cosmic"`
- `size`: `"sm" | "md" | "lg" | "xl"`, default `"md"`
- `particleCount`: number, default 45
- `particleSpeed`: number, default 1.0
- `theme`: `"light" | "dark" | "system"`, default `"system"`

The official Aurora variant is described as emerald, cyan, and violet shimmering stardust particles. The portfolio should keep the surrounding UI charcoal and neutral; the Aurora treatment is requested specifically for the RUN control.

Basic usage documented by Lightswind:

```tsx
<StardustButton variant="cosmic" size="md">
  <span>Sparkle Dust</span>
</StardustButton>
```

Retrieved: 2026-08-19 GMT+8.
