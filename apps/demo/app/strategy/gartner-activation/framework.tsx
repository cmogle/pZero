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

/* ─── Tab content ─── */

function Overview() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Executive Summary</h2>
        <p className="mt-1 text-sm text-zinc-500">What we have, what it means, and what we need to decide.</p>
      </div>

      <Callout variant="success">
        <strong>The headline:</strong> Intellect Design Arena is positioned as a <strong className="text-zinc-100">Leader</strong> in the 2026 Gartner Magic Quadrant for Banking Payment Hub Platforms. This is our first Leader designation in this category.
      </Callout>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="What Gartner Validates">
          <ul className="mt-1 space-y-1.5">
            <li>Composable, microservices-based architecture (eMACH.ai)</li>
            <li>ISO 20022-native canonical data model</li>
            <li>Corporate payments depth and bulk payment processing</li>
            <li>AI capabilities via Purple Fabric (payment repair agents, RM co-pilots, ops insight)</li>
            <li>No-code payment rail configurator for rapid scheme launch</li>
            <li>SaaS deployment with live customer references</li>
          </ul>
        </Card>
        <Card title="What Gartner Flags as Cautions">
          <ul className="mt-1 space-y-1.5">
            <li>Not top-3 across most use-case categories in Critical Capabilities</li>
            <li>No current support for stablecoins / alternative cross-border methods</li>
            <li>SaaS adoption — buyers need proof of SaaS experience in their specific market</li>
            <li>Brand awareness gap in North America (implied by market context)</li>
          </ul>
        </Card>
      </div>

      <Card title="The Strategic Question">
        <p>We have a Leader designation in Payments — a category where we are largely unknown in North America, our highest-value growth market. How do we (a) activate this to maximum commercial effect for Payments, and (b) use it as a credibility catalyst across our full portfolio — Consumer Banking, Transaction Banking, Wealth, Treasury, Insurance, Capital Markets — without overstepping what Gartner actually says?</p>
      </Card>

      <Callout variant="warning">
        <strong>Key tension:</strong> Chetan&apos;s team needs this report as a door-opener for $100M+ existing pipeline and $50–70M net new in North America. Marketing needs to ensure we activate with discipline — the &quot;Leader&quot; label opens doors, but the use-case rankings mean we must be precise about what we claim and where we lead with it.
      </Callout>
    </div>
  );
}

