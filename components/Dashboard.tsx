'use client';

import { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { SubscriptionCard } from './SubscriptionCard';
import { AddSubscriptionModal } from './AddSubscriptionModal';
import {
  formatCurrency,
  calculateMonthlyCost,
  getDaysUntilRenewal,
} from '@/lib/utils';
import { Subscription } from '@/types/database';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  user: {
    id: string;
    email?: string;
  };
}

export function Dashboard({ user }: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = createClient();

  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data as Subscription[];
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('subscriptions')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Calculate monthly spend
  const monthlySpend = subscriptions.reduce((total, sub) => {
    if (sub.billing_cycle === 'Once') return total;
    return total + calculateMonthlyCost(sub.cost, sub.billing_cycle);
  }, 0);

  const yearlyProjection = monthlySpend * 12;

  // Sort subscriptions by renewal date (soonest first)
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    const daysA = getDaysUntilRenewal(a.start_date, a.billing_cycle);
    const daysB = getDaysUntilRenewal(b.start_date, b.billing_cycle);
    return daysA - daysB;
  });

  const displayName =
    profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Hello, {displayName}! 👋
            </h1>
            <p className="text-lg text-gray-700 font-medium">Manage your subscriptions</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-white hover:shadow-md rounded-xl transition-all border-2 border-gray-200 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 md:p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <p className="text-sm md:text-base font-semibold text-blue-100 mb-3 uppercase tracking-wide">
              Monthly Spend
            </p>
            <p className="text-4xl md:text-5xl font-bold">
              {formatCurrency(monthlySpend)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 md:p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <p className="text-sm md:text-base font-semibold text-purple-100 mb-3 uppercase tracking-wide">
              Yearly Projection
            </p>
            <p className="text-4xl md:text-5xl font-bold">
              {formatCurrency(yearlyProjection)}
            </p>
          </div>
        </div>

        {/* Add Subscription Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg transform hover:-translate-y-0.5"
          >
            <Plus className="w-6 h-6" />
            Add Subscription
          </button>
        </div>

        {/* Subscriptions List */}
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 font-medium">Loading subscriptions...</p>
          </div>
        ) : sortedSubscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-12 md:p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">No subscriptions yet</p>
            <p className="text-gray-600 mb-6">Start tracking your subscriptions to see them here</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg font-semibold"
            >
              Add your first subscription
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Subscriptions</h2>
            {sortedSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

