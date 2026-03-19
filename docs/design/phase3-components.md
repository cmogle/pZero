# Phase 3 UI Components — Phoenix Design API Consumer Layer

**Issue:** INT-22
**Design system:** [packages/design-system/README.md](../../packages/design-system/README.md)
**IX principles:** [ix-principles.md](ix-principles.md)
**Accessibility:** [accessibility.md](accessibility.md)

---

## Overview

These components form the frontend surface for the Phase 3 Phoenix Design API (ADR-007). They consume the runtime types exposed by `@pzero/runtime` and present AI-driven workflow execution, intelligence output, action artifact review, and real-time collaboration state.

Five components are specified here:

| Component | File | Purpose |
|-----------|------|---------|
| `WorkflowVisualization` | `WorkflowVisualization.tsx` | Show a design workflow run progressing through steps |
| `AIOutputPanel` | `AIOutputPanel.tsx` | Surface AI intelligence: signal, reasoning, playbook selection |
| `ArtifactReviewPanel` | `ArtifactReviewPanel.tsx` | AM approve / reject / edit interface for action artifacts |
| `PresenceBar` | `PresenceBar.tsx` | Live collaboration: connected users, last-updated indicator |
| Index barrel | `index.ts` | Re-exports all four components + their prop types |

All components:
- Dark-mode only (`bg-zinc-950` root)
- Zinc/indigo palette — no additional accent colors
- Geist Sans for labels, Geist Mono for machine-generated content (reasoning, IDs, timestamps)
- WCAG 2.1 AA contrast — all text pairs verified
- Mobile-first, tested at 320 / 375 / 768 / 1024 / 1280px
- Keyboard-navigable with `ring-indigo-500` focus indicators
- All interactive states: default / hover / focus / active / disabled / loading / empty / error

---

## 1. WorkflowVisualization

### Purpose

Displays a design workflow run as an ordered vertical timeline. Users can see which steps are completed, which is active, and which are pending — without any interaction required. This satisfies the **zero-click intelligence** principle (IX § 2).

### Data contract

```ts
// Maps to ADR-007 Phoenix Design API shape
interface WorkflowStep {
  id: string;
  label: string;
  type: 'task' | 'ai_call' | 'gate';
  status: 'pending' | 'running' | 'done' | 'failed';
  startedAt?: string; // ISO 8601
  completedAt?: string;
  /** Optional AI model hint displayed in the step detail */
  aiModel?: string;
}

interface WorkflowVisualizationProps {
  runId: string;
  workflowName: string;
  status: 'idle' | 'running' | 'done' | 'failed';
  steps: WorkflowStep[];
  /** ISO timestamp of last status update */
  updatedAt?: string;
  /** Skeleton loading state */
  loading?: boolean;
}
```

### Layout

```
┌─────────────────────────────────────────────────┐
│  [WORKFLOW NAME]                    [STATUS BADGE]│
│  Run: run_abc123                    Updated 2m ago│
├─────────────────────────────────────────────────┤
│  ●──●──◉──○──○                                  │
│  done done active pending pending               │
│                                                 │
│  ┌ Step 1: Signal ingestion     ✓ done  0.2s ┐  │
│  │ Step 2: Consideration pass   ✓ done  0.4s │  │
│  │ Step 3: AI call              ◉ 1.2s...   │  │ ← pulsing ring
│  │ Step 4: Assemble artifact    ○ pending    │  │
│  └ Step 5: Submit for review    ○ pending    ┘  │
└─────────────────────────────────────────────────┘
```

**Mobile (< 768px):** Steps collapse to an icon-only horizontal scroller for the progress rail; tapping a step expands its detail inline below the rail.

### Visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Container | `bg-zinc-900 border border-zinc-800 rounded-md p-4` |
| Workflow name | `text-sm font-medium text-zinc-50` |
| Run ID | `font-mono text-xs text-zinc-500` |
| Status badge: running | `bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded px-2 py-0.5 text-xs` |
| Status badge: done | `bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 text-xs` |
| Status badge: failed | `bg-red-600/10 text-red-400 border border-red-600/30 rounded px-2 py-0.5 text-xs` |
| Step connector line | `w-0.5 bg-zinc-800 mx-auto` (vertical) |
| Step icon: done | `h-4 w-4 text-emerald-500` (CheckCircle2) |
| Step icon: running | `h-4 w-4 text-indigo-400 animate-pulse` (Loader2 + spin) |
| Step icon: failed | `h-4 w-4 text-red-500` (XCircle) |
| Step icon: pending | `h-4 w-4 text-zinc-700` (Circle) |
| Step label | `text-sm text-zinc-300` |
| Step meta (type, time) | `font-mono text-xs text-zinc-500` |
| AI step type badge | `bg-indigo-500/10 text-indigo-400 text-xs px-1.5 rounded` |

