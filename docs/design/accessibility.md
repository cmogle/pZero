# pZero Accessibility Standards

**Standard: WCAG 2.1 AA — mandatory for all UI shipped in pZero.**

Accessibility is not optional. Every component submitted for review must pass all criteria below. This document is the authoritative checklist for the Founding Engineer and the UX Lead.

---

## Guiding Principle

If a user can't navigate pZero with only a keyboard, or a screen reader announces the wrong thing, the feature is **not done**. Accessibility defects are treated as bugs, not backlog items.

---

## 1. Colour Contrast (WCAG 1.4.3, 1.4.11)

### Text contrast

| Text type | Minimum contrast ratio | Token pair examples |
|-----------|----------------------|---------------------|
| Normal text (< 18pt / < 14pt bold) | **4.5:1** | `text-zinc-50` on `bg-zinc-950` ✓ |
| Large text (≥ 18pt or ≥ 14pt bold) | **3:1** | `text-zinc-200` on `bg-zinc-900` ✓ |
| Placeholder text | **4.5:1** | `text-zinc-500` on `bg-zinc-950` — check before use |
| Disabled text | Exempt | `text-zinc-600` — users understand disabled state |

### UI component contrast

| Element | Minimum contrast ratio | Notes |
|---------|----------------------|-------|
| Input border (default) | **3:1** against background | `border-zinc-700` on `bg-zinc-950`: ~4:1 ✓ |
| Focus ring | **3:1** against adjacent colors | `ring-indigo-500` on `bg-zinc-950` ✓ |
| Button background vs page | **3:1** | `bg-indigo-500` on `bg-zinc-950` ✓ |
| Icon (meaningful) | **3:1** | Decorative icons are exempt |

### Checking contrast

Use these tools:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools Accessibility panel
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) (desktop app)

**Never ship a component without checking its contrast in dark mode specifically.**

---

## 2. Keyboard Navigation (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7)

### Requirements

- **All interactive elements** must be reachable and operable by keyboard alone.
- Tab order must follow **logical reading order** (top-left to bottom-right, visually).
- Focus must never be trapped (unless inside a modal — see Modals below).
- `Tab` moves forward, `Shift+Tab` moves backward, `Enter`/`Space` activates, arrow keys navigate within compound widgets.

### Focus indicator

Every focused element must have a **clearly visible** focus ring. Use the design system's standard:

```html
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-indigo-500
focus-visible:ring-offset-2
focus-visible:ring-offset-zinc-950
```

**Never** use `outline: none` or `outline: 0` without a custom focus replacement.

### Keyboard patterns by component

| Component | Expected keyboard behaviour |
|-----------|-----------------------------|
| Button | `Enter` or `Space` activates |
| Link | `Enter` activates |
| Checkbox | `Space` toggles |
| Radio group | Arrow keys move between options |
| Select / Combobox | `Enter` opens, arrows navigate, `Enter` selects, `Esc` closes |
| Dialog / Modal | `Esc` closes; focus is trapped inside while open; returns to trigger on close |
| Menu / Dropdown | `Enter` or `Space` opens; arrows navigate; `Enter` selects; `Esc` closes |
| Tabs | Arrow keys switch between tabs; `Enter`/`Space` activates focused tab |
| Accordion | `Enter`/`Space` toggles |
| Date picker | Arrow keys navigate dates; `Enter` selects; `Esc` closes |

### Modal focus management

Modals/dialogs must:
1. Move focus to the dialog (or its first interactive element) on open.
2. Trap `Tab` / `Shift+Tab` within the dialog while open.
3. Return focus to the trigger element on close.

shadcn/ui `Dialog` and `AlertDialog` handle this correctly — use them. Do not build custom modal layers.

---

## 3. Semantic HTML & ARIA (WCAG 1.3.1, 4.1.2)

### Use semantic HTML first

ARIA supplements semantics; it does not replace them. Prefer native HTML elements.

| Use | Instead of |
|-----|------------|
| `<button>` | `<div role="button">` |
| `<a href="...">` | `<span onClick>` |
| `<nav>` | `<div id="nav">` |
| `<main>` | `<div id="main-content">` |
| `<ul>` / `<li>` | `<div>` lists |

### Required ARIA attributes

