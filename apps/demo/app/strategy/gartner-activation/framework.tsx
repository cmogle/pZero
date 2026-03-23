'use client';

import { useState } from 'react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'quadrant', label: 'MQ Landscape' },
  { id: 'strengths', label: 'Strengths & Cautions' },
  { id: 'portfolio', label: 'Portfolio View' },
  { id: 'competitive', label: 'Competitive Map' },
  { id: 'regions', label: 'Regional Activation' },
  { id: 'messaging', label: 'Messaging Hierarchy' },
  { id: 'pipeline', label: 'Pipeline & Monetisation' },
  { id: 'decisions', label: 'Decisions Needed' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function Tag({ variant, children }: { variant: 'leader' | 'visionary' | 'strength' | 'caution' | 'risk' | 'region'; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    leader: 'bg-emerald-500/10 text-emerald-400',
    visionary: 'bg-indigo-500/10 text-indigo-400',
    strength: 'bg-emerald-500/10 text-emerald-400',
    caution: 'bg-amber-500/10 text-amber-400',
    risk: 'bg-red-500/10 text-red-400',
    region: 'bg-indigo-500/10 text-indigo-400',
  };
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles[variant]}`}>
      {children}
    </span>
  );
}

function Card({ title, children, accent }: { title?: string; children: React.ReactNode; accent?: 'green' | 'amber' | 'red' | 'blue' }) {
  const borderColor = accent === 'green' ? 'border-l-emerald-500' : accent === 'amber' ? 'border-l-amber-500' : accent === 'red' ? 'border-l-red-500' : accent === 'blue' ? 'border-l-indigo-500' : '';
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 ${accent ? `border-l-2 ${borderColor}` : ''}`}>
      {title && <h4 className="mb-2 text-sm font-semibold text-zinc-100">{title}</h4>}
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

function Callout({ variant = 'info', children }: { variant?: 'info' | 'success' | 'warning' | 'danger'; children: React.ReactNode }) {
  const styles = {
    info: 'border-l-indigo-500 bg-indigo-500/5',
    success: 'border-l-emerald-500 bg-emerald-500/5',
    warning: 'border-l-amber-500 bg-amber-500/5',
    danger: 'border-l-red-500 bg-red-500/5',
  };
  return (
    <div className={`rounded-r-lg border-l-2 px-4 py-3 text-sm text-zinc-300 ${styles[variant]}`}>
      {children}
    </div>
  );
}

