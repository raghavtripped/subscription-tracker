import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { Dashboard } from '@/components/Dashboard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 px-4">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full border border-amber-100 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Environment not configured</h1>
          <p className="text-gray-700 mb-4">
            Please set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your
            environment (Vercel project settings or .env.local).
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <Dashboard user={user} />;
}