| Situation | Required attribute |
|-----------|--------------------|
| Icon-only button | `aria-label="Description of action"` |
| Loading state | `aria-busy="true"` on the container |
| Error message | `aria-live="polite"` + `role="alert"` for errors |
| Progress indicator | `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` |
| Expandable section | `aria-expanded="true/false"` on the trigger |
| Modal dialog | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| Navigation landmark | `aria-label` when multiple `<nav>` elements exist |
| Current page in nav | `aria-current="page"` |
| Decorative image | `alt=""` |
| Meaningful image | Descriptive `alt` text |

### Accessible names checklist

Every interactive element must have an accessible name. In priority order:
1. Visible text label (best)
2. `aria-labelledby` pointing to a visible element
3. `aria-label` (use when no visible label is practical)
4. `title` attribute (avoid — tooltip-only, inconsistent screen reader support)

---

## 4. Screen Reader Compatibility (WCAG 4.1.3)

### Live regions

Use `aria-live` to announce dynamic changes:

| Content | `aria-live` value |
|---------|------------------|
| Status messages, success toasts | `"polite"` |
| Error alerts, urgent notices | `"assertive"` |
| Loading spinners | `aria-busy="true"` (not `aria-live`) |

The shadcn/ui `Toaster` (Sonner) handles live region announcements — use it for all notifications.

### Heading hierarchy

Every page must have exactly **one `<h1>`**. Headings must not skip levels (`h1` → `h3` without an `h2` is invalid).

```
<h1> Page title (one per page)
  <h2> Section heading
    <h3> Sub-section heading
```

### Images and icons

- All `<img>` elements must have an `alt` attribute.
- Decorative icons: `aria-hidden="true"`.
- Meaningful icons without visible label: `aria-label` on the button/link parent.

---

## 5. Responsive & Motion Accessibility (WCAG 1.4.10, 2.3.3)

### Reflow (WCAG 1.4.10)

Content must be usable at **400% zoom** without horizontal scrolling (except for content that requires 2D layout, e.g. data tables).

Design rules:
- Use relative units (`rem`, `%`, `fr`) rather than fixed `px` for layout containers.
- Text sizes in `rem` scale correctly with browser font size preferences.
- Avoid `overflow: hidden` on containers that truncate scaled text.

### Reduced motion (WCAG 2.3.3)

All animations must respect `prefers-reduced-motion`. Use Tailwind's `motion-safe:` and `motion-reduce:` variants:

```html
<!-- Use motion-safe to only apply animation when the user hasn't requested reduced motion -->
<div class="motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none">
```

Never use `animation` or `transition` without a `motion-reduce` override.

---

## 6. Forms (WCAG 1.3.1, 3.3.1, 3.3.2)

- Every input must have an associated `<label>` (via `for`/`id` or `aria-labelledby`).
- Never use placeholder text as a substitute for a label.
- Error messages must be:
  - Programmatically associated with the input (`aria-describedby`).
  - Displayed as visible text (not only color or icon).
  - Specific: "Password must be at least 8 characters" not "Invalid input".
- Required fields must be indicated (use `aria-required="true"` and a visual indicator).
- On form submit error, focus must move to the first field in error or to an error summary.

---

## 7. Testing Checklist (Required Before Shipping UI)

Run this checklist on every new or modified UI surface:

### Automated

- [ ] Run [axe DevTools](https://www.deque.com/axe/) or [Accessibility Insights](https://accessibilityinsights.io/) — zero critical/serious violations allowed.
- [ ] Check all text contrast ratios with WebAIM or browser DevTools.

### Manual

- [ ] Navigate the entire flow with **keyboard only** (no mouse). Can you reach and operate every element?
- [ ] Check focus indicator is visible on every interactive element.
- [ ] Check tab order is logical (matches visual reading order).
- [ ] Test with **VoiceOver (macOS/iOS)** or **NVDA (Windows)**: does the screen reader announce the correct element type, state, and label?
- [ ] Zoom to 200% and 400%: does content reflow correctly? No horizontal scroll?
- [ ] Test on **mobile** (320px viewport): are touch targets ≥ 44×44px?
- [ ] Set `prefers-reduced-motion: reduce` in OS: do animations disable/reduce?
- [ ] Check all empty, loading, and error states are accessible (announced, navigable).

### Component-specific

- [ ] All modals trap focus and return focus on close.
- [ ] All icon-only buttons have `aria-label`.
- [ ] All form fields have associated labels and error messages.
- [ ] All images have `alt` (empty for decorative, descriptive for meaningful).
- [ ] Navigation has `aria-current="page"` on active item.

---

## References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/)
- [Design system tokens](../../packages/design-system/README.md)
- [IX principles](ix-principles.md)
- [Component review checklist](component-review-checklist.md)