function StatusDot({ color }: { color: 'green' | 'amber' | 'red' }) {
  const c = color === 'green' ? 'bg-emerald-400' : color === 'amber' ? 'bg-amber-400' : 'bg-red-400';
  return <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${c}`} />;
}

function ScoreBar({ score, max = 5, label }: { score: number; max?: number; label?: string }) {
  const pct = (score / max) * 100;
  const color = score >= 3.5 ? 'bg-emerald-500' : score >= 2.8 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      {label && <span className="min-w-[180px] text-sm text-zinc-400">{label}</span>}
      <div className="h-2 flex-1 rounded-full bg-zinc-800">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="min-w-[32px] text-right text-sm font-semibold text-zinc-300">{score.toFixed(1)}</span>
    </div>
  );
}

/* ─── Tab content ─── */

function Overview() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Executive Summary</h2>
        <p className="mt-1 text-sm text-zinc-500">Actual data from Gartner Critical Capabilities for Banking Payment Hub Platforms (24 Feb 2026). 15 vendors, 15 capabilities, 7 use cases.</p>
      </div>

      <Callout variant="success">
        <strong>The headline:</strong> Intellect Design Arena is positioned as a <strong className="text-zinc-100">Leader</strong> in the 2026 Gartner Magic Quadrant for Banking Payment Hub Platforms. In Critical Capabilities, Intellect ranks <strong className="text-zinc-100">3rd in Payment Scheme Updates</strong>, <strong className="text-zinc-100">4th in three use cases</strong> (Hub Architecture, Method Support, Routing), and scores <strong className="text-zinc-100">4.3 on Composability</strong> — likely best-in-class.
      </Callout>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">3rd</p>
          <p className="mt-1 text-xs text-zinc-500">Payment Scheme Updates</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">4th</p>
          <p className="mt-1 text-xs text-zinc-500">Hub Architecture, Method Support, Routing</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">4.3</p>
          <p className="mt-1 text-xs text-zinc-500">Composability Score (of 5.0)</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-2xl font-bold text-zinc-300">15</p>
          <p className="mt-1 text-xs text-zinc-500">Vendors Evaluated</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="What Gartner Validates (with scores)">
          <ul className="mt-1 space-y-1.5">
            <li><StatusDot color="green" />Composability: <strong className="text-zinc-200">4.3</strong> — eMACH.ai microservices architecture</li>
            <li><StatusDot color="green" />Batch Payments: <strong className="text-zinc-200">3.5</strong> — corporate payments depth</li>
            <li><StatusDot color="green" />Payment Infrastructure: <strong className="text-zinc-200">3.5</strong> — vendor-provided infrastructure</li>
            <li><StatusDot color="green" />Payment Scheme Updates: <strong className="text-zinc-200">3.3</strong> — no-code rail configurator</li>
            <li><StatusDot color="green" />ISO 20022: <strong className="text-zinc-200">3.3</strong> — native canonical data model</li>
            <li><StatusDot color="green" />Payment Routing: <strong className="text-zinc-200">3.4</strong> — intelligent routing</li>
          </ul>
        </Card>
        <Card title="What Gartner Flags as Cautions (with scores)">
          <ul className="mt-1 space-y-1.5">
            <li><StatusDot color="red" />Warehousing: <strong className="text-zinc-200">1.8</strong> — lowest score, major gap</li>
            <li><StatusDot color="red" />Liquidity Monitoring: <strong className="text-zinc-200">2.1</strong> — significant weakness</li>
            <li><StatusDot color="amber" />Direct Debits: <strong className="text-zinc-200">2.4</strong> — below market average</li>
            <li><StatusDot color="amber" />Exception Monitoring: <strong className="text-zinc-200">2.6</strong> — needs improvement</li>
            <li><StatusDot color="amber" />Alerts &amp; Notifications: <strong className="text-zinc-200">2.9</strong> — below peers</li>
            <li><StatusDot color="amber" />Geographic presence limited to Africa, Asia, Middle East</li>
          </ul>
        </Card>
      </div>

      <Card title="The Strategic Question">
        <p>We have a Leader designation in Payments — a category where we are largely unknown in North America. In Critical Capabilities, we rank mid-pack (3rd–7th across use cases), with a genuine best-in-class Composability story. How do we (a) lead with the MQ Leader status and Composability strength to maximum commercial effect, (b) use the 3rd/4th place use-case rankings as substantiation without inviting unfavourable comparisons, and (c) address the capability gaps (Warehousing, Liquidity, Direct Debits) through roadmap investment?</p>
      </Card>

      <Callout variant="warning">
        <strong>Key tension:</strong> The MQ Leader badge opens doors, but Volante and Infosys Finacle lead in 6 of 7 use cases. We must be precise about what we claim. Lead with Composability (4.3) and the MQ badge, substantiate with Payment Scheme Updates (3rd) and Routing (4th), and never invite use-case-by-use-case comparisons where we are 5th–7th.
      </Callout>
    </div>
  );
}

function Quadrant() {
  // Average use-case scores from Table 3 as proxy for positioning
  const vendors = [
    { name: 'Volante', avg: 3.44, top: '18%', left: '82%', tier: 'leader' },
    { name: 'Infosys Finacle', avg: 3.43, top: '20%', left: '78%', tier: 'leader' },
    { name: 'CGI', avg: 3.26, top: '24%', left: '72%', tier: 'leader' },
    { name: 'FIS', avg: 3.24, top: '26%', left: '68%', tier: 'leader' },
    { name: 'Intellect', avg: 3.13, top: '30%', left: '66%', tier: 'leader' },
    { name: 'TCS', avg: 3.12, top: '32%', left: '62%', tier: 'leader' },
    { name: 'Temenos', avg: 3.10, top: '28%', left: '58%', tier: 'mid' },
    { name: 'Oracle', avg: 3.04, top: '35%', left: '55%', tier: 'mid' },
    { name: 'Finastra (GPP)', avg: 3.03, top: '38%', left: '52%', tier: 'mid' },
    { name: 'Fiserv', avg: 2.99, top: '36%', left: '64%', tier: 'mid' },
    { name: 'IBM', avg: 2.95, top: '40%', left: '48%', tier: 'mid' },
    { name: 'Finastra (PTG)', avg: 2.95, top: '55%', left: '56%', tier: 'niche' },
    { name: 'NetXD', avg: 2.88, top: '58%', left: '62%', tier: 'visionary' },
    { name: 'ECS Fin', avg: 2.90, top: '45%', left: '42%', tier: 'niche' },
    { name: 'Skaleet', avg: 2.65, top: '62%', left: '38%', tier: 'niche' },
  ];

  const tierColor = (tier: string) => {
    if (tier === 'leader') return 'bg-emerald-500';
    if (tier === 'visionary') return 'bg-violet-500';
    if (tier === 'mid') return 'bg-amber-500';
    return 'bg-zinc-500';
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">2026 Critical Capabilities Landscape</h2>
        <p className="mt-1 text-sm text-zinc-500">Vendor positions derived from average use-case scores across all 7 Critical Capabilities use cases (Table 3, p40).</p>
      </div>

      {/* Visual quadrant */}
      <div className="relative mx-auto aspect-square w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900/30">
        <div className="absolute left-0 top-1/2 w-full border-t border-zinc-800" />
        <div className="absolute left-1/2 top-0 h-full border-l border-zinc-800" />

        <span className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Challengers</span>
        <span className="absolute right-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Leaders</span>
        <span className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Niche Players</span>
        <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Visionaries</span>

        {vendors.map((v) => (
          <div key={v.name} className="absolute" style={{ top: v.top, left: v.left }}>
            <div className={`h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${tierColor(v.tier)} ${v.name === 'Intellect' ? 'ring-2 ring-indigo-400 ring-offset-1 ring-offset-zinc-900' : ''}`} title={`${v.name} (${v.avg.toFixed(2)})`} />
            <span className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[11px] ${v.name === 'Intellect' ? 'font-bold text-indigo-300' : 'font-medium text-zinc-500'}`}>{v.name}</span>
          </div>
        ))}

        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600">Completeness of Vision →</span>
      </div>
      <p className="text-center text-xs text-zinc-600">Positions based on average Critical Capabilities use-case scores. Green = top tier, Amber = mid tier, Grey = lower tier. Intellect highlighted with ring.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Top Tier (Avg &ge; 3.20)">
          <div className="space-y-2">
            <p><Tag variant="leader">3.44</Tag> <strong className="text-zinc-200">Volante</strong> — #1 in 4 of 7 use cases</p>
            <p><Tag variant="leader">3.43</Tag> <strong className="text-zinc-200">Infosys Finacle</strong> — #1 in 2 use cases, #2 in 3</p>
            <p><Tag variant="leader">3.26</Tag> <strong className="text-zinc-200">CGI</strong> — #1 in Dashboard and Routing</p>
            <p><Tag variant="leader">3.24</Tag> <strong className="text-zinc-200">FIS</strong> — #1 in SaaS</p>
          </div>
        </Card>
        <Card title="Mid Tier — Intellect&apos;s Position (Avg 3.00–3.19)">
          <div className="space-y-2">
            <p><Tag variant="strength">3.13</Tag> <strong className="text-indigo-300">Intellect Design Arena</strong> — 3rd in Scheme Updates, 4th in 3 use cases</p>
            <p><Tag variant="caution">3.12</Tag> <strong className="text-zinc-200">TCS</strong> — Consistent mid-tier</p>
            <p><Tag variant="caution">3.10</Tag> <strong className="text-zinc-200">Temenos</strong> — Strong in Dashboard</p>
            <p><Tag variant="caution">3.04</Tag> <strong className="text-zinc-200">Oracle</strong> — Strong in Method Support</p>
          </div>
        </Card>
      </div>

      <Callout variant="info">
        <strong>Note:</strong> This maps Critical Capabilities use-case scores. The separate MQ report determines the actual quadrant placement (Leader/Challenger/Visionary/Niche). Intellect is confirmed as a Leader in the MQ, meaning execution and vision scores exceed what pure CC scores alone suggest.
      </Callout>
    </div>
  );
}