function Quadrant() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">2026 Magic Quadrant Landscape</h2>
        <p className="mt-1 text-sm text-zinc-500">Confirmed vendor positions based on public announcements. Full quadrant requires report access.</p>
      </div>

      {/* Visual quadrant */}
      <div className="relative mx-auto aspect-square w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900/30">
        <div className="absolute left-0 top-1/2 w-full border-t border-zinc-800" />
        <div className="absolute left-1/2 top-0 h-full border-l border-zinc-800" />

        <span className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Challengers</span>
        <span className="absolute right-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Leaders</span>
        <span className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Niche Players</span>
        <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Visionaries</span>

        {/* Confirmed Leaders */}
        <div className="absolute" style={{ top: '28%', left: '72%' }}>
          <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500" title="Intellect" />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-300">Intellect</span>
        </div>
        <div className="absolute" style={{ top: '22%', left: '78%' }}>
          <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" title="CGI" />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-300">CGI</span>
        </div>
        <div className="absolute" style={{ top: '30%', left: '68%' }}>
          <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" title="Volante" />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-300">Volante</span>
        </div>

        {/* Confirmed Visionary */}
        <div className="absolute" style={{ top: '62%', left: '65%' }}>
          <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500" title="NetXD" />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-zinc-500">NetXD</span>
        </div>

        {/* Estimated positions */}
        {[
          { name: 'ACI*', top: '25%', left: '42%' },
          { name: 'Finastra*', top: '32%', left: '55%' },
          { name: 'FIS*', top: '20%', left: '48%' },
          { name: 'Temenos*', top: '38%', left: '60%' },
          { name: 'Bottomline*', top: '45%', left: '38%' },
        ].map((v) => (
          <div key={v.name} className="absolute" style={{ top: v.top, left: v.left }}>
            <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-600 bg-zinc-700" title={v.name} />
            <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap text-[11px] text-zinc-600">{v.name}</span>
          </div>
        ))}

        {/* Axis labels */}
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600">Completeness of Vision →</span>
      </div>
      <p className="text-center text-xs text-zinc-600">Solid dots = confirmed via public announcements. Grey dots with * = estimated positions. Full quadrant requires Gartner report access.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Confirmed Leaders">
          <div className="space-y-2">
            <p><Tag variant="leader">Leader</Tag> <strong className="text-zinc-200">Intellect Design Arena</strong> — eMACH.ai Payments</p>
            <p><Tag variant="leader">Leader</Tag> <strong className="text-zinc-200">CGI</strong> — CGI All Payments</p>
            <p><Tag variant="leader">Leader</Tag> <strong className="text-zinc-200">Volante Technologies</strong> — Cloud-native payments</p>
          </div>
        </Card>
        <Card title="Other Confirmed Positions">
          <div className="space-y-2">
            <p><Tag variant="visionary">Visionary</Tag> <strong className="text-zinc-200">NetXD</strong></p>
            <p className="mt-3 font-medium text-zinc-300">Likely evaluated (not yet confirmed):</p>
            <p>ACI Worldwide, Finastra, FIS, Temenos, Bottomline, Montran, Infosys Finacle, Icon Solutions</p>
          </div>
        </Card>
      </div>

      <Callout variant="info">
        <strong>Action needed:</strong> We need access to the full report to confirm all vendor positions, exact quadrant placement, and — critically — the Critical Capabilities use-case scores.
      </Callout>
    </div>
  );
}

