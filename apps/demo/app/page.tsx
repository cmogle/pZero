'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  AlertCircle,
  Building2,
  Mail,
  CheckCircle2,
  FileText,
  Send,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { ArtifactReviewPanel } from '@pzero/app/components';
import type { ReviewPayload, ReviewVerdict } from '@pzero/runtime';
import { submitReviewAndHandoff } from '@pzero/app';
import type { DemoPipelineResult } from '@/demo/pipeline';
import { DEMO_SUGGESTED_SEND_TIME, ACME_ACCOUNT_ID, ACME_SIGNAL_SUMMARY_TEXT } from '@/demo/data';

const STEPS = [
  { id: 1, title: 'Dashboard', icon: Building2 },
  { id: 2, title: 'Signal Alert', icon: AlertCircle },
  { id: 3, title: 'Consideration Pass', icon: FileText },
  { id: 4, title: 'Assembler', icon: Mail },
  { id: 5, title: 'AM Review', icon: CheckCircle2 },
  { id: 6, title: 'Sent', icon: Send },
] as const;

export default function DemoPage() {
  const [data, setData] = useState<DemoPipelineResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewResult, setReviewResult] = useState<{ accepted: boolean; message?: string } | null>(null);
  const [sentAt, setSentAt] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/demo')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = useCallback(
    async (payload: ReviewPayload, verdict: ReviewVerdict) => {
      if (!payload) return;
      setReviewSubmitting(true);
      setReviewResult(null);
      try {
        const result = submitReviewAndHandoff(payload, verdict, () => {
          setSentAt(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
          setTimeout(() => setStep(6), 400);
        });
        setReviewResult({
          accepted: result.accepted,
          message: result.accepted ? 'Approved — handed off to execution.' : result.rejectionReason ?? 'Rejected.',
        });
      } finally {
        setReviewSubmitting(false);
      }
    },
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-500 motion-safe:animate-spin" aria-hidden />
        <span className="sr-only">Loading demo…</span>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-400 font-medium">Failed to load demo</p>
          <p className="text-sm text-zinc-400 mt-2">{error ?? 'No data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold text-zinc-50 mb-3">PhoenixOS Demo — Signal to Action</h1>
          <nav aria-label="Demo steps" className="flex flex-wrap gap-2">
            {STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                aria-current={step === s.id ? 'step' : undefined}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                  step === s.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <s.icon className="h-4 w-4" aria-hidden />
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Step 1: Dashboard */}
        {step === 1 && (
          <section aria-labelledby="step1-title">
            <h2 id="step1-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              Command Center
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Tracked B2B accounts with recent signal activity. One account has a high-priority trigger.
            </p>
            <ul className="space-y-3" role="list">
              {data.accounts.map((acc) => {
                const signals = data.signals.filter((s) => s.accountId === acc.id);
                const isAcme = acc.id === ACME_ACCOUNT_ID;
                return (
                  <li key={acc.id}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className={`w-full text-left p-4 rounded-md border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                        isAcme
                          ? 'border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10'
                          : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-zinc-500 shrink-0" aria-hidden />
                          <span className="font-medium text-zinc-50">{acc.label}</span>
                          {isAcme && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              <AlertCircle className="h-3 w-3" aria-hidden />
                              High priority
                            </span>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-500 shrink-0" aria-hidden />
                      </div>
                      {signals.length > 0 && (
                        <p className="mt-2 text-xs text-zinc-400 truncate">
                          {signals[0].headline}
                        </p>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-zinc-500">
              Click <strong className="text-zinc-400">Acme Corp</strong> to open the signal alert.
            </p>
          </section>
        )}

        {/* Step 2: Signal Alert */}
        {step === 2 && (
          <section aria-labelledby="step2-title">
            <h2 id="step2-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              Signal Alert — Acme Corp
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              The trigger: funding event plus supporting signals.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-6 space-y-4">
              {data.acmeSummary && (
                <>
                  <div>
                    <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-1">
                      Primary signal
                    </p>
                    <p className="text-zinc-50 font-medium">{data.acmeSummary.headline}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(data.acmeSummary.observedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                    {data.acmeSummary.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-zinc-800">
                    <p className="text-sm text-zinc-300 italic">
                      &ldquo;{ACME_SIGNAL_SUMMARY_TEXT}&rdquo;
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Continue to Consideration
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </section>
        )}

        {/* Step 3: Consideration Pass */}
        {step === 3 && data.consideration && data.decision && (
          <section aria-labelledby="step3-title">
            <h2 id="step3-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              Consideration Pass — Playbook Match
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              System matched the signal to a playbook and content block candidates.
            </p>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">
                  Matched playbook
                </p>
                <p className="text-zinc-50 font-medium">
                  {data.consideration.playbookCandidates[0]?.name ?? data.decision.playbookId}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Confidence: tag match on &ldquo;funding&rdquo;
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">
                  Content block candidates
                </p>
                <ul className="space-y-1 text-sm text-zinc-300">
                  {data.consideration.contentBlockCandidates.map((c) => (
                    <li key={c.id}>• {c.label}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-1">
                  Reasoning
                </p>
                <p className="font-mono text-sm text-zinc-300">{data.decision.reasoning}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Continue to Assembler
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </section>
        )}

        {/* Step 4: Assembler */}
        {step === 4 && data.artifact && (
          <section aria-labelledby="step4-title">
            <h2 id="step4-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              Assembler — Action Artifact
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Personalized email draft and suggested send time.
            </p>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mb-2">
                  Draft ({data.artifact.kind})
                </p>
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans">
                  {data.artifact.body}
                </pre>
              </div>
              <p className="text-sm text-zinc-400">
                Suggested send time: <span className="text-zinc-300">{DEMO_SUGGESTED_SEND_TIME}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(5)}
              className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Send to AM Review
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </section>
        )}

        {/* Step 5: AM Review */}
        {step === 5 && data.reviewPayload && (
          <section aria-labelledby="step5-title">
            <h2 id="step5-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              AM Review — Human in the Loop
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Review the assembled artifact, edit if needed, then approve to dispatch.
            </p>
            <ArtifactReviewPanel
              payload={data.reviewPayload}
              onVerdict={(verdict) => handleApprove(data.reviewPayload!, verdict)}
              submitting={reviewSubmitting}
              result={reviewResult ?? undefined}
            />
          </section>
        )}

        {/* Step 6: Sent */}
        {step === 6 && (
          <section aria-labelledby="step6-title">
            <h2 id="step6-title" className="text-2xl font-semibold text-zinc-50 mb-2">
              Sent — Confirmation
            </h2>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 flex items-start gap-3">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-medium text-emerald-400">Action artifact dispatched</p>
                <p className="text-sm text-zinc-300 mt-2">
                  Email sent to Sarah Chen (VP Sales, Acme Corp){' '}
                  {sentAt ? `at ${sentAt}` : ''}.
                </p>
                <p className="text-xs text-zinc-500 mt-2">
                  Account card status: <strong className="text-zinc-400">Action taken — awaiting response</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Restart demo
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
