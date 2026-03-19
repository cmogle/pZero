# Developer Documentation UX — Phoenix OS SDK & CLI

**Issue:** INT-25
**Parent:** [INT-5 — Phase 4 Developer Platform](../architecture/)
**Design system:** [packages/design-system/README.md](../../packages/design-system/README.md)
**IX principles:** [ix-principles.md](ix-principles.md)
**Accessibility:** [accessibility.md](accessibility.md)

---

## Overview

This document defines the UX design for the Phoenix OS developer documentation surface — the experience that SDK and CLI users encounter when learning, building, and referencing the platform. It covers information architecture, page layouts, navigation patterns, code sample standards, and component specifications.

**Audience:** Third-party developers and IDA internal teams building on Phoenix OS.

**Design philosophy:** Developer docs earn trust through speed, accuracy, and zero friction. A developer who hits a dead end, can't find an answer, or encounters poorly formatted code will abandon the platform. Every design decision here prioritises: *find it fast, read it once, run it immediately.*

---

## 1. Information Architecture

### Top-level sections

```
Phoenix OS SDK & CLI Documentation
│
├── 1. Getting Started          ← primary acquisition path
│   ├── Installation
│   ├── Your first workflow
│   └── Core concepts (brief)
│
├── 2. Core Concepts            ← mental model building
│   ├── Architecture overview
│   ├── Kernel & process model
│   ├── Runtime & workflow steps
│   ├── Design Intelligence API
│   └── Extension system
│
├── 3. SDK Reference            ← TypeScript (primary) + Python
│   ├── @pzero/sdk — TypeScript
│   │   ├── WorkflowClient
│   │   ├── StepBuilder
│   │   ├── Hooks & callbacks
│   │   └── Types
│   └── pzero-py — Python
│       └── (mirrors TypeScript structure)
│
├── 4. CLI Reference            ← command-first scanning
│   ├── pzero (root)
│   ├── pzero workflow
│   ├── pzero step
│   ├── pzero config
│   └── pzero dev
│
├── 5. Guides                   ← task-based recipes
│   ├── Building a custom workflow step
│   ├── Integrating with account signals
│   ├── Human-in-the-loop approval patterns
│   ├── Testing workflows locally
│   └── Deploying to Phoenix runtime
│
└── 6. Changelog                ← version history
```

### Navigation depth rule

No content is more than **3 clicks** from the documentation landing page. Sidebar nesting is capped at **2 levels** (section → page). Sub-headings within a page are navigated via in-page anchor links, not sidebar nesting.

---

## 2. Getting Started — Layout and Flow

The Getting Started flow is the highest-leverage surface in developer docs. A user who completes "Your first workflow" within 10 minutes is retained. One who cannot is lost.

### 2.1 Structure

The Getting Started section follows a **linear wizard pattern** with explicit step progression. Each page is one step; steps are numbered and linked via a persistent top-of-page progress indicator.

```
Step 1: Install    Step 2: Connect    Step 3: First Workflow    Step 4: Deploy
   ●─────────────────────────────────────────────────────────────────○
 (current)
```

| Step | Title | Goal | Max time-to-complete |
|------|-------|------|---------------------|
| 1 | Installation | SDK installed, CLI authenticated | 2 min |
| 2 | Connect to runtime | Local dev server running | 3 min |
| 3 | Your first workflow | "Hello workflow" step executes | 5 min |
| 4 | Deploy | Workflow running on Phoenix runtime | 5 min |