### Accessibility

- `role="list"` on steps container; `role="listitem"` per step
- `aria-label="Step {n} of {total}: {label}, {status}"` on each step icon
- Running step: `aria-busy="true"` on the step container
- `aria-current="step"` on the active step
- Screen reader announces status changes via `aria-live="polite"` region at component root

### States

| State | Behaviour |
|-------|-----------|
| Loading | Full skeleton: header 2 lines, 5 step rows |
| Empty (0 steps) | "No steps defined" empty state with `Workflow` icon |
| Running | Active step pulses; elapsed timer ticks every second |
| Done | All steps show check; status badge turns emerald |
| Failed | Failed step shows red X; error detail shown below step |

---

## 2. AIOutputPanel

### Purpose

Surfaces the AI intelligence output — signal headline, reasoning chain, and playbook selection — with zero clicks required (IX § 2). Machine-generated reasoning is rendered in monospace to visually distinguish it from human-written labels. Long reasoning is progressively disclosed after 4 lines via an inline "Show more" toggle.

### Data contract

```ts
import type { DecisionResult } from '@pzero/runtime';

interface AIOutputPanelProps {
  decision: DecisionResult;
  /** ISO timestamp — shown as "Updated X ago" */
  generatedAt?: string;
  loading?: boolean;
}

// DecisionResult (from runtime):
// {
//   shouldRespond: boolean;
//   playbookId?: string;
//   selectedBlockIds: string[];
//   reasoning: string;    ← render in Geist Mono
//   signalHeadline: string;
// }
```

### Layout

```
┌─────────────────────────────────────────────────┐
│  SIGNAL                           Updated 4m ago │
│  ─────────────────────────────────────────────── │
│  [Signal headline text — large, prominent]       │
│                                                 │
│  AI REASONING                                   │
│  ┌─────────────────────────────────────────────┐│
│  │ Because the account has not engaged in 14   ││ ← monospace
│  │ days and the last signal indicates renewal  ││
│  │ risk, we are triggering Playbook: Re-engage ││
│  │ (Mid-Cycle). Confidence: High.              ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  SELECTED PLAYBOOK          CONTENT BLOCKS      │
│  [Re-engage (Mid-Cycle)]    3 blocks selected   │
└─────────────────────────────────────────────────┘
```

**If `shouldRespond` is false:** Show a neutral state: "No action recommended" with the reasoning still visible.

**Mobile (< 768px):** Playbook and content blocks stack vertically; signal headline drops to `text-xl`.

### Visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Container | `bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-4` |
| Section label | `text-xs font-medium text-zinc-500 uppercase tracking-widest` |
| Signal headline | `text-xl lg:text-2xl font-semibold text-zinc-50 leading-snug` |
| Timestamp | `font-mono text-xs text-zinc-500` |
| Reasoning box | `bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-sm text-zinc-300 leading-relaxed` |
| "Show more" toggle | `text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer` (inline, no button chrome) |
| Playbook badge | `inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-3 py-1.5 rounded` |
| Playbook icon | `h-3 w-3` (Sparkles) |
| Block count | `text-sm text-zinc-400` |
| No-action state | `text-zinc-500 italic text-sm` |

### Accessibility

- Reasoning box: `role="region" aria-label="AI reasoning"`
- If reasoning is truncated: toggle button has `aria-expanded="false/true"` and `aria-controls="{id}"` on the hidden region
- Playbook badge is `role="status"` — not interactive
- `aria-live="polite"` wrapper so screen readers announce when new output arrives

### States

| State | Behaviour |
|-------|-----------|
| Loading | Skeleton: 1 headline line, 4 reasoning lines, 2 badge placeholders |
| shouldRespond: false | "No action recommended" + reasoning still shown |
| Reasoning > 4 lines | Truncate with gradient fade + "Show more" button |
| Streaming | Reasoning text streams in character by character (optional) |

---

## 3. ArtifactReviewPanel

### Purpose

The primary human-in-the-loop interface. Account Managers review the assembled action artifact, inspect the decision reasoning, then approve, reject, or edit before anything is dispatched. This is INT-15 surfaced in UI. **No autonomous send without approval.**

### Data contract

