# Component Review Checklist

Run this checklist before submitting any UI component or page for UX Lead review. A component that fails any item is **not ready for review**.

This checklist applies to every new component, every modified component, and every new page layout.

---

## Design System Compliance

- [ ] Uses design system color tokens (no hardcoded hex values or ad-hoc Tailwind color classes outside the token set).
- [ ] Uses Geist Sans (`font-sans`) for all interface text and Geist Mono (`font-mono`) for code, IDs, metrics, and timestamps.
- [ ] Spacing is a multiple of 4px (uses Tailwind spacing scale — no arbitrary `px-[13px]` etc.).
- [ ] Border radius matches the token: `rounded` for buttons/inputs, `rounded-md` for cards, `rounded-lg` for modals.
- [ ] No new colors, gradients, or visual effects introduced without UX Lead sign-off.
- [ ] Uses shadcn/ui primitives for standard controls (Button, Input, Select, Dialog, etc.) — no DIY replacements.
- [ ] Icons are Lucide React only. No mixed icon libraries.

---

## Interaction States

- [ ] **Default state** — rendered correctly.
- [ ] **Hover state** — visual feedback present on all interactive elements.
- [ ] **Focus state** — focus ring visible on all interactive elements (keyboard-navigable).
- [ ] **Active / pressed state** — visible for buttons and interactive rows.
- [ ] **Disabled state** — `opacity-50 cursor-not-allowed`, and the element is not keyboard-reachable.
- [ ] **Loading state** — skeleton or spinner shown; UI is not blank while fetching.
- [ ] **Empty state** — empty container shows a message (and CTA if actionable); no blank boxes.
- [ ] **Error state** — error feedback is visible, specific, and actionable.

---

## Accessibility (WCAG 2.1 AA)

See [accessibility.md](accessibility.md) for full requirements. Minimum gate:

- [ ] Entire component is navigable and operable by keyboard alone (Tab, Shift+Tab, Enter, Space, Arrow keys).
- [ ] Focus indicator is visible on every interactive element (uses design system focus ring).
- [ ] Tab order matches visual reading order (top-left → bottom-right).
- [ ] Every interactive element has an accessible name (visible label, `aria-label`, or `aria-labelledby`).
- [ ] Icon-only buttons have `aria-label`.
- [ ] Decorative icons have `aria-hidden="true"`.
- [ ] Meaningful images have descriptive `alt` text.
- [ ] All color contrast ratios meet WCAG 1.4.3 (4.5:1 for normal text, 3:1 for large text and UI components).
- [ ] Modals trap focus and return focus to trigger on close.
- [ ] Dynamic content changes use `aria-live` or `role="alert"` as appropriate.
- [ ] No `outline: none` without a custom focus replacement.
- [ ] Axe DevTools scan: zero critical or serious violations.

---

## Responsive Behaviour

See [responsive.md](responsive.md) for full breakpoint spec.

- [ ] Tested at **320px** (smallest phone): no horizontal scroll, content readable, touch targets ≥ 44px.
- [ ] Tested at **768px** (tablet): layout correct, navigation correct.
- [ ] Tested at **1280px** (desktop): full layout, no unexpected overflow.
- [ ] No content is hidden on mobile without an accessible alternative.
- [ ] Tables have `overflow-x-auto` wrapper on mobile.
- [ ] Modals are full-screen or use `Sheet` on mobile (< 640px).

---

## Performance & Code Quality

- [ ] `'use client'` is used only when browser APIs or interactivity require it. Server Components by default.
- [ ] No unnecessary re-renders: memoization or state structure reviewed.
- [ ] No `console.log` statements left in submitted code.
- [ ] Images use `next/image` with correct `alt`, `width`, and `height`.
- [ ] Fonts are loaded via `next/font` (Geist) — no direct `@import` of font files.
- [ ] No inline styles (`style={{ ... }}`) unless absolutely necessary and documented.

---

## AI Content (when applicable)

- [ ] AI-generated text uses `<MessageResponse>` from AI Elements — never raw `{text}` or `<p>{content}</p>`.
- [ ] Streaming AI responses have a visible loading/streaming indicator.
- [ ] Staleness or generation timestamp is shown alongside AI content.

---

## Submitting for Review

1. Self-review against this checklist. Fix all failures before submitting.
2. Post a PR comment with: component name, what it does, any checklist items that need UX Lead clarification.
3. Tag `@UX Lead` in the Paperclip issue for review.

A component passes review when the UX Lead marks it approved. Approved does not mean perfect — it means shippable.

---

## References

- [Design system tokens](../../packages/design-system/README.md)
- [IX principles](ix-principles.md)
- [Accessibility standards](accessibility.md)
- [Responsive breakpoints](responsive.md)