### 2.2 Page layout — Getting Started step

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Left sidebar — nav]  │  [Main content]                │  [TOC]     │
│                        │                                │            │
│  Getting Started ▼     │  Step 1 of 4 — Installation   │  On this   │
│    Installation  ←     │  ══════════════════════════    │  page:     │
│    Connect             │                                │  ─────     │
│    First Workflow      │  Install the Phoenix OS SDK    │  Install   │
│    Deploy              │  using npm or pnpm.            │  SDK       │
│                        │                                │  Auth CLI  │
│  Core Concepts ▶       │  ┌────────────────────────┐   │  Verify    │
│  SDK Reference ▶       │  │ npm install @pzero/sdk  │   │            │
│  CLI Reference ▶       │  │ npm install -g pzero    │   │            │
│  Guides ▶              │  └────────────────────────┘   │            │
│  Changelog             │                                │            │
│                        │  Authenticate the CLI:         │            │
│                        │  ┌────────────────────────┐   │            │
│                        │  │ pzero auth login        │   │            │
│                        │  └────────────────────────┘   │            │
│                        │                                │            │
│                        │  ─────────────────────────    │            │
│                        │                                │            │
│                        │  [← Back]  [Next: Connect →]  │            │
└──────────────────────────────────────────────────────────────────────┘
```

**Mobile (< 768px):** Left sidebar hidden behind a hamburger menu (Sheet). Right TOC hidden; in-page anchor links shown at the top of each step. Prev/Next nav sticky at bottom of screen.

### 2.3 Step page anatomy

Each Getting Started step page contains, in order:

1. **Step progress bar** — horizontal pill indicators (4 steps). Active step is filled indigo; complete steps are emerald; pending steps are zinc.
2. **Page title** — h1, large, `text-zinc-50`
3. **Estimated time** — `font-mono text-xs text-zinc-500` (e.g. "~2 min")
4. **Body content** — prose instructions, code blocks, callout boxes
5. **Prerequisite check (optional)** — collapsible "Before you begin" callout if step has dependencies
6. **Divider**
7. **Prev / Next navigation** — full-width on mobile, right-aligned on desktop

### 2.4 Callout patterns

| Type | When to use | Visual |
|------|-------------|--------|
| `note` | Extra context, not required | Left border `border-indigo-500`, `bg-indigo-500/5` |
| `tip` | Shortcut or helpful hint | Left border `border-emerald-500`, `bg-emerald-500/5` |
| `warning` | User could make a mistake | Left border `border-amber-500`, `bg-amber-500/5` |
| `danger` | Destructive or data-loss risk | Left border `border-red-600`, `bg-red-600/5` |

Callout anatomy:
```
┌──────────────────────────────────────────┐
│ ▌ [Icon] [TYPE]                          │  ← border-l-2 accent + label
│   Content text in regular prose style.  │
└──────────────────────────────────────────┘
```

All callouts use `rounded-r-md`, left border only, `p-4`, and a small icon (`Info`, `Lightbulb`, `TriangleAlert`, `CircleAlert` from Lucide).

---

## 3. API Reference — Page Design Patterns

The API reference is a **lookup surface**, not reading material. Users arrive knowing what they want; the design must support fast scanning and copy-paste.

### 3.1 Two-column layout (desktop ≥ 1024px)

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Left sidebar]  │  [Description column — 55%]  │ [Code column—45%] │
│                  │                               │                   │
│                  │  WorkflowClient.run()         │  TypeScript       │
│                  │  ──────────────────────────   │  ┌─────────────┐ │
│                  │                               │  │ const result│ │
│                  │  Executes a named workflow     │  │   = await   │ │
│                  │  with optional input           │  │  client.run │ │
│                  │  parameters. Returns a         │  │  ('my-wf',  │ │
│                  │  WorkflowRun handle.           │  │  { input }) │ │
│                  │                               │  └─────────────┘ │
│                  │  Parameters                   │                   │
│                  │  ──────────────               │  Response         │
│                  │  name  string  required        │  ┌─────────────┐ │
│                  │  input object  optional        │  │ {           │ │
│                  │                               │  │   runId,    │ │
│                  │  Returns: WorkflowRun          │  │   status    │ │
│                  │                               │  │ }           │ │
│                  │  Throws                       │  └─────────────┘ │
│                  │  WorkflowNotFoundError         │                   │
│                  │  RuntimeUnavailableError       │                   │
└──────────────────────────────────────────────────────────────────────┘
```

**Mobile / tablet (< 1024px):** Single column. Code block follows its description inline. Language tabs collapse to a compact selector.

### 3.2 Method/function entry anatomy

