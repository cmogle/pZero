/**
 * Demo data for PhoenixOS clickable walkthrough.
 * Deterministic accounts, signals, playbooks, and content library (Acme Corp story).
 * ADR-002, ADR-003, ADR-004, ADR-005.
 */

import type {
  TrackedAccount,
  RawSignal,
  SignalSource,
  Playbook,
  ContentBlockRef,
  ContentBlock,
  AccountContext,
} from '@pzero/runtime';

const DEMO_SOURCE_ID = 'demo-feed';

// --- Accounts (5–8 B2B accounts, Acme = high-priority) ---
export const DEMO_ACCOUNTS: TrackedAccount[] = [
  { id: 'acme-corp', externalId: 'acme.io', label: 'Acme Corp' },
  { id: 'beta-inc', externalId: 'beta.io', label: 'Beta Inc' },
  { id: 'gamma-labs', externalId: 'gammalabs.com', label: 'Gamma Labs' },
  { id: 'delta-systems', externalId: 'deltasys.com', label: 'Delta Systems' },
  { id: 'epsilon-co', externalId: 'epsilon.co', label: 'Epsilon Co' },
  { id: 'zeta-tech', externalId: 'zeta.tech', label: 'Zeta Tech' },
];

export const ACME_ACCOUNT_ID = 'acme-corp';

// Fixed timestamps for deterministic demo
const NOW = '2026-03-19T12:00:00.000Z';
const YESTERDAY = '2026-03-18T09:00:00.000Z';

/** Demo signal source: returns fixed Acme funding story + one signal per other account. */
export function createDemoSignalSource(): SignalSource {
  const signals: RawSignal[] = [
    {
      id: 'demo-acme-funding',
      accountId: ACME_ACCOUNT_ID,
      sourceId: DEMO_SOURCE_ID,
      observedAt: YESTERDAY,
      dedupeKey: 'demo-acme-funding',
      payload: {
        type: 'funding',
        title: 'Acme Corp raises $50M Series B',
        body: [
          'Acme just closed a $50M Series B led by Growth Partners.',
          '3 new VP Sales hires in the last 30 days (LinkedIn).',
          '2x intent spike on "sales automation" (Bombora).',
          'Expanding into EMEA; hiring in London.',
        ].join('\n'),
      },
    },
    {
      id: 'demo-beta-news',
      accountId: 'beta-inc',
      sourceId: DEMO_SOURCE_ID,
      observedAt: NOW,
      dedupeKey: 'demo-beta-news',
      payload: {
        type: 'news',
        title: 'Beta Inc product launch',
        body: 'Beta announced new analytics suite.',
      },
    },
    {
      id: 'demo-gamma-job',
      accountId: 'gamma-labs',
      sourceId: DEMO_SOURCE_ID,
      observedAt: NOW,
      dedupeKey: 'demo-gamma-job',
      payload: {
        type: 'job-change',
        title: 'New CTO at Gamma Labs',
        body: 'Gamma Labs appointed a new CTO.',
      },
    },
    {
      id: 'demo-delta-intent',
      accountId: 'delta-systems',
      sourceId: DEMO_SOURCE_ID,
      observedAt: NOW,
      dedupeKey: 'demo-delta-intent',
      payload: {
        type: 'intent-spike',
        title: 'Delta Systems — intent spike',
        body: 'Rising intent on "enterprise security".',
      },
    },
    {
      id: 'demo-epsilon-news',
      accountId: 'epsilon-co',
      sourceId: DEMO_SOURCE_ID,
      observedAt: NOW,
      dedupeKey: 'demo-epsilon-news',
      payload: {
        type: 'news',
        title: 'Epsilon partnership',
        body: 'Epsilon announced a new integration.',
      },
    },
    {
      id: 'demo-zeta-funding',
      accountId: 'zeta-tech',
      sourceId: DEMO_SOURCE_ID,
      observedAt: NOW,
      dedupeKey: 'demo-zeta-funding',
      payload: {
        type: 'funding',
        title: 'Zeta Tech seed round',
        body: 'Zeta Tech closed a $2M seed round.',
      },
    },
  ];

  return {
    id: DEMO_SOURCE_ID,
    async fetch(): Promise<{ signals: RawSignal[]; nextCursor?: string }> {
      return { signals, nextCursor: NOW };
    },
  };
}

// --- Playbooks (Acme triggers "Enterprise Expansion — Post-Funding Outreach") ---
export const DEMO_PLAYBOOKS: Playbook[] = [
  {
    id: 'pb-post-funding',
    name: 'Enterprise Expansion — Post-Funding Outreach',
    triggerTags: ['funding'],
    contentBlockIds: ['block-email-congrats', 'block-roi-case-study', 'block-discovery-link'],
  },
  {
    id: 'pb-news',
    name: 'News mention — nurture',
    triggerTags: ['news'],
    contentBlockIds: ['block-nurture'],
  },
];

// --- Content library (refs for consideration; full blocks for assembler) ---
const contentBlockRefs: Record<string, ContentBlockRef> = {
  'block-email-congrats': {
    id: 'block-email-congrats',
    label: 'Personalized congratulations + funding angle email',
    kind: 'template',
  },
  'block-roi-case-study': {
    id: 'block-roi-case-study',
    label: 'ROI case study for companies of Acme size',
    kind: 'template',
  },
  'block-discovery-link': {
    id: 'block-discovery-link',
    label: 'Discovery call booking link',
    kind: 'cta',
  },
  'block-nurture': {
    id: 'block-nurture',
    label: 'Nurture follow-up',
    kind: 'template',
  },
};

const contentBlockBodies: Record<string, string> = {
  'block-email-congrats': `Hi Sarah,

Congratulations on closing your $50M Series B — and on the recent growth of your sales leadership team. Scaling post-funding is the right moment to look at how other B2B leaders have automated pipeline and reduced ramp time.

We've helped companies like Acme (similar stage and vertical) cut time-to-productivity by 40% with a single source of truth for signals and outreach. I've attached a short ROI case study; if useful, I'd welcome a 15-minute call to map it to your current priorities.

Best,
[Your name]`,
  'block-roi-case-study': `ROI Case Study — B2B Sales at Scale

- 40% reduction in time-to-productivity for new reps
- Single source of truth for account signals and playbooks
- Measurable lift in pipeline from signal-to-action workflows

(Summary; full case study available on request.)`,
  'block-discovery-link': `Book a 15-minute discovery call: [Calendar link]`,
  'block-nurture': `Follow-up note for nurture track.`,
};

export const DEMO_CONTENT_LIBRARY: Record<string, ContentBlock> = Object.fromEntries(
  Object.entries(contentBlockRefs).map(([id, ref]) => [
    id,
    { ...ref, body: contentBlockBodies[id] ?? '' },
  ])
);

/** Account context for Acme (used by consideration pass). */
export function getDemoAccountContext(accountId: string): AccountContext {
  return {
    accountId,
    playbooks: DEMO_PLAYBOOKS,
    contentLibrary: contentBlockRefs,
  };
}

/** Human-readable signal summary for Acme (for Step 2 narrative). */
export const ACME_SIGNAL_SUMMARY_TEXT =
  'Acme Corp is scaling their sales org post-funding — high probability of new tooling purchase in next 30 days';

/** Suggested send time for demo. */
export const DEMO_SUGGESTED_SEND_TIME = 'Tuesday 9:00 AM (Acme Corp timezone)';
