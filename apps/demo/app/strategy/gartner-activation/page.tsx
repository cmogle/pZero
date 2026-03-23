import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import GartnerFramework from './framework';

export const metadata: Metadata = {
  title: 'Gartner Activation Strategy — PhoenixOS',
  description: 'Internal strategy framework for leveraging the 2026 Gartner MQ Leader designation.',
};

export default async function GartnerActivationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/strategy/gartner-activation');
  }

  return <GartnerFramework userEmail={user.email ?? ''} />;
}