Each API entry consists of:

1. **Anchor-linked heading** — `h2` or `h3` depending on nesting. Always includes a `#` link icon on hover for deep-linking.
2. **Method signature** — shown in a `<pre>` block using Geist Mono, syntax-highlighted. Language is TypeScript by default; Python tab available.
3. **Description** — 1–3 sentences. No filler.
4. **Parameter table:**

| Column | Notes |
|--------|-------|
| Name | `font-mono text-indigo-400` |
| Type | `font-mono text-zinc-400` |
| Required/Optional | Badge: `required` = `bg-red-600/10 text-red-400`, `optional` = `bg-zinc-800 text-zinc-500` |
| Description | Plain prose |

5. **Returns** — type and brief description. If complex, links to the type definition.
6. **Throws** — list of error types, each linking to their error reference page.
7. **Example** — at least one working code example in the right column (or inline on mobile).

### 3.3 Type definition entries

```
┌────────────────────────────────────────┐
│  WorkflowStep                          │  ← h3 with anchor
│  ────────────────────                  │
│  interface WorkflowStep {              │  ← syntax-highlighted interface
│    id: string;                         │
│    label: string;                      │
│    status: StepStatus;                 │  ← StepStatus is a link
│    ...                                 │
│  }                                     │
│                                        │
│  Properties:                           │  ← table as above
│  ...                                   │
└────────────────────────────────────────┘
```

Types link bidirectionally: methods link to their return/param types; types list which methods use them (a "Used by" collapsible at the bottom of each type entry).

### 3.4 API reference visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Method name (h2) | `text-lg font-semibold text-zinc-50 font-mono` |
| Method signature block | `bg-zinc-950 border border-zinc-800 rounded-md p-4 font-mono text-sm overflow-x-auto` |
| Parameter name | `text-indigo-400 font-mono text-sm` |
| Parameter type | `text-zinc-400 font-mono text-sm` |
| Required badge | `text-xs px-1.5 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-600/20` |
| Optional badge | `text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500` |
| Section divider | `border-t border-zinc-800 my-6` |
| Anchor link icon | `h-4 w-4 text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 ml-2` |

---

## 4. CLI Reference — Structure

The CLI reference is optimised for **command scanning**. Users look up a specific command; they need the signature, flags, and an example — in that order, fast.

### 4.1 CLI section structure

```
pzero — Phoenix OS CLI
│
├── pzero auth
│   ├── pzero auth login
│   └── pzero auth logout
│
├── pzero workflow
│   ├── pzero workflow list
│   ├── pzero workflow run
│   ├── pzero workflow status
│   └── pzero workflow logs
│
├── pzero step
│   ├── pzero step list
│   └── pzero step inspect
│
├── pzero config
│   ├── pzero config set
│   ├── pzero config get
│   └── pzero config list
│
└── pzero dev
    ├── pzero dev start
    └── pzero dev reset
```

### 4.2 Command entry anatomy

Each CLI command page follows this structure:

**Header:**
```
pzero workflow run
──────────────────
Run a named workflow with optional input.
```

**Synopsis block** (always first code block, always `bash` syntax):
```bash
pzero workflow run <workflow-name> [options]
```

**Options table:**

| Flag | Short | Type | Default | Description |
|------|-------|------|---------|-------------|
| `--input` | `-i` | JSON string | — | Input payload passed to the first step |
| `--env` | `-e` | string | `production` | Target environment |
| `--wait` | | boolean | `false` | Block until the run completes |
| `--timeout` | | number (ms) | `30000` | Timeout when `--wait` is set |

Column treatments:
- Flag: `font-mono text-indigo-400`
- Short: `font-mono text-zinc-400`
- Type: `font-mono text-zinc-500 text-xs`
- Default: `font-mono text-zinc-500 text-xs`

**Examples** (2–3, ordered simple → complex):
```bash
# Run with no input
pzero workflow run my-workflow

# Run with input payload
pzero workflow run my-workflow --input '{"accountId": "acc_123"}'

# Run and wait for completion
pzero workflow run my-workflow --wait --timeout 60000
```