function Strengths() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Strengths & Cautions Analysis</h2>
        <p className="mt-1 text-sm text-zinc-500">What Gartner recognises, what they flag, and how we should handle each.</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Gartner-Recognised Strengths</h3>

      <Card title="Corporate Payments Depth" accent="green">
        <p><StatusDot color="green" />Gartner explicitly highlights Intellect&apos;s particular emphasis on corporate payments, including centralised bulk payment processing and payment limit management across corporate groups. This is our single strongest differentiator for U.S. Tier 1/2 prospects.</p>
        <p className="mt-2"><strong className="text-zinc-200">Activation:</strong> Lead with this in every North America pursuit.</p>
      </Card>
      <Card title="AI-First via Purple Fabric" accent="green">
        <p><StatusDot color="green" />Gartner recognises AI agents for payment repair, co-pilots for relationship managers, and operational insight capabilities. Positions us distinctly in a market where AI is expected but rarely substantiated.</p>
        <p className="mt-2"><strong className="text-zinc-200">Activation:</strong> Package as &quot;AI that&apos;s already live&quot; — not roadmap. Quantify where possible.</p>
      </Card>
      <Card title="Composable Architecture & No-Code Configurator" accent="green">
        <p><StatusDot color="green" />ISO 20022 canonical model and no-code payment rail configurator enable banks to adapt quickly. Strong future-proofing message.</p>
        <p className="mt-2"><strong className="text-zinc-200">Activation:</strong> Position as &quot;adapt without re-platforming&quot; — directly counters legacy vendor lock-in narrative.</p>
      </Card>
      <Card title="SaaS with Live Customers" accent="green">
        <p><StatusDot color="green" />Cloud deployment with existing SaaS customers. In the U.S., cloud-readiness is a prerequisite, but having live references is the differentiator.</p>
        <p className="mt-2"><strong className="text-zinc-200">Activation:</strong> Identify and prepare reference-able SaaS deployments for prospect calls.</p>
      </Card>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-400">Cautions & Mitigation</h3>

      <Card title="Alternative Payments (Stablecoins, Alternative Cross-Border)" accent="amber">
        <p><StatusDot color="amber" />Gartner notes Intellect does not currently support stablecoins and alternative cross-border payment methods.</p>
        <Callout variant="warning">
          <strong>Recommended:</strong> Do not over-defend. Anchor on payment types where we are strongest today. If asked, position stablecoin/crypto as a roadmap item, not a gap.
        </Callout>
      </Card>
      <Card title="SaaS Market-Specific Experience" accent="amber">
        <p><StatusDot color="amber" />Customers need to validate SaaS track record in their specific market.</p>
        <Callout variant="warning">
          <strong>Recommended:</strong> Prepare a &quot;SaaS readiness&quot; one-pager for each target market with deployment methodology, timelines, and references.
        </Callout>
      </Card>
      <Card title="Use-Case Rankings: Not Top-3 in Most Categories" accent="red">
        <p><StatusDot color="red" />While we are a Leader in the MQ, we are not positioned among the top-3 vendors across most use-case categories in the Critical Capabilities report.</p>
        <Callout variant="danger">
          <strong>Critical:</strong> We should NEVER lead externally with Critical Capabilities scores or invite use-case-by-use-case comparisons. The MQ Leader status is the headline. CC scores are for internal roadmap prioritisation only.
        </Callout>
      </Card>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Full Portfolio: Analyst & Market Positioning</h2>
        <p className="mt-1 text-sm text-zinc-500">How the Gartner Payments recognition fits within Intellect&apos;s broader product landscape.</p>
      </div>

      <Callout variant="info">
        <strong>The opportunity:</strong> The Payments Leader designation can create a credibility halo across adjacent categories — but only if we link platform-level strengths (eMACH.ai, Purple Fabric, composability) rather than implying the MQ covers categories it doesn&apos;t.
      </Callout>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="pb-3 pr-4">Business Line</th>
              <th className="pb-3 pr-4">Key Product</th>
              <th className="pb-3 pr-4">Gartner Coverage</th>
              <th className="pb-3 pr-4">Halo Potential</th>
              <th className="pb-3">Key Competitors</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Payments</td>
              <td className="py-3 pr-4">eMACH.ai Payments</td>
              <td className="py-3 pr-4"><Tag variant="leader">MQ Leader 2026</Tag></td>
              <td className="py-3 pr-4">—</td>
              <td className="py-3">CGI, Volante, ACI, FIS, Finastra</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Transaction Banking</td>
              <td className="py-3 pr-4">iGTB Digital, Cash Mgmt, Trade</td>
              <td className="py-3 pr-4">Peer Insights reviewed</td>
              <td className="py-3 pr-4"><Tag variant="strength">High</Tag></td>
              <td className="py-3">Finastra, Temenos, TCS BaNCS</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Consumer Banking</td>
              <td className="py-3 pr-4">Core Banking, Lending, Cards</td>
              <td className="py-3 pr-4">Peer Insights — CBS</td>
              <td className="py-3 pr-4"><Tag variant="strength">High</Tag></td>
              <td className="py-3">Temenos, Finacle, FIS, Thought Machine</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Wealth & Capital Markets</td>
              <td className="py-3 pr-4">Wealth Mgmt, Brokerage</td>
              <td className="py-3 pr-4">Limited coverage</td>
              <td className="py-3 pr-4"><Tag variant="caution">Medium</Tag></td>
              <td className="py-3">Temenos, Avaloq, SS&C</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Treasury</td>
              <td className="py-3 pr-4">Bank Treasury Management</td>
              <td className="py-3 pr-4">Limited coverage</td>
              <td className="py-3 pr-4"><Tag variant="caution">Medium</Tag></td>
              <td className="py-3">Finastra, Calypso, Murex</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-3 pr-4 font-medium text-zinc-200">Insurance</td>
              <td className="py-3 pr-4">Magic Submission, Risk Analyst</td>
              <td className="py-3 pr-4">Separate categories</td>
              <td className="py-3 pr-4"><Tag variant="risk">Lower</Tag></td>
              <td className="py-3">Guidewire, Duck Creek, Majesco</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Platform-Level Narrative (Safe to Use Broadly)">
          <p>The eMACH.ai platform underpinning our Gartner-recognised Payments hub powers all Intellect solutions. Lead with:</p>
          <ul className="mt-2 space-y-1">
            <li>eMACH.ai composable architecture</li>
            <li>Purple Fabric AI platform (domain-agnostic)</li>
            <li>ISO 20022-native design</li>
            <li>500+ customers across 61 countries</li>
            <li>Euromoney &quot;Best Transaction Banking Software 2025&quot;</li>
          </ul>
        </Card>
        <Card title="Category-Specific Claims (Use with Discipline)">
          <p>Only reference the MQ Leader status in Payments-specific contexts. For other categories:</p>
          <ul className="mt-2 space-y-1">
            <li>Use peer recognition and customer references</li>
            <li>Cite platform architecture pedigree, not MQ</li>
            <li>Never imply MQ covers categories it doesn&apos;t</li>
            <li>Build evidence base via Gartner Peer reviews</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Competitive() {
  const matrix = [
    { cap: 'Corporate Payments Depth', intellect: 3, cgi: 2, volante: 2, aci: 2, fis: 2 },
    { cap: 'AI-First (Production)', intellect: 3, cgi: 1, volante: 2, aci: 2, fis: 1 },
    { cap: 'Composable / Microservices', intellect: 3, cgi: 2, volante: 3, aci: 1, fis: 1 },
    { cap: 'ISO 20022-Native', intellect: 3, cgi: 3, volante: 3, aci: 2, fis: 2 },
    { cap: 'No-Code Configurator', intellect: 3, cgi: 1, volante: 2, aci: 1, fis: 1 },
    { cap: 'U.S. Market References', intellect: 1, cgi: 3, volante: 3, aci: 3, fis: 3 },
    { cap: 'Alternative Payments / Crypto', intellect: 1, cgi: 1, volante: 2, aci: 2, fis: 2 },
    { cap: 'Full Banking Platform', intellect: 3, cgi: 2, volante: 1, aci: 1, fis: 3 },
  ];

  const dot = (score: number) => {
    const c = score === 3 ? 'text-emerald-400' : score === 2 ? 'text-amber-400' : 'text-red-400';
    return <span className={`font-bold ${c}`}>{'●'.repeat(score)}</span>;
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Competitive Landscape</h2>
        <p className="mt-1 text-sm text-zinc-500">Key competitors and where Intellect has differentiation.</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Payment Hub — Head-to-Head</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="pb-3 pr-4">Vendor</th>
              <th className="pb-3 pr-4">MQ Position</th>
              <th className="pb-3 pr-4">Key Strengths</th>
              <th className="pb-3 pr-4">Vulnerabilities</th>
              <th className="pb-3">U.S.</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {[
              { name: 'CGI', pos: 'Leader', str: 'Deep Tier 1/2 relationships, global standards', vuln: 'Legacy perception, less AI narrative', us: 'green' as const },
              { name: 'Volante', pos: 'Leader', str: 'Cloud-native, strong real-time, agile', vuln: 'Narrower functional breadth', us: 'green' as const },
              { name: 'ACI Worldwide', pos: 'Likely evaluated', str: 'Massive installed base, enterprise scale', vuln: 'Monolithic architecture perception', us: 'green' as const },
              { name: 'FIS', pos: 'Likely evaluated', str: 'Scale, bundled banking+payments', vuln: 'Post-Worldpay complexity, less composable', us: 'green' as const },
              { name: 'Finzly', pos: 'Not in MQ', str: 'U.S. mid-tier focus, modern, FedNow-ready', vuln: 'Small vendor risk, limited scale', us: 'green' as const },
              { name: 'Alacriti', pos: 'Not in MQ', str: 'Cloud-native, ACH/wires/FedNow', vuln: 'Narrow scope, no global footprint', us: 'green' as const },
            ].map((v) => (
              <tr key={v.name} className="border-b border-zinc-800/50">
                <td className="py-3 pr-4 font-medium text-zinc-200">{v.name}</td>
                <td className="py-3 pr-4">
                  <Tag variant={v.pos === 'Leader' ? 'leader' : 'caution'}>{v.pos}</Tag>
                </td>
                <td className="py-3 pr-4">{v.str}</td>
                <td className="py-3 pr-4">{v.vuln}</td>
                <td className="py-3"><StatusDot color={v.us} />Strong</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-400">Differentiation Matrix</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="pb-3 pr-4">Capability</th>
              <th className="pb-3 pr-4 text-center">Intellect</th>
              <th className="pb-3 pr-4 text-center">CGI</th>
              <th className="pb-3 pr-4 text-center">Volante</th>
              <th className="pb-3 pr-4 text-center">ACI</th>
              <th className="pb-3 text-center">FIS</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            {matrix.map((row) => (
              <tr key={row.cap} className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4 text-zinc-300">{row.cap}</td>
                <td className="py-2.5 pr-4 text-center">{dot(row.intellect)}</td>
                <td className="py-2.5 pr-4 text-center">{dot(row.cgi)}</td>
                <td className="py-2.5 pr-4 text-center">{dot(row.volante)}</td>
                <td className="py-2.5 pr-4 text-center">{dot(row.aci)}</td>
                <td className="py-2.5 text-center">{dot(row.fis)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-600">●●● = Strong | ●● = Partial | ● = Limited. Assessments are directional based on public information.</p>
    </div>
  );
}

function Regions() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Regional Activation Strategy</h2>
        <p className="mt-1 text-sm text-zinc-500">How and where to deploy the Gartner recognition.</p>
      </div>

      <Card title="North America" accent="blue">
        <p><Tag variant="region">Lead Market</Tag></p>
        <p className="mt-2">Our highest-value growth market. We are largely unknown in U.S. Payments. The MQ Leader status is our primary entry credential.</p>
        <p className="mt-3 font-medium text-zinc-200">Activation plan (sequenced):</p>
        <ul className="mt-1 space-y-1.5">
          <li><strong className="text-zinc-200">Phase 1 — Door opening:</strong> Use &quot;Gartner MQ Leader&quot; designation in all outreach, exec briefing requests, and event positioning.</li>
          <li><strong className="text-zinc-200">Phase 2 — Differentiation:</strong> Lead with corporate payments depth, AI/Purple Fabric, composable architecture.</li>
          <li><strong className="text-zinc-200">Phase 3 — Objection handling:</strong> Prepare proactive responses for cautions. Brief sales teams with specific talk tracks.</li>
        </ul>
        <p className="mt-3"><strong className="text-zinc-200">Owner:</strong> Chetan (commercial), Conor (messaging), Borna (coordination)</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Europe" accent="blue">
          <p><Tag variant="region">Selective</Tag></p>
          <p className="mt-2">Use selectively based on account relevance. Borna to elaborate on EBA Days strategy. European buyers are more likely to scrutinise Critical Capabilities scores — lean on local references and regulatory alignment (PSD2/PSD3, SEPA Inst).</p>
        </Card>
        <Card title="Asia-Pacific & MEA" accent="blue">
          <p><Tag variant="region">Selective</Tag></p>
          <p className="mt-2">Use where we have active opportunities and existing relationships. In these markets we have stronger brand recognition — the MQ adds external validation to an already credible story.</p>
        </Card>
      </div>
    </div>
  );
}

function Messaging() {
  const tiers = [
    {
      num: '01',
      title: 'Leader Status (The Door Opener)',
      body: '"Intellect Design Arena is recognised as a Leader in the 2026 Gartner Magic Quadrant for Banking Payment Hub Platforms." This is the headline. Use in subject lines, opening slides, LinkedIn, event backdrops, email signatures, website banners.',
    },
    {
      num: '02',
      title: 'Differentiated Strengths (The Commercial Story)',
      body: '"Gartner recognises Intellect for particular strength in corporate payments, AI-enabled operations through Purple Fabric, composable architecture, ISO 20022-native design, and rapid adaptation through no-code configuration." Use in sales conversations, collateral, analyst briefings, and RFP responses.',
    },
    {
      num: '03',
      title: 'Platform Credibility (The Broader Intellect Story)',
      body: '"The eMACH.ai platform that Gartner evaluated powers Intellect\'s full suite — from payments to core banking, transaction banking, wealth, and beyond — serving 500+ institutions across 61 countries." Use for cross-sell conversations. Be clear this is a platform statement, not a claim the MQ covers other categories.',
    },
    {
      num: '04',
      title: 'Proof Points (The Evidence Layer)',
      body: 'Customer references, deployment case studies, SaaS track record, implementation timelines, quantified AI outcomes. Only in late-stage conversations and RFP responses.',
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Messaging Hierarchy</h2>
        <p className="mt-1 text-sm text-zinc-500">A disciplined framework for how we talk about this externally. Tier 1 is always the lead.</p>
      </div>

      <div className="space-y-4">
        {tiers.map((t) => (
          <div key={t.num} className="flex gap-4 border-b border-zinc-800/50 pb-4">
            <span className="text-2xl font-bold text-zinc-800">{t.num}</span>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">{t.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{t.body}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout variant="danger">
        <strong>What we should NOT do:</strong>
        <ul className="mt-2 space-y-1">
          <li>Lead with or publish Critical Capabilities use-case scores</li>
          <li>Claim top-3 positioning in specific use cases</li>
          <li>Imply the MQ Leader status extends to Core Banking, Wealth, Insurance</li>
          <li>Make direct ranking comparisons with named competitors</li>
          <li>Over-defend on stablecoins/alternative payments</li>
        </ul>
      </Callout>
    </div>
  );
}

function Pipeline() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Pipeline & Monetisation Impact</h2>
        <p className="mt-1 text-sm text-zinc-500">Chetan&apos;s pipeline targets and how Gartner activation maps to commercial outcomes.</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Existing Accounts (Active Discussions)</h3>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        {[
          { name: 'Northern Trust', color: 'green' as const, impact: 'Strengthen executive-level credibility' },
          { name: 'M&T Bank', color: 'green' as const, impact: 'Support shortlist position' },
          { name: 'Santander', color: 'green' as const, impact: 'Reinforce incumbent advantage' },
          { name: 'Wells Fargo', color: 'amber' as const, impact: 'Key for executive access at Tier 1' },
          { name: 'Ameris, Associated, Regions', color: 'green' as const, impact: 'Validation for mid-tier pursuits' },
          { name: 'SeaCoast, BECU', color: 'green' as const, impact: 'Differentiation vs. Finzly/Alacriti' },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-3 border-b border-zinc-800/50 py-2.5 last:border-b-0">
            <StatusDot color={c.color} />
            <span className="min-w-[200px] text-sm font-medium text-zinc-200">{c.name}</span>
            <span className="text-sm text-zinc-500">{c.impact}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-sm font-semibold text-emerald-400">Existing Pipeline: $100M+ qualified</p>
        <p className="text-sm text-zinc-400">Target: 1 closure in FY27, 5-year TCV exceeding $15M</p>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Net New Accounts</h3>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        {[
          { name: 'Truist', tier: 'Tier 1', impact: 'MQ status essential for initial engagement' },
          { name: 'Mizuho, Citibank', tier: 'Tier 1', impact: 'Global presence + MQ for credibility' },
          { name: 'US Bank, PNC', tier: 'Tier 1', impact: 'Corporate payments narrative relevant' },
          { name: 'Comerica, First Citizens', tier: 'Tier 2', impact: 'MQ provides decisive edge vs. smaller vendors' },
          { name: 'Texas Capital, City National', tier: 'Tier 2', impact: 'Composability + AI for modernisation-minded banks' },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-3 border-b border-zinc-800/50 py-2.5 last:border-b-0">
            <span className="min-w-[60px] text-xs font-medium text-zinc-500">{c.tier}</span>
            <span className="min-w-[200px] text-sm font-medium text-zinc-200">{c.name}</span>
            <span className="text-sm text-zinc-500">{c.impact}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
        <p className="text-sm font-semibold text-indigo-400">Net New Pipeline: $50–70M qualified</p>
        <p className="text-sm text-zinc-400">Target: 1 closure in FY27–FY28, 5-year TCV exceeding $10M</p>
      </div>
    </div>
  );
}

function Decisions() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-zinc-100">Open Questions & Decisions Needed</h2>
        <p className="mt-1 text-sm text-zinc-500">Items requiring leadership alignment before full activation.</p>
      </div>

      {[
        { title: 'URGENT: Access to Full Gartner Report', accent: 'red' as const, body: 'Without the full MQ and Critical Capabilities reports, we cannot confirm all vendor positions, understand our exact use-case scores, build evidence-based competitive talk tracks, or validate our messaging.', decision: 'Who obtains and distributes the full report to this working group?' },
        { title: 'Critical Capabilities — Internal Use Only?', accent: 'amber' as const, body: 'Manish\'s concern about not being top-3 in most use-case categories.', decision: 'Recommendation: Yes. MQ Leader badge is the external asset. CC scores inform product roadmap priorities.' },
        { title: 'Gartner Reprint Rights', accent: 'amber' as const, body: 'Have we secured reprint rights for the MQ graphic? Essential for collateral, website, and events.', decision: 'Budget approval and timeline for reprint licence.' },
        { title: 'Cross-Portfolio Halo Strategy', accent: 'blue' as const, body: 'Conservative (platform-level statements only) vs. Moderate (MQ as icebreaker in adjacent categories, clearly signposted).', decision: 'Recommendation: Moderate approach, with clear guardrails.' },
        { title: 'U.S. Activation Budget & Timeline', accent: 'blue' as const, body: 'Chetan\'s pipeline is $150–170M combined. What marketing investment supports activation — events, content, digital, AR?', decision: 'Marketing budget allocation for H1 FY27 Gartner activation programme.' },
        { title: 'EBA Days Strategy (Europe)', accent: 'blue' as const, body: 'Borna flagged separate European activation. Needs coordination with global messaging.', decision: 'Borna to share European plan; Conor to align messaging.' },
        { title: 'SaaS Readiness Collateral', accent: 'blue' as const, body: 'Gartner\'s SaaS caution needs proactive response.', decision: 'Product/delivery team to confirm SaaS reference readiness by market.' },
      ].map((d) => (
        <Card key={d.title} title={d.title} accent={d.accent}>
          <p>{d.body}</p>
          <p className="mt-2"><strong className="text-zinc-200">Decision needed:</strong> {d.decision}</p>
        </Card>
      ))}

      <Callout variant="info">
        <strong>Next steps:</strong> Once we have the full report, recommend a focused working session (Manish, Borna, Chetan, Conor, Vivek) to finalise the activation plan, assign deliverables, and agree timelines. Target: activation assets ready within 3 weeks.
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
        <h1 className="text-lg font-semibold text-zinc-100">Gartner Activation & Market Positioning Framework</h1>
        <p className="mt-0.5 text-sm text-zinc-500">Intellect Design Arena — Strategic Assessment for Leadership</p>
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
