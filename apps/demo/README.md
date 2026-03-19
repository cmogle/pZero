# PhoenixOS Clickable Demo

Investor and prospect walkthrough: signal-to-action in six steps. Uses real `@pzero/runtime` and `@pzero/app` code.

## Run locally

```bash
pnpm dev
```

Then open **http://localhost:3000**.

From repo root:

```bash
pnpm --filter @pzero/demo dev
```

## Build

```bash
pnpm build
pnpm start   # production on port 3000
```

## Walkthrough script

See **[DEMO-WALKTHROUGH.md](./DEMO-WALKTHROUGH.md)** for the step-by-step script and talking points for meetings.

## Architecture

- **Data:** `src/demo/data.ts` — demo accounts, Acme Corp signal source, playbooks, content library.
- **Pipeline:** `src/demo/pipeline.ts` — `runSignalPipeline` → consideration → decide → assemble → review payload (tenant `demo`, deterministic).
- **API:** `app/api/demo/route.ts` — GET returns pipeline result for the client.
- **UI:** `app/page.tsx` — single-page flow with step bar; Step 5 uses `ArtifactReviewPanel` from `@pzero/app/components`.

Design: pZero design system (Geist, zinc/indigo, WCAG 2.1 AA). See `packages/design-system/README.md` and `docs/design/`.