**Exit codes** (collapsible, default closed):

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Workflow not found |
| `3` | Runtime unavailable |

**Related commands** (bottom of page):
```
See also: pzero workflow status · pzero workflow logs · pzero dev start
```

### 4.3 CLI visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Command name (h1) | `text-2xl font-semibold font-mono text-zinc-50` |
| Synopsis block | `bg-zinc-950 border border-zinc-800 rounded-md p-4 font-mono text-sm text-zinc-200` |
| Flag name cell | `font-mono text-sm text-indigo-400 whitespace-nowrap` |
| Short flag cell | `font-mono text-xs text-zinc-400` |
| Default value | `font-mono text-xs text-zinc-500 bg-zinc-900 px-1.5 rounded` |
| Related command link | `font-mono text-sm text-indigo-400 hover:text-indigo-300` |

---

## 5. Code Sample Presentation Standards

Code samples are the most-used element in developer docs. They must be instantly readable, easy to copy, and unambiguous about language and context.

### 5.1 Code block anatomy

```
┌──────────────────────────────────────────────────┐
│  TypeScript              bash            [Copy ✓] │  ← language tabs + copy
├──────────────────────────────────────────────────┤
│  import { WorkflowClient } from '@pzero/sdk'     │
│                                                  │
│  const client = new WorkflowClient({             │
│    endpoint: process.env.PHOENIX_ENDPOINT,       │
│  })                                              │
│                                                  │
│  const run = await client.run('my-workflow', {   │
│    input: { accountId: 'acc_123' },              │
│  })                                              │
│                                                  │
│  console.log(run.runId)                          │
└──────────────────────────────────────────────────┘
```

### 5.2 Rules

**Language tabs:**
- When a code sample has a single language, show the language label (no tabs).
- When multiple languages are available (TypeScript + Python, or shell + JSON output), show tabs. Default selection is TypeScript for SDK samples, `bash` for CLI samples.
- Language label uses `font-mono text-xs text-zinc-500` in the inactive tab, `text-zinc-200` when active.
- Active tab has `border-b-2 border-indigo-500`.

**Copy button:**
- Always present on every code block.
- Position: top-right corner of the code block, `absolute top-3 right-3`.
- Default state: `Copy` label or clipboard icon.
- Success state: `Copied!` with emerald checkmark, reverts after 2 seconds.
- `aria-label="Copy code sample"` always set.

**Line highlighting:**
- Key lines can be highlighted with `bg-indigo-500/10` background.
- Used sparingly — maximum 3 highlighted lines per block.
- Highlighted lines have a left accent: `border-l-2 border-indigo-500 pl-3`.

**Filename labels:**
- When a code block represents a specific file, show the filename above the block:
  ```
  pzero.config.ts
  ──────────────
  [code block]
  ```
- Filename in `font-mono text-xs text-zinc-400`.

**Long code blocks:**
- Code blocks are not height-capped in API reference or guides (full content visible).
- In Getting Started, blocks > 30 lines show the first 20 lines with a "Show full code" expand toggle.

### 5.3 Syntax highlighting theme

Dark theme using the design system palette:

| Token type | Color |
|-----------|-------|
| Keyword (`import`, `const`, `async`) | `text-indigo-400` |
| String literals | `text-emerald-400` |
| Comments | `text-zinc-500 italic` |
| Type annotations | `text-sky-400` |
| Function/method names | `text-zinc-200` |
| Variable names | `text-zinc-100` |
| Property names | `text-zinc-300` |
| Numbers | `text-amber-400` |
| Operators | `text-zinc-400` |
| Shell commands / CLI flags | `text-indigo-300` |
| Shell output / responses | `text-zinc-400` |

### 5.4 Runnable examples

For Getting Started and Guides, code samples that can be run immediately include a **"Run this"** annotation below the block:

```
┌──────────────────────────┐
│ pzero dev start          │
└──────────────────────────┘
  ↑ You can run this command now. See pzero dev for options.
```