```ts
import type { ReviewPayload, ReviewVerdict } from '@pzero/runtime';

interface ArtifactReviewPanelProps {
  payload: ReviewPayload;
  onVerdict: (verdict: ReviewVerdict) => Promise<void> | void;
  /** Shown while onVerdict is resolving */
  submitting?: boolean;
  /** If provided, shown as a success/error banner after verdict */
  result?: { accepted: boolean; message?: string };
}

// ReviewPayload = { decision: DecisionResult, artifact: ActionArtifact }
// ActionArtifact = { kind: string, body: string, sourceBlockIds: string[] }
// ReviewVerdict =
//   | { outcome: 'approved'; editedBody?: string }
//   | { outcome: 'rejected'; reason?: string }
//   | { outcome: 'edit'; body: string }
```

### Layout

Three-state panel (review → editing → confirming):

**Review state (default):**
```
┌─────────────────────────────────────────────────┐
│  REVIEW ACTION ARTIFACT        [artifact.kind]  │
│  ─────────────────────────────────────────────── │
│  WHY THIS ACTION                                │
│  ┌─────────────────────────────────────────────┐│
│  │ Because [signal], triggering Playbook X.    ││ ← monospace, read-only
│  └─────────────────────────────────────────────┘│
│                                                 │
│  DRAFTED CONTENT                                │
│  ┌─────────────────────────────────────────────┐│
│  │                                             ││
│  │  [artifact.body — read-only view]           ││
│  │                                             ││
│  └─────────────────────────────────────────────┘│
│  3 content blocks  ·  source IDs shown on hover │
│                                                 │
│  [Edit]  [Reject]          [Approve ✓]          │
└─────────────────────────────────────────────────┘
```

**Editing state (after clicking Edit):**
```
│  DRAFTED CONTENT          [editing]             │
│  ┌─────────────────────────────────────────────┐│
│  │                                             ││ ← textarea, auto-height
│  │  [editable artifact body]                   ││
│  │                                             ││
│  └─────────────────────────────────────────────┘│
│  [Cancel]                  [Save and Approve ✓] │
```

**Rejecting state (after clicking Reject):**
```
│  REASON FOR REJECTION (optional)                │
│  ┌─────────────────────────────────────────────┐│
│  │  [reason textarea]                          ││
│  └─────────────────────────────────────────────┘│
│  [Cancel]                  [Confirm Reject ✗]   │
```

**Mobile (< 768px):** All three buttons stack vertically, full-width. Destructive (Reject) moves to bottom. Approve is always the largest, topmost action.

### Visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Panel container | `bg-zinc-900 border border-zinc-800 rounded-md` |
| Header | `px-4 py-3 border-b border-zinc-800 flex items-center justify-between` |
| Title | `text-sm font-medium text-zinc-50` |
| Kind badge | `font-mono text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded` |
| Reasoning box | `bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-sm text-zinc-300` |
| Artifact read-only | `bg-zinc-950 border border-zinc-800 rounded p-4 text-sm text-zinc-200 whitespace-pre-wrap min-h-32` |
| Artifact textarea | `bg-zinc-950 border border-indigo-500 ring-1 ring-indigo-500 rounded p-4 text-sm text-zinc-200 w-full resize-none min-h-32 focus:outline-none` |
| Source block count | `font-mono text-xs text-zinc-500` |
| Approve button | `bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded focus-visible:ring-2 focus-visible:ring-indigo-500` |
| Edit button | `border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-sm px-4 py-2 rounded` |
| Reject button | `text-zinc-400 hover:text-red-400 text-sm px-4 py-2 rounded` |
| Confirm reject | `bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded` |
| Save & approve | `bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded` |
| Loading button | `opacity-60 cursor-not-allowed` + spinner icon |
| Success banner | `bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded` |
| Rejected banner | `bg-zinc-800 text-zinc-400 text-sm p-3 rounded` |

### Accessibility

- Panel: `role="region" aria-label="Artifact review"`
- Approve: `aria-label="Approve action artifact"`
- Reject: `aria-label="Reject action artifact"`
- Edit: `aria-label="Edit action artifact"`
- Destructive confirm (AlertDialog pattern): `role="alertdialog"` when reject confirmation is visible
- Textarea: `aria-label="Edit artifact body"` with `aria-required="false"`
- Reason field: `aria-label="Rejection reason (optional)"`
- On submit: button enters `aria-busy="true"` disabled state
- Result banner: `role="alert"` with `aria-live="assertive"` for screen reader announcement
- Focus moves to approve button on panel mount (primary action should be ready for keyboard-only users)

### States

| State | Behaviour |
|-------|-----------|
| Review (default) | Read-only view of reasoning + artifact; three action buttons |
| Editing | Textarea replaces read-only view; Save+Approve / Cancel |
| Rejecting | Reason textarea appears; Confirm Reject / Cancel |
| Submitting | All buttons disabled, approve/save shows spinner |
| Accepted | Success banner: "Approved — handed off to execution" |
| Rejected | Neutral banner: "Rejected — no action taken" |

