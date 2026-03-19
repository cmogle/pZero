# pZero Interaction (IX) Principles

The north star: **users must reach, interpret, and act on intelligence in as few clicks as possible** — on any screen size.

pZero users are sceptical. They have been burned by tools that demanded re-keying, excessive navigation, and unclear workflows. Every interaction we design must disprove that assumption immediately.

---

## The Three-Click Rule

No user should require more than **3 interactions** to complete any of the three primary actions:

| Action | Meaning | Maximum interactions |
|--------|---------|---------------------|
| **Access data** | Navigate to the relevant account / signal / report | 2 |
| **Interpret intelligence** | Read the AI summary, understand the insight | 0 (must be visible on arrival) |
| **Action an item** | Trigger a workflow, approve content, send a handoff | 1 |

If a flow violates these limits, it must be redesigned before shipping. The exception is destructive actions, which require a confirmation step (AlertDialog).

---

## Key Workflow Specifications

### 1. Access Data (≤ 2 interactions)

**Goal:** User lands on the right account or data view.

```
App load / login
  → Dashboard (auto-loads last-viewed or highest-priority accounts)
    → [1 click] Account row / card
      → Account detail page (all signals, summaries, action queue visible)
```

Design rules:
- The dashboard must surface the **most urgent items** by default — no configuration required to see priority work.
- Search / filter must be reachable in **≤ 1 interaction** from any page (keyboard shortcut or persistent input).
- Account cards must show enough context (name, status, last activity) to decide whether to open without clicking.
- Avoid nested navigation. No more than **2 levels deep** from any entry point.

### 2. Interpret Intelligence (0 interactions)

**Goal:** The AI-generated insight is visible without requiring any click.

Design rules:
- Summaries are **rendered inline** — never behind a "view" button or collapsed accordion by default.
- Use [AI Elements](https://github.com/vercel/ai-elements) `<MessageResponse>` for all AI text. Never render raw markdown strings.
- Streaming responses must show a visible loading state — never a blank panel.
- Confidence or staleness signals (e.g. "Updated 2h ago") must be shown alongside the summary.
- Long content uses progressive disclosure: show the first 3-4 lines, then a "Show more" inline — not a separate page.

### 3. Action an Item (1 interaction)

**Goal:** Trigger the primary workflow action from the current context.

Design rules:
- Every account / signal view must have a **single primary CTA** visible without scrolling.
- CTAs use `variant="default"` (indigo accent). Secondary actions use `variant="outline"` or `variant="ghost"`.
- Destructive actions (delete, reject, cancel) always use `variant="destructive"` and require an `AlertDialog` confirmation.
- Action state feedback must be immediate: button enters loading state on click, success/error toast on resolution.
- Bulk actions on list views are available via multi-select (checkbox column) with a contextual toolbar — never a separate page.

---

## Navigation Patterns

### Global navigation

| Surface | Pattern |
|---------|---------|
| Desktop (≥ 1024px) | Fixed left sidebar, 240px wide, collapsible to icon-only |
| Mobile (< 768px) | Bottom tab bar (max 5 items) + `Sheet` drawer for secondary nav |
| Tablet (768px–1023px) | Icon-only sidebar, expandable on hover / tap |

Rules:
- Navigation items show icon + label on expanded desktop, icon-only when collapsed.
- Current page is always indicated with the accent color and `aria-current="page"`.
- The sidebar must never push content — it overlays on mobile and reserves space on desktop.

### In-page navigation

- Use `Tabs` for switching between views of the same entity (e.g. Overview / Signals / Actions / History).
- Use `Breadcrumb` when the user is 2+ levels deep from a top-level nav item.
- Do not use both Tabs and Breadcrumb in the same view — choose one orientation cue.

---

## Interaction Feedback Requirements

Every user action must produce **immediate, unambiguous feedback**. Silence reads as failure.

| Trigger | Response | Timing |
|---------|----------|--------|
| Button click (async) | Button disabled + spinner | < 100ms |
| Form submit | Field validation inline | Immediate |
| Data load | Skeleton placeholder | While loading |
| Success | Toast (bottom-right, 4s) | On completion |
| Error | Toast (destructive) + inline error if form-related | On completion |
| Optimistic update | Instant UI change, rollback on failure | Immediate |

---

## Empty, Loading, and Error States

Every data surface must handle all three states. Incomplete states are not shippable.

| State | Treatment |
|-------|-----------|
| **Loading** | Skeleton that matches the expected content shape |
| **Empty (no data)** | Illustration/icon + heading + brief explanation + CTA if actionable |
| **Empty (filtered)** | "No results for [filter]" + clear-filter link |
| **Error** | Icon + message + retry action |
| **Offline** | Banner at top of page |

---

## Form UX

- Label every field. Never rely on placeholder text as the only label.
- Show inline validation on blur, not on every keystroke.
- Group related fields visually with `fieldset` or whitespace — not separate cards.
- Primary submit button is always at the bottom-right. Cancel / discard is adjacent (secondary).
- Multi-step forms show progress (step indicator at top). Maximum 4 steps before redesign is required.

---

## Mobile-First Interaction Targets

| Element | Minimum tap target |
|---------|--------------------|
| Button | 44 × 44px |
| Icon button | 44 × 44px (use padding if icon is smaller) |
| List row | 48px tall minimum |
| Checkbox / radio | 44 × 44px touch target |
| Input | 44px tall |

See [responsive.md](responsive.md) for layout breakpoints and [accessibility.md](accessibility.md) for full WCAG requirements.