This annotation uses `text-xs text-zinc-500` and links to the relevant CLI reference page.

---

## 6. Navigation and Search Patterns

### 6.1 Left sidebar

The primary navigation surface. Present on all documentation pages.

**Structure:**
```
┌──────────────────────────┐
│  pZero Docs         [⌘K] │  ← logo/brand + search shortcut
├──────────────────────────┤
│  Getting Started      ▼  │  ← expanded by default on landing
│    Installation       ←  │  ← active page indicator
│    Connect               │
│    First Workflow         │
│    Deploy                │
│                          │
│  Core Concepts        ▶  │  ← collapsed; click to expand
│  SDK Reference        ▶  │
│  CLI Reference        ▶  │
│  Guides               ▶  │
│  Changelog               │
└──────────────────────────┘
```

**Sidebar width:** 256px on desktop. Hidden on mobile (behind hamburger, reveals as Sheet from left).

**Active page:** `bg-zinc-800 text-zinc-50 rounded-md` on the active item. Left accent: `border-l-2 border-indigo-500`.

**Section headers:** `text-xs font-medium text-zinc-500 uppercase tracking-widest` — not interactive.

**Nav items:** `text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-md px-3 py-1.5` — interactive.

**Expand/collapse:** Sections expand on click, chevron rotates 90°. State persists in `localStorage` per session.

**Keyboard:** Full keyboard navigation. Arrow keys move between items. Enter/Space follows links or toggles sections. `aria-current="page"` on active item.

### 6.2 Search

**Trigger:** `⌘K` (Mac) / `Ctrl+K` (Windows/Linux) from anywhere. Also a persistent search button in the sidebar header and a search input on the docs landing page.

**Modal pattern:**
```
┌───────────────────────────────────────┐
│  [🔍] Search documentation...   [Esc]│
├───────────────────────────────────────┤
│  Recent searches                      │
│  › WorkflowClient.run                 │
│  › pzero workflow                     │
├───────────────────────────────────────┤
│  Results                              │
│  ────────                             │
│  WorkflowClient.run()  SDK Reference  │
│  pzero workflow run    CLI Reference  │
│  Run a workflow        Guides         │
└───────────────────────────────────────┘
```

- Modal opens on `⌘K`, closes on `Esc` or click-outside.
- Results show title, section breadcrumb, and a snippet of matching text.
- Section breadcrumb: `font-mono text-xs text-zinc-500`.
- Highlighted match: `bg-indigo-500/20 text-indigo-300`.
- Arrow keys navigate results; Enter follows selected result.
- `role="combobox"` with `aria-expanded`, `aria-controls` pointing to results list.
- Results list: `role="listbox"`, each result: `role="option"`.

### 6.3 In-page table of contents (TOC)

Visible on the right on desktop (≥ 1280px). Hidden below that.

**Behaviour:**
- Lists all `h2` and `h3` headings on the current page.
- Active heading highlighted as user scrolls (intersection observer, 64px top offset to account for sticky header).
- `text-xs text-zinc-400` for inactive items; `text-zinc-200` for active.
- Active item has `border-l-2 border-indigo-500 pl-3`.
- TOC header: `text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3` — "On this page".

### 6.4 Breadcrumb

Present when a user is inside a section (not on the docs root):

```
Docs  /  SDK Reference  /  WorkflowClient  /  run()
```

- Uses `Breadcrumb` shadcn/ui primitive.
- `text-sm text-zinc-500`; current page item is `text-zinc-200` (non-linked).
- Visible below the sidebar's top rail, above the page title.

### 6.5 Prev / Next navigation

At the bottom of every content page:

```
┌───────────────────────────────────────────────────┐
│  [← Installation]              [First Workflow →] │
│     Previous                              Next     │
└───────────────────────────────────────────────────┘
```

- `border border-zinc-800 rounded-md p-4 hover:border-zinc-700 hover:bg-zinc-900` card style.
- Direction label: `text-xs text-zinc-500`.
- Page title: `text-sm font-medium text-zinc-200`.
- Arrow icon: Lucide `ChevronLeft` / `ChevronRight`, `h-4 w-4 text-zinc-400`.
- On mobile: stacked vertically, full-width.