---

## 4. PresenceBar

### Purpose

Indicates live collaboration state: which users/agents are viewing the same workflow run, when the data was last updated, and whether the run is actively broadcasting events. Zero-click visibility.

### Data contract

```ts
interface Collaborator {
  id: string;
  name: string;
  /** 1-2 char initials fallback */
  initials: string;
  /** Hex or Tailwind-compatible color for avatar ring */
  color?: string;
  isCurrentUser?: boolean;
}

interface PresenceBarProps {
  collaborators: Collaborator[];
  /** ISO timestamp */
  lastUpdatedAt?: string;
  /** Whether the workflow run is actively streaming events */
  isLive?: boolean;
  /** Max avatars before overflow count; default 3 */
  maxVisible?: number;
}
```

### Layout

```
[●] ◉ [AB] [CD] +2  ·  Live  ·  Updated 30s ago
 ↑    ↑ avatars       ↑ badge  ↑ timestamp
live
dot
```

**Mobile:** Compresses to live dot + count only; tooltip/popover on tap shows full list.

### Visual treatments

| Element | Tailwind classes |
|---------|-----------------|
| Container | `flex items-center gap-3 text-xs text-zinc-500` |
| Live dot | `h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse` |
| Live badge | `text-emerald-400 font-medium` |
| Avatar | `h-7 w-7 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center font-mono text-[10px] font-medium text-zinc-300` |
| Current user avatar | `border-indigo-500` (ring accent) |
| Overflow count | `h-7 w-7 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center font-mono text-[10px] text-zinc-400` |
| Avatar stack | `-space-x-2` (overlap) |
| Separator dot | `text-zinc-700` (·) |
| Timestamp | `font-mono text-xs text-zinc-500` |

### Accessibility

- Avatar stack: `role="list" aria-label="Active collaborators"`
- Each avatar: `role="listitem" aria-label="{name}{, you}" title="{name}"`
- Overflow count: `aria-label="{n} more collaborators"`
- Live badge: `role="status" aria-live="polite"` — announces when live status changes
- Live dot: `aria-hidden="true"` (decorative)

---

## 5. Mobile-First Adaptations Summary

All four components follow a consistent responsive strategy:

| Viewport | Adaptation |
|----------|-----------|
| `< 640px` (mobile) | Single-column layout; action buttons stack full-width; PresenceBar collapses to icon row; WorkflowVisualization shows horizontal step rail with tap-to-expand detail |
| `640px – 767px` | Same as mobile with minor padding increase |
| `768px – 1023px` | Two-column layouts unlock; inline playbook + block count; full PresenceBar visible |
| `≥ 1024px` | Full component widths; AIOutputPanel can sit alongside ArtifactReviewPanel in a two-column layout |

Touch target enforcement: all buttons meet 44×44px minimum via padding. List rows in WorkflowVisualization are `min-h-[48px]`.

---

## 6. Composition example

How these components assemble on an Account Manager's action review page:

```tsx
// Suggested layout at ≥ 1024px: left column = intelligence, right = artifact
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div className="space-y-4">
    <WorkflowVisualization {...workflowProps} />
    <AIOutputPanel decision={decision} generatedAt={generatedAt} />
  </div>
  <div>
    <ArtifactReviewPanel
      payload={reviewPayload}
      onVerdict={handleVerdict}
      submitting={isSubmitting}
      result={verdictResult}
    />
  </div>
</div>

// PresenceBar sits in the page header, above the grid
<PresenceBar collaborators={collaborators} isLive={workflowRunning} lastUpdatedAt={updatedAt} />
```

---

## 7. Open questions for Founding Engineer

1. **Phoenix Design API polling vs streaming** — `getDesignWorkflowStatus` is defined as a point-in-time call in ADR-007. For the live progress animation in `WorkflowVisualization`, should the app layer poll this endpoint (e.g. every 2s) or will `ICollabPrimitives.subscribe` provide a push channel? The stub collaboration primitives currently do neither.

2. **Collaborator identity** — `ICollabPrimitives.presence(workflowRunId?)` returns presence data. What shape does it return? `PresenceBar` currently uses a local `Collaborator[]` prop and would need a data-fetching hook to stay live.

3. **Artifact kind rendering** — `ActionArtifact.kind` can be `"email"`, `"agenda"`, `"deck"`, etc. Should the `ArtifactReviewPanel` render kind-specific body formatting (e.g. email headers for `kind: "email"`) or always treat body as plain text? Defaulting to plain text for now.
