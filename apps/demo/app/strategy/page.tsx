import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategy — PhoenixOS',
  description: 'Internal strategy tools and frameworks.',
};

const tools = [
  {
    href: '/strategy/gartner-activation',
    title: 'Gartner Activation & Market Positioning',
    description: 'Framework for leveraging the 2026 Gartner MQ Leader designation across regions, categories, and messaging tiers.',
    date: 'March 2026',
    status: 'Active',
  },
];

export default async function StrategyIndexPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/strategy');
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 px-6 py-5">
        <h1 className="text-lg font-semibold text-zinc-100">Strategy</h1>
        <p className="mt-0.5 text-sm text-zinc-500">Internal strategy tools and frameworks — Intellect Design Arena</p>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="space-y-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{tool.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{tool.description}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-1">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase text-emerald-400">
                    {tool.status}
                  </span>
                  <span className="text-xs text-zinc-600">{tool.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