function Strengths() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Strengths &amp; Cautions Analysis</h2>
        <p className="mt-1 text-sm text-zinc-500">Actual Gartner capability scores (Table 2, p39). Scale: 1.0–5.0.</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Top Capability Scores</h3>
      <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <ScoreBar score={4.3} label="Composability" />
        <ScoreBar score={3.6} label="Real-Time Processing" />
        <ScoreBar score={3.5} label="Batch Payments" />
        <ScoreBar score={3.5} label="Payment Infrastructure" />
        <ScoreBar score={3.4} label="Payment Routing" />
        <ScoreBar score={3.4} label="High-Value Payments" />
        <ScoreBar score={3.3} label="ISO 20022" />
        <ScoreBar score={3.3} label="Exception Monitoring" />
        <ScoreBar score={3.3} label="Payment Scheme Updates" />
      </div>

      <h3 className="mt-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">Weakness Areas</h3>
      <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <ScoreBar score={2.9} label="Alerts & Notifications" />
        <ScoreBar score={2.9} label="Payment Integ. Middleware" />
        <ScoreBar score={2.8} label="Accounting Updates" />
        <ScoreBar score={2.6} label="Payment Scheme Mkt Updates" />
        <ScoreBar score={2.4} label="Direct Debits" />
        <ScoreBar score={2.1} label="Liquidity Monitoring" />
        <ScoreBar score={1.8} label="Warehousing" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Composability (4.3) — Lead With This" accent="green">
          <p><StatusDot color="green" />Likely best-in-class across all 15 vendors. Validates the eMACH.ai microservices architecture. Composability carries 30% weighting in the Hub Architecture use case — it&apos;s the single most important capability for that category.</p>
          <p className="mt-2"><strong className="text-zinc-200">Activation:</strong> This is the headline differentiator. &quot;The most composable payment hub in the market, validated by Gartner.&quot;</p>
        </Card>
        <Card title="Warehousing (1.8) — Honest Treatment Required" accent="red">
          <p><StatusDot color="red" />Lowest score of any capability. Most peers score 3.0+. This pulls down the SaaS use case score (where Warehousing has 4% weight) and the Payment Dashboard use case.</p>
          <p className="mt-2"><strong className="text-zinc-200">Strategy:</strong> Frame as roadmap investment area. Do not attempt to defend or minimise in prospect conversations.</p>
        </Card>
      </div>

      <Card title="Geographic Positioning" accent="amber">
        <p><StatusDot color="amber" />Gartner confirms Intellect is strong in Africa, Asia, and the Middle East, with typical customers being Tier 2–3 banks. Limited Americas/Europe presence is a strategic caution — particularly given North America is the highest-value growth market.</p>
      </Card>
    </div>
  );
}