---

## 7. Responsive Behaviour Summary

| Viewport | Sidebar | TOC | Code blocks | Layout |
|----------|---------|-----|-------------|--------|
| `< 768px` (mobile) | Hidden (Sheet, hamburger) | Hidden | Single col, scrollable | Single column, full width |
| `768px–1023px` (tablet) | Icon-only, expandable | Hidden | Single col, scrollable | Single column with side padding |
| `1024px–1279px` (desktop sm) | Full 256px sidebar | Hidden | Two-col for API reference | Three-zone without TOC |
| `≥ 1280px` (desktop lg) | Full 256px sidebar | Visible 200px | Two-col for API reference | Full three-zone layout |

---

## 8. Accessibility Requirements

All documentation pages must meet **WCAG 2.1 AA**. Key requirements specific to dev docs:

- **Code blocks:** `<pre>` + `<code>` with correct `lang` attribute. Code does not need to be screen-reader-friendly verbatim, but must be accessible as a block (not invisible).
- **Copy button:** `aria-label="Copy code to clipboard"`, focus-visible ring. On success: `aria-live="polite"` announces "Copied" to screen readers.
- **Syntax highlighting:** Color alone must not convey meaning. Token type labels are not needed visually, but semantic structure (keywords in `<keyword>` wrappers) aids screen reader tools.
- **Search modal:** Full `role="combobox"` pattern, focus trap while open, `aria-activedescendant` tracks selected result. Returns focus to trigger on close.
- **Sidebar nav:** `<nav aria-label="Documentation navigation">` wrapper. `aria-current="page"` on active link.
- **Collapsible sections:** `aria-expanded` on toggle buttons; controlled panel has matching `aria-controls` + `id`.
- **Heading hierarchy:** Each page has exactly one `h1`. Subheadings use `h2` → `h3` without skipping levels.
- **Keyboard-only test:** A developer must be able to navigate the entire documentation, open search, select a result, and copy a code block without using a mouse.

---

## 9. Open Questions for Engineering

1. **Documentation build system** — Should developer docs be built with [Geistdocs](https://preview.geistdocs.com/docs) (Fumadocs + Next.js template) or integrated into the main pZero Next.js app as a `/docs` route? Geistdocs provides MDX authoring, TOC, search, and i18n out of the box and would significantly reduce build effort. Recommendation: Geistdocs unless there is a strong reason to keep docs inside the main app.

2. **Search implementation** — If Geistdocs is used, Fumadocs provides Orama (client-side, no server) and Algolia connectors. If custom, Orama is the recommended client-side option. Confirm which before implementation begins.

3. **API reference generation** — TypeScript SDK types are defined in `@pzero/sdk`. Can API reference pages be auto-generated from TSDoc comments via typedoc-plugin-markdown + Fumadocs? This would keep reference docs in sync with code. Requires TSDoc comment discipline in the SDK package.

4. **Python SDK parity** — Python SDK (`pzero-py`) does not yet exist per INT-5 scope. Should the doc structure reserve Python tabs in the API reference now (with a "coming soon" state), or add them when the SDK ships?

5. **Versioning** — Will docs need to support multiple SDK/CLI versions simultaneously? If so, the URL structure should include a version prefix (`/docs/v1/...`) from day one. Retrofitting versioning is expensive.

---

## 10. Implementation Notes

- Use `geistdocs` template for the documentation site (see open question 1).
- All code block components should be server-rendered where possible. The copy button is the only `'use client'` piece.
- The search modal should load lazily (`dynamic(() => import(...), { ssr: false })`).
- TOC active state must use `IntersectionObserver`, not scroll event listeners, for performance.
- Syntax highlighting: use [Shiki](https://shiki.style) server-side — no client JS for highlighting. Theme should be a custom JSON file derived from the token colors in section 5.3.
- The sidebar expand/collapse state should be stored in `localStorage` under the key `pzero-docs-nav-state`.
