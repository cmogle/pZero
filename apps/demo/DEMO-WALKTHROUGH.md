# PhoenixOS Clickable Demo — Walkthrough Script

Use this script for **investor meetings** and **prospect conversations**. The demo runs at **http://localhost:3000** (or your staging URL).

---

## Before the meeting

1. **Start the demo**
   ```bash
   cd apps/demo && pnpm dev
   ```
   Or from repo root: `pnpm --filter @pzero/demo dev`

2. Open **http://localhost:3000** in a full-screen browser. Ensure no other tabs are playing audio.

3. **(Optional)** Record a backup (e.g. Loom) by running through the script once and screen-sharing the recording if live demo fails.

---

## Walkthrough (6 steps)

### Step 1: Dashboard — Command Center
- **Say:** *"This is the PhoenixOS command center. We're tracking six B2B accounts. Each card shows recent signal activity — job changes, funding, intent spikes, news."*
- **Point:** Acme Corp has a **high-priority** badge (amber).
- **Do:** Click **Acme Corp** (or the "Continue" flow via the step bar).

### Step 2: Signal Alert — The Trigger
- **Say:** *"Acme just raised a $50M Series B. Supporting signals: three new VP Sales hires on LinkedIn, and a 2x intent spike on 'sales automation' from Bombora. The system summarizes: Acme is scaling their sales org post-funding — high probability of new tooling purchase in the next 30 days."*
- **Do:** Click **Continue to Consideration**.

### Step 3: Consideration Pass — Playbook Match
- **Say:** *"The system automatically matched this to the playbook 'Enterprise Expansion — Post-Funding Outreach.' We see the confidence and the content block candidates: a personalized congratulations email, an ROI case study, and a discovery call link. The reasoning is visible so the team can audit why this playbook fired."*
- **Do:** Click **Continue to Assembler**.

### Step 4: Assembler — Action Artifact
- **Say:** *"The assembler stitched the blocks into one drafted artifact: a personalized email that references the funding, the new hires, and the growth moment. We also attach the ROI case study and suggest a send time — Tuesday 9am in Acme's timezone."*
- **Do:** Click **Send to AM Review**.

### Step 5: AM Review — Human in the Loop
- **Say:** *"The Account Manager gets this review card. They see the decision logic and the drafted content. They can edit inline, approve, or reject. No autonomous send — every action goes through a human."*
- **Do:** Optionally make a small edit, then click **Approve**.

### Step 6: Sent — Confirmation
- **Say:** *"Once approved, the action artifact is dispatched. The timeline shows 'Email sent to Sarah Chen, VP Sales at Acme Corp.' The account card status becomes 'Action taken — awaiting response.'"*
- **Do:** Click **Restart demo** if you want to run it again.

---

## Technical notes

- The demo uses **real** PhoenixOS runtime code: `runSignalPipeline`, `mapSummaryToConsideration`, `decide`, `assemble`, and the review flow from `@pzero/runtime` and `@pzero/app`.
- Data is **deterministic** demo data (Acme Corp scenario); the pipeline runs on each load via `/api/demo`.
- All six steps are navigable via the **step bar** at the top; you can jump or move sequentially.

---

## Definition of Done (INT-32)

- [x] All 6 steps functional and navigable via clicks
- [x] Demo data tells the Acme Corp story
- [x] No P0/P1 bugs during walkthrough (run once to verify)
- [ ] UX Lead sign-off on visual quality
- [ ] CEO review and approval of this script