function Portfolio() {
  // Table 1 weightings and Table 2 Intellect scores
  const capabilities = [
    { name: 'Composability', score: 4.3, hubArch: 30, dashboard: 0, methodSupport: 0, schemeUpdates: 0, realTime: 5, routing: 5, saas: 0 },
    { name: 'Real-Time Processing', score: 3.6, hubArch: 5, dashboard: 5, methodSupport: 25, schemeUpdates: 5, realTime: 5, routing: 5, saas: 15 },
    { name: 'Batch Payments', score: 3.5, hubArch: 0, dashboard: 5, methodSupport: 10, schemeUpdates: 5, realTime: 0, routing: 2, saas: 6 },
    { name: 'Payment Infrastructure', score: 3.5, hubArch: 20, dashboard: 0, methodSupport: 0, schemeUpdates: 15, realTime: 7, routing: 0, saas: 30 },
    { name: 'Payment Routing', score: 3.4, hubArch: 4, dashboard: 5, methodSupport: 0, schemeUpdates: 0, realTime: 8, routing: 40, saas: 7 },
    { name: 'High-Value Payments', score: 3.4, hubArch: 0, dashboard: 5, methodSupport: 25, schemeUpdates: 10, realTime: 0, routing: 10, saas: 5 },
    { name: 'ISO 20022', score: 3.3, hubArch: 10, dashboard: 0, methodSupport: 15, schemeUpdates: 20, realTime: 5, routing: 10, saas: 0 },
    { name: 'Payment Scheme Updates', score: 3.3, hubArch: 4, dashboard: 0, methodSupport: 20, schemeUpdates: 30, realTime: 6, routing: 10, saas: 10 },
    { name: 'Warehousing', score: 1.8, hubArch: 0, dashboard: 5, methodSupport: 0, schemeUpdates: 0, realTime: 0, routing: 0, saas: 4 },
    { name: 'Liquidity Monitoring', score: 2.1, hubArch: 3, dashboard: 25, methodSupport: 0, schemeUpdates: 0, realTime: 8, routing: 0, saas: 5 },
    { name: 'Direct Debits', score: 2.4, hubArch: 0, dashboard: 0, methodSupport: 5, schemeUpdates: 5, realTime: 0, routing: 0, saas: 3 },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Portfolio View: Capabilities × Use-Case Weightings</h2>
        <p className="mt-1 text-sm text-zinc-500">Intellect&apos;s raw capability scores (Table 2) mapped against use-case weightings (Table 1). Higher score + higher weight = greater impact.</p>
      </div>

      <Callout variant="info">
        <strong>How to read this:</strong> The score column shows Intellect&apos;s raw capability rating (1–5). The percentages show how heavily each capability is weighted in each use case. A high score in a heavily-weighted capability is a portfolio strength; a low score in a heavily-weighted area is a critical gap.
      </Callout>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="pb-3 pr-4">Capability</th>
              <th className="pb-3 pr-3 text-center">Score</th>
              <th className="pb-3 pr-3 text-center">Hub Arch</th>
              <th className="pb-3 pr-3 text-center">Dashboard</th>
              <th className="pb-3 pr-3 text-center">Method</th>
              <th className="pb-3 pr-3 text-center">Scheme</th>
              <th className="pb-3 pr-3 text-center">Real-Time</th>
              <th className="pb-3 pr-3 text-center">Routing</th>
              <th className="pb-3 text-center">SaaS</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {capabilities.map((c) => {
              const scoreColor = c.score >= 3.5 ? 'text-emerald-400' : c.score >= 2.8 ? 'text-amber-400' : 'text-red-400';
              const cellBg = (weight: number) => weight >= 20 ? 'bg-indigo-500/10 font-semibold text-zinc-200' : weight >= 10 ? 'bg-indigo-500/5' : '';
              return (
                <tr key={c.name} className="border-b border-zinc-800/50">
                  <td className="py-2.5 pr-4 text-zinc-300">{c.name}</td>
                  <td className={`py-2.5 pr-3 text-center font-bold ${scoreColor}`}>{c.score}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.hubArch)}`}>{c.hubArch > 0 ? `${c.hubArch}%` : '—'}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.dashboard)}`}>{c.dashboard > 0 ? `${c.dashboard}%` : '—'}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.methodSupport)}`}>{c.methodSupport > 0 ? `${c.methodSupport}%` : '—'}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.schemeUpdates)}`}>{c.schemeUpdates > 0 ? `${c.schemeUpdates}%` : '—'}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.realTime)}`}>{c.realTime > 0 ? `${c.realTime}%` : '—'}</td>
                  <td className={`py-2.5 pr-3 text-center ${cellBg(c.routing)}`}>{c.routing > 0 ? `${c.routing}%` : '—'}</td>
                  <td className={`py-2.5 text-center ${cellBg(c.saas)}`}>{c.saas > 0 ? `${c.saas}%` : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-600">Highlighted cells indicate capabilities weighted &ge;10% in that use case. Bold = &ge;20%.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Portfolio Strengths" accent="green">
          <ul className="mt-1 space-y-1.5">
            <li><StatusDot color="green" /><strong className="text-zinc-200">Composability (4.3)</strong> at 30% weight in Hub Architecture — single biggest competitive advantage</li>
            <li><StatusDot color="green" /><strong className="text-zinc-200">Payment Infrastructure (3.5)</strong> at 30% in SaaS and 20% in Hub Architecture</li>
            <li><StatusDot color="green" /><strong className="text-zinc-200">Payment Routing (3.4)</strong> at 40% weight in Routing use case</li>
            <li><StatusDot color="green" /><strong className="text-zinc-200">Payment Scheme Updates (3.3)</strong> at 30% in Scheme Updates use case</li>
          </ul>
        </Card>
        <Card title="Portfolio Gaps" accent="red">
          <ul className="mt-1 space-y-1.5">
            <li><StatusDot color="red" /><strong className="text-zinc-200">Liquidity Monitoring (2.1)</strong> at 25% weight in Dashboard — drags down that use case significantly</li>
            <li><StatusDot color="red" /><strong className="text-zinc-200">Warehousing (1.8)</strong> — low weight across all use cases but still the worst absolute score</li>
            <li><StatusDot color="amber" /><strong className="text-zinc-200">Direct Debits (2.4)</strong> — limited but weighted in Method Support and Scheme Updates</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Competitive() {
  // Table 3: Product Score in Use Cases (all vendors)
  const useCases = [
    {
      name: 'Payment Hub Architecture',
      scores: [
        { vendor: 'Volante', score: 3.75, rank: 1 },
        { vendor: 'Infosys Finacle', score: 3.72, rank: 2 },
        { vendor: 'FIS', score: 3.34, rank: 3 },
        { vendor: 'Intellect', score: 3.27, rank: 4 },
        { vendor: 'CGI', score: 3.08, rank: 5 },
        { vendor: 'TCS', score: 3.07, rank: 6 },
      ],
    },
    {
      name: 'Payment Dashboard',
      scores: [
        { vendor: 'CGI', score: 3.41, rank: 1 },
        { vendor: 'Temenos', score: 3.41, rank: 1 },
        { vendor: 'Finastra (GPP)', score: 3.39, rank: 3 },
        { vendor: 'FIS', score: 3.33, rank: 4 },
        { vendor: 'Volante', score: 3.31, rank: 5 },
        { vendor: 'Intellect', score: 3.14, rank: 7 },
      ],
    },
    {
      name: 'Payment Method Support',
      scores: [
        { vendor: 'Infosys Finacle', score: 3.56, rank: 1 },
        { vendor: 'Volante', score: 3.43, rank: 2 },
        { vendor: 'Oracle', score: 3.38, rank: 3 },
        { vendor: 'Intellect', score: 3.34, rank: 4 },
        { vendor: 'Temenos', score: 3.30, rank: 5 },
        { vendor: 'CGI', score: 3.27, rank: 6 },
      ],
    },
    {
      name: 'Payment Scheme Updates',
      scores: [
        { vendor: 'Infosys Finacle', score: 3.59, rank: 1 },
        { vendor: 'Volante', score: 3.55, rank: 2 },
        { vendor: 'Intellect', score: 3.32, rank: 3 },
        { vendor: 'Oracle', score: 3.21, rank: 4 },
        { vendor: 'FIS', score: 3.20, rank: 5 },
        { vendor: 'TCS', score: 3.06, rank: 6 },
      ],
    },
    {
      name: 'Real-Time Instant Payment',
      scores: [
        { vendor: 'Volante', score: 3.49, rank: 1 },
        { vendor: 'Infosys Finacle', score: 3.46, rank: 2 },
        { vendor: 'CGI', score: 3.35, rank: 3 },
        { vendor: 'FIS', score: 3.33, rank: 4 },
        { vendor: 'Intellect', score: 3.24, rank: 5 },
        { vendor: 'Temenos', score: 3.21, rank: 6 },
      ],
    },
    {
      name: 'Setup & Amend Routing',
      scores: [
        { vendor: 'CGI', score: 3.55, rank: 1 },
        { vendor: 'Infosys Finacle', score: 3.50, rank: 2 },
        { vendor: 'Volante', score: 3.48, rank: 3 },
        { vendor: 'Intellect', score: 3.39, rank: 4 },
        { vendor: 'FIS', score: 3.31, rank: 5 },
        { vendor: 'Temenos', score: 3.16, rank: 6 },
      ],
    },
    {
      name: 'Software as a Service',
      scores: [
        { vendor: 'FIS', score: 3.41, rank: 1 },
        { vendor: 'Infosys Finacle', score: 3.40, rank: 2 },
        { vendor: 'Volante', score: 3.35, rank: 3 },
        { vendor: 'Finastra (PTG)', score: 3.25, rank: 4 },
        { vendor: 'Temenos', score: 3.24, rank: 5 },
        { vendor: 'Intellect', score: 3.22, rank: 6 },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Competitive Map</h2>
        <p className="mt-1 text-sm text-zinc-500">Actual Gartner use-case rankings from Table 3 (p40). Intellect&apos;s position and gap to #1 in each use case.</p>
      </div>

      {useCases.map((uc) => {
        const intellectScore = uc.scores.find(s => s.vendor === 'Intellect');
        const topScore = uc.scores[0];
        const gap = intellectScore ? (topScore.score - intellectScore.score).toFixed(2) : '—';
        return (
          <div key={uc.name} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-zinc-100">{uc.name}</h4>
              <span className="text-xs text-zinc-500">Intellect rank: <strong className={`${intellectScore && intellectScore.rank <= 3 ? 'text-emerald-400' : intellectScore && intellectScore.rank <= 5 ? 'text-amber-400' : 'text-red-400'}`}>#{intellectScore?.rank}</strong> · Gap to #1: {gap}</span>
            </div>
            <div className="space-y-1.5">
              {uc.scores.map((s) => (
                <div key={s.vendor} className={`flex items-center gap-3 ${s.vendor === 'Intellect' ? 'rounded bg-indigo-500/10 px-2 py-1' : ''}`}>
                  <span className={`min-w-[20px] text-xs font-bold ${s.rank <= 3 ? 'text-emerald-400' : 'text-zinc-500'}`}>#{s.rank}</span>
                  <span className={`min-w-[150px] text-sm ${s.vendor === 'Intellect' ? 'font-bold text-indigo-300' : 'text-zinc-300'}`}>{s.vendor}</span>
                  <div className="h-2 flex-1 rounded-full bg-zinc-800">
                    <div className={`h-2 rounded-full ${s.vendor === 'Intellect' ? 'bg-indigo-500' : s.rank <= 3 ? 'bg-emerald-500/70' : 'bg-zinc-600'}`} style={{ width: `${(s.score / 5) * 100}%` }} />
                  </div>
                  <span className="min-w-[32px] text-right text-sm font-semibold text-zinc-300">{s.score.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Key Rivalries</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="vs. Infosys Finacle" accent="red">
          <p>Closest peer competitor (both Indian heritage). Finacle is #1 in 3 use cases, #2 in 3 more. Finacle leads Intellect by 0.30 on average. The gap is consistent, not concentrated.</p>
        </Card>
        <Card title="vs. Volante" accent="amber">
          <p>Market leader. #1 in 4 of 7 use cases. Leads Intellect by 0.31 on average. Volante&apos;s composability (4.1) is closest to Intellect&apos;s 4.3 — our one area of advantage.</p>
        </Card>
        <Card title="vs. FIS" accent="amber">
          <p>FIS leads in SaaS (#1 vs. Intellect #6) and Dashboard. But Intellect leads in Scheme Updates (3rd vs. 5th) and Method Support (4th vs. 3rd, close). FIS is the key SaaS benchmark.</p>
        </Card>
      </div>
    </div>
  );
}

function Regions() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Regional Activation Strategy</h2>
        <p className="mt-1 text-sm text-zinc-500">Calibrated to Gartner&apos;s geographic assessment: strong in Africa/Asia/Middle East, limited in Americas/Europe.</p>
      </div>

      <Card title="North America" accent="blue">
        <p><Tag variant="region">Lead Market — Credibility Gap</Tag></p>
        <p className="mt-2">Gartner confirms limited Americas presence. The MQ Leader status is our primary entry credential. Critical Capabilities data helps refine the story:</p>
        <ul className="mt-2 space-y-1.5">
          <li><strong className="text-zinc-200">Lead with:</strong> MQ Leader badge + Composability (4.3) — most composable payment hub in the market</li>
          <li><strong className="text-zinc-200">Substantiate with:</strong> Payment Scheme Updates (3rd) — relevant for FedNow/RTP adoption; Payment Routing (4th) — intelligent routing for complex multi-rail environments</li>
          <li><strong className="text-zinc-200">Prepare for:</strong> SaaS questions (we&apos;re 6th) — need strong references; Dashboard/Warehousing gaps — redirect to platform strengths</li>
        </ul>
        <p className="mt-3"><strong className="text-zinc-200">Competitive context:</strong> Volante, FIS, and CGI have strong U.S. presence. Position against them on composability and AI, not breadth.</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Europe" accent="blue">
          <p><Tag variant="region">Selective — Scrutiny Market</Tag></p>
          <p className="mt-2">European buyers are more likely to scrutinise Critical Capabilities scores. Our Payment Scheme Updates strength (3rd) is especially relevant for SEPA Inst, PSD2/PSD3, and new scheme adoption. But Dashboard weakness (7th) could be exposed. Lead with specific scheme relevance, not broad positioning.</p>
          <p className="mt-2"><strong className="text-zinc-200">Key competitors here:</strong> Temenos (#1 in Dashboard), Finastra, FIS</p>
        </Card>
        <Card title="Asia-Pacific &amp; MEA" accent="blue">
          <p><Tag variant="region">Core Market — Validation Play</Tag></p>
          <p className="mt-2">Gartner confirms this is Intellect&apos;s stronghold (Tier 2–3 banks in Africa, Asia, Middle East). The MQ Leader status adds external validation to an already credible story. Payment Method Support (4th) is particularly relevant for markets with diverse payment rails (UPI in India, mobile money in Africa).</p>
          <p className="mt-2"><strong className="text-zinc-200">Key competitors here:</strong> Infosys Finacle (dominant in same markets), TCS, Oracle</p>
        </Card>
      </div>

      <Callout variant="warning">
        <strong>Geographic expansion decision:</strong> Gartner&apos;s report confirms limited Americas/Europe presence. The Decisions tab flags whether to invest in geographic expansion or double down on core markets.
      </Callout>
    </div>
  );
}

function Messaging() {
  const tiers = [
    {
      num: '01',
      title: 'MQ Leader + Composability (The Door Opener)',
      body: '"Intellect Design Arena is recognised as a Leader in the 2026 Gartner MQ for Banking Payment Hub Platforms, with a Composability score of 4.3 — the strongest in the market." Use in subject lines, opening slides, LinkedIn, events, email signatures, banners.',
      tag: 'strength' as const,
    },
    {
      num: '02',
      title: 'Top Use-Case Rankings (The Substantiation Layer)',
      body: '"Intellect ranks 3rd for Payment Scheme Updates, 4th for Payment Hub Architecture, Payment Method Support, and Payment Routing across 15 evaluated vendors." Use selectively in sales conversations, analyst briefings, and RFP responses. Lead with the specific use case most relevant to the prospect\'s needs.',
      tag: 'strength' as const,
    },
    {
      num: '03',
      title: 'Platform Credibility (The Broader Intellect Story)',
      body: '"The eMACH.ai platform that Gartner evaluated powers Intellect\'s full suite — from payments to core banking, transaction banking, wealth, and beyond — serving 500+ institutions across 61 countries." Be clear this is a platform statement, not a claim the MQ covers other categories.',
      tag: 'caution' as const,
    },
    {
      num: '04',
      title: 'Weakness Acknowledgement (The Roadmap Story)',
      body: 'For Warehousing (1.8), Liquidity Monitoring (2.1), and Direct Debits (2.4): "These are identified investment areas in our product roadmap, reflecting our historic strength in corporate and cross-border payments. Our progressive deployment model means banks can adopt our strengths today while we expand capability." Only when directly asked — never volunteer.',
      tag: 'risk' as const,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Messaging Hierarchy</h2>
        <p className="mt-1 text-sm text-zinc-500">Calibrated to actual Gartner data. Tier 1 always leads. Never skip to Tier 4.</p>
      </div>

      <div className="space-y-4">
        {tiers.map((t) => (
          <div key={t.num} className="flex gap-4 border-b border-zinc-800/50 pb-4">
            <span className="text-2xl font-bold text-zinc-800">{t.num}</span>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">{t.title} <Tag variant={t.tag}>{t.tag === 'strength' ? 'External' : t.tag === 'caution' ? 'Careful' : 'Internal Only'}</Tag></h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{t.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="danger">
        <strong>What we should NOT do:</strong>
        <ul className="mt-2 space-y-1">
          <li>Publish raw Critical Capabilities scores externally (Gartner ToS)</li>
          <li>Claim &quot;top-3&quot; broadly — only accurate for Payment Scheme Updates</li>
          <li>Invite head-to-head comparisons where Volante/Finacle lead in 6 of 7 use cases</li>
          <li>Imply the MQ Leader status extends to Core Banking, Wealth, Insurance</li>
          <li>Lead with SaaS capability (we&apos;re 6th — behind FIS, Finacle, Volante, PTG, Temenos)</li>
          <li>Defend Warehousing or Liquidity gaps unprompted</li>
        </ul>
      </Callout>
    </div>
  );
}

function Pipeline() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Pipeline &amp; Monetisation Impact</h2>
        <p className="mt-1 text-sm text-zinc-500">Recalibrated to actual competitive position. Focus on use cases where Intellect is 3rd–4th, not aspirational top-2.</p>
      </div>

      <Callout variant="warning">
        <strong>Position recalibration:</strong> We are mid-pack (3rd–7th), not top-2. Pipeline messaging should focus on: (1) MQ Leader badge as door-opener, (2) Composability as unique differentiator, (3) specific use-case relevance per prospect. Avoid promising capabilities where we score below 3.0.
      </Callout>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Existing Accounts — Activation by Use Case</h3>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        {[
          { name: 'Northern Trust', useCase: 'Hub Architecture (4th), Routing (4th)', color: 'green' as const, impact: 'Composability story for modernisation' },
          { name: 'M&T Bank', useCase: 'Scheme Updates (3rd), Real-Time (5th)', color: 'green' as const, impact: 'FedNow/RTP scheme adoption narrative' },
          { name: 'Santander', useCase: 'Method Support (4th), Scheme (3rd)', color: 'green' as const, impact: 'Multi-rail, multi-market payments hub' },
          { name: 'Wells Fargo', useCase: 'Hub Architecture (4th)', color: 'amber' as const, impact: 'Tier 1 composability play — but SaaS gap (6th) is risk' },
          { name: 'Ameris, Associated, Regions', useCase: 'Scheme Updates (3rd)', color: 'green' as const, impact: 'Mid-tier banks adopting new payment rails' },
          { name: 'SeaCoast, BECU', useCase: 'Real-Time (5th)', color: 'amber' as const, impact: 'Differentiate vs. Finzly/Alacriti on breadth, but real-time not strongest' },
        ].map((c) => (
          <div key={c.name} className="flex items-start gap-3 border-b border-zinc-800/50 py-2.5 last:border-b-0">
            <StatusDot color={c.color} />
            <div className="min-w-[160px]">
              <span className="text-sm font-medium text-zinc-200">{c.name}</span>
              <p className="text-xs text-zinc-600">{c.useCase}</p>
            </div>
            <span className="text-sm text-zinc-500">{c.impact}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-sm font-semibold text-emerald-400">Existing Pipeline: $100M+ qualified</p>
        <p className="text-sm text-zinc-400">Recalibrated target: Focus on accounts where Intellect&apos;s 3rd/4th place use cases align with prospect needs. Avoid leading with Dashboard or SaaS stories.</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Net New Accounts — Best Fit by Strength</h3>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        {[
          { name: 'Truist', tier: 'Tier 1', bestFit: 'Hub Architecture (composability)', risk: 'SaaS gap, Dashboard gap' },
          { name: 'Mizuho, Citibank', tier: 'Tier 1', bestFit: 'Method Support (cross-border)', risk: 'Geographic perception' },
          { name: 'US Bank, PNC', tier: 'Tier 1', bestFit: 'Routing (4th), Scheme Updates (3rd)', risk: 'Infosys Finacle, Volante ahead' },
          { name: 'Comerica, First Citizens', tier: 'Tier 2', bestFit: 'Scheme Updates, composability', risk: 'FIS and CGI strong in U.S. mid-tier' },
          { name: 'Texas Capital, City National', tier: 'Tier 2', bestFit: 'Composability + AI story', risk: 'Limited U.S. references' },
        ].map((c) => (
          <div key={c.name} className="flex items-start gap-3 border-b border-zinc-800/50 py-2.5 last:border-b-0">
            <span className="min-w-[50px] text-xs font-medium text-zinc-500">{c.tier}</span>
            <div className="min-w-[180px]">
              <span className="text-sm font-medium text-zinc-200">{c.name}</span>
            </div>
            <div>
              <p className="text-sm text-zinc-400"><StatusDot color="green" />{c.bestFit}</p>
              <p className="text-sm text-zinc-500"><StatusDot color="amber" />{c.risk}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
        <p className="text-sm font-semibold text-indigo-400">Net New Pipeline: $50–70M qualified</p>
        <p className="text-sm text-zinc-400">Each pursuit should map to Intellect&apos;s top use cases. Avoid pursuits where Dashboard, SaaS, or Liquidity are primary evaluation criteria.</p>
      </div>
    </div>
  );
}

function Decisions() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Data-Driven Decisions Needed</h2>
        <p className="mt-1 text-sm text-zinc-500">Updated with actual Critical Capabilities data. Prioritised by impact.</p>
      </div>

      {[
        { title: 'PRIORITY 1: Invest in Warehousing & Liquidity Monitoring?', accent: 'red' as const, body: 'Warehousing (1.8) and Liquidity Monitoring (2.1) are Intellect\'s two lowest scores. Most peers score 3.0+ on both. These pull down Dashboard (7th place) and SaaS (6th place) use-case rankings. Improving these to 3.0 would materially improve 3 of 7 use-case positions.', decision: 'Product investment decision: roadmap priority and timeline for Warehousing and Liquidity capabilities.' },
        { title: 'PRIORITY 2: SaaS Delivery Model Gap', accent: 'red' as const, body: 'Intellect is 6th in SaaS — behind FIS, Infosys Finacle, Volante, Finastra (PTG), and Temenos. Gartner\'s strategic planning assumption: "By year-end 2030, 80% of banks will be processing real-time payments using a banking payment hub platform on the public cloud." This is the most strategically important gap.', decision: 'Accelerate SaaS deployment track? Invest in cloud-native SaaS references in key markets?' },
        { title: 'PRIORITY 3: Double Down on Payment Scheme Updates?', accent: 'green' as const, body: 'Intellect is already 3rd — our strongest competitive position. With Payment Scheme Updates weighted at 30% in the Scheme Updates use case and 20% in Method Support, improving from 3.3 to 3.6+ could push us to 2nd place. This aligns with the no-code rail configurator narrative.', decision: 'Investment to move from 3rd to 2nd in Payment Scheme Updates — highest ROI improvement?' },
        { title: 'PRIORITY 4: Geographic Expansion Strategy', accent: 'amber' as const, body: 'Gartner confirms Intellect\'s strength is in Africa/Asia/Middle East. Limited Americas/Europe presence is a strategic caution. Volante, CGI, and FIS dominate North America. Infosys Finacle is the key competitor in APAC/MEA.', decision: 'Invest in North America go-to-market (U.S. references, local partnerships) or double down on core markets?' },
        { title: 'Gartner Reprint Rights', accent: 'amber' as const, body: 'Essential for collateral, website, and events. The MQ Leader badge is the single most valuable external asset from this exercise.', decision: 'Budget approval and timeline for MQ reprint licence.' },
        { title: 'Critical Capabilities — Internal Use Policy', accent: 'blue' as const, body: 'The CC data shows Intellect mid-pack (3rd–7th). Volante and Infosys Finacle lead 6 of 7 use cases. Publishing or referencing specific scores externally invites unfavourable comparisons.', decision: 'Recommendation: CC scores are internal only. MQ Leader badge + Composability (4.3) are the external story. CC data informs product roadmap and competitive talk tracks.' },
        { title: 'Cross-Portfolio Halo Strategy', accent: 'blue' as const, body: 'Conservative approach: platform-level statements only. Moderate approach: MQ as icebreaker in adjacent categories (Transaction Banking, Core Banking), clearly signposted as Payments-specific.', decision: 'Recommendation: Moderate approach, with clear guardrails and messaging discipline per Tier 03 in Messaging Hierarchy.' },
      ].map((d) => (
        <Card key={d.title} title={d.title} accent={d.accent}>
          <p>{d.body}</p>
          <p className="mt-2"><strong className="text-zinc-200">Decision needed:</strong> {d.decision}</p>
        </Card>
      ))}

      <Callout variant="info">
        <strong>Recommended next steps:</strong> Working session (Manish, Borna, Chetan, Conor, Vivek) to align on Priority 1–4 investment decisions. The CC data gives us precise scoring to track improvement — re-evaluate after next Gartner cycle.
      </Callout>
    </div>
  );
}

/* ─── Main component ─── */

export default function GartnerFramework({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const tabContent: Record<TabId, React.ReactNode> = {
    overview: <Overview />,
    quadrant: <Quadrant />,
    strengths: <Strengths />,
    portfolio: <Portfolio />,
    competitive: <Competitive />,
    regions: <Regions />,
    messaging: <Messaging />,
    pipeline: <Pipeline />,
    decisions: <Decisions />,
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-5">
        <h1 className="text-lg font-semibold text-zinc-100">Gartner Activation &amp; Market Positioning Framework</h1>
        <p className="mt-0.5 text-sm text-zinc-500">Intellect Design Arena — Updated with Critical Capabilities Data (24 Feb 2026)</p>
        <p className="mt-1 text-xs text-zinc-700">CONFIDENTIAL — Internal Use Only · March 2026 · Signed in as {userEmail}</p>
      </header>

      {/* Tab nav */}
      <nav className="sticky top-0 z-50 flex gap-0 overflow-x-auto border-b border-zinc-800 bg-zinc-950/95 px-6 backdrop-blur-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-500 text-zinc-100'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">{tabContent[activeTab]}</main>
    </div>
  );
}
