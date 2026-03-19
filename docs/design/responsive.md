# pZero Responsive Breakpoints

pZero uses a **mobile-first** approach: base styles target the smallest screen, enhanced with breakpoint prefixes for larger screens.

**Stack:** Tailwind CSS breakpoints (defaults, no overrides).

---

## Breakpoint System

| Name | Min width | Tailwind prefix | Target device |
|------|-----------|----------------|---------------|
| `xs` | 320px | (base, no prefix) | Small phones |
| `sm` | 640px | `sm:` | Large phones, small tablets |
| `md` | 768px | `md:` | Tablets (portrait) |
| `lg` | 1024px | `lg:` | Tablets (landscape), small laptops |
| `xl` | 1280px | `xl:` | Desktop |
| `2xl` | 1440px+ | `2xl:` | Large desktop / widescreen |

Write mobile-first: start from 320px base, then add `md:`, `lg:`, `xl:` enhancements.

```html
<!-- ✅ Mobile-first: single column → two columns → three columns -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

<!-- ❌ Avoid desktop-first (overrides) -->
<div class="grid grid-cols-3 md:grid-cols-2 grid-cols-1">
```

---

## Layout Patterns by Breakpoint

### Navigation

| Breakpoint | Pattern |
|------------|---------|
| `< 768px` (mobile) | Bottom tab bar (max 5 items) + `Sheet` drawer for secondary nav |
| `768px – 1023px` (tablet) | Collapsible icon sidebar (40px wide), expands on hover/tap |
| `≥ 1024px` (desktop) | Fixed left sidebar, 240px expanded / 56px icon-only when collapsed |

### Content layout

| Breakpoint | Column count | Max content width |
|------------|-------------|-------------------|
| `< 640px` | 1 | 100% - 32px padding |
| `640px – 767px` | 1–2 | 100% - 48px padding |
| `768px – 1023px` | 2 | 100% - 64px padding |
| `1024px – 1279px` | 2–3 | 1024px |
| `≥ 1280px` | 3–4 | 1280px |
| `≥ 1440px` | Up to 4 | 1440px |

Page content max-width: `max-w-screen-xl` (1280px) centered on large screens. Dashboard tables may use `max-w-screen-2xl`.

### Page padding

| Breakpoint | Horizontal padding |
|------------|--------------------|
| Mobile | `px-4` (16px) |
| `sm` | `sm:px-6` (24px) |
| `lg` | `lg:px-8` (32px) |

Use the `container` class pattern:

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
```

---

## Component Behaviour by Breakpoint

### Tables

| Breakpoint | Behaviour |
|------------|-----------|
| Mobile | Horizontal scroll (`overflow-x-auto`); keep fewer columns or use a card view |
| `≥ 768px` | Full table with all columns |
| `≥ 1280px` | Full table with optional extra columns shown |

Never hide data silently on mobile — if a column is hidden, it must be accessible via row expand or a detail view.

### Modals / Dialogs

| Breakpoint | Behaviour |
|------------|-----------|
| Mobile (< 640px) | Full-screen (`inset-0`) or bottom sheet (use `Sheet` component) |
| `≥ 640px` | Centered dialog, max-width `sm:max-w-lg` |
| `≥ 1024px` | May use wider dialogs (`lg:max-w-2xl`) for complex forms |

### Cards

| Breakpoint | Layout |
|------------|--------|
| Mobile | Full-width, stacked vertically |
| `≥ 640px` | 2-column grid |
| `≥ 1024px` | 3-column grid |
| `≥ 1280px` | Up to 4-column grid |

### Forms

| Breakpoint | Layout |
|------------|--------|
| Mobile | Single-column, full-width fields |
| `≥ 768px` | Two-column layout for shorter fields (e.g. first/last name side by side) |

### Charts and Data Visualisations

- On mobile, prefer **single-metric cards** or simplified chart variants over complex multi-series charts.
- Full charts are shown at `≥ 768px`.
- Always provide a text-based fallback (table or key stat) alongside charts.

---

## Typography Scaling

| Breakpoint | Base font size | Heading adjustments |
|------------|---------------|---------------------|
| Mobile | `text-sm` (14px body) | `text-2xl` for `h1` |
| `≥ 1024px` | `text-sm` (unchanged) | `text-3xl` for `h1` |

Headings use responsive scaling:

```html
<h1 class="text-2xl lg:text-3xl font-semibold tracking-tight">
```

---

## Touch Target Requirements

On mobile, all interactive elements must meet minimum touch target sizes (see also [accessibility.md](accessibility.md)):

| Element | Minimum size |
|---------|-------------|
| Button | 44 × 44px |
| Icon button | 44 × 44px (use padding) |
| Navigation tab | Full tab bar width / 5 items, min 44px tall |
| List row | 48px min height |
| Input | 44px min height |

Use padding to expand small visual elements to the required touch target size without changing the visual design.

---

## Testing Requirements

Every UI must be tested at these viewport widths before shipping:

| Width | Represents |
|-------|-----------|
| **320px** | Smallest phones (iPhone SE) |
| **375px** | iPhone 14 |
| **768px** | iPad portrait |
| **1024px** | iPad landscape / small laptop |
| **1280px** | Standard desktop |
| **1440px** | Large desktop |

### How to test

1. Open Chrome DevTools → Device toolbar → set custom width.
2. Check each of the six widths above.
3. Confirm: no horizontal scroll on any viewport, all content readable without zoom, touch targets adequate on mobile.

---

## References

- [Design system tokens](../../packages/design-system/README.md)
- [IX principles](ix-principles.md)
- [Accessibility standards](accessibility.md)
- [Tailwind CSS responsive design](https://tailwindcss.com/docs/responsive-design)
