'use client';

import { useState, useMemo } from 'react';
import { Plus, LogOut, Calendar, List } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { SubscriptionCard } from './SubscriptionCard';
import { AddSubscriptionModal } from './AddSubscriptionModal';
import { EditSubscriptionModal } from './EditSubscriptionModal';
import {
  formatCurrency,
  calculateMonthlyCost,
  getDaysUntilRenewal,
  getNextRenewalDate,
  formatIndiaDate,
  dateToIndiaDateString,
} from '@/lib/utils';
import { Subscription } from '@/types/database';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  user: {
    id: string;
    email?: string;
  };
}

type ViewMode = 'all' | 'upcoming';

interface UpcomingRenewal {
  subscription: Subscription;
  renewalDate: Date;
  daysUntil: number;
  amount: number;
}

export function Dashboard({ user }: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
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

  const renewMutation = useMutation({
    mutationFn: async (subscription: Subscription) => {
      if (subscription.billing_cycle === 'Once') {
        throw new Error('Cannot renew a one-time payment');
      }

      const nextRenewalDate = getNextRenewalDate(
        subscription.start_date,
        subscription.billing_cycle
      );
      const newStartDate = dateToIndiaDateString(nextRenewalDate);

      const { error } = await supabase
        .from('subscriptions')
        .update({ start_date: newStartDate })
        .eq('id', subscription.id);

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

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsEditModalOpen(true);
  };

  const handleRenew = async (subscription: Subscription) => {
    try {
      await renewMutation.mutateAsync(subscription);
    } catch (error) {
      console.error('Error renewing subscription:', error);
      alert('Failed to renew subscription. Please try again.');
    }
  };

  // Calculate monthly spend
  const monthlySpend = subscriptions.reduce((total, sub) => {
    if (sub.billing_cycle === 'Once') return total;
    return total + calculateMonthlyCost(sub.cost, sub.billing_cycle);
  }, 0);

  const yearlyProjection = monthlySpend * 12;

  // Sort subscriptions by renewal date (soonest first)
  const sortedSubscriptions = useMemo(() => {
    return [...subscriptions].sort((a, b) => {
      const daysA = getDaysUntilRenewal(a.start_date, a.billing_cycle);
      const daysB = getDaysUntilRenewal(b.start_date, b.billing_cycle);
      return daysA - daysB;
    });
  }, [subscriptions]);

  // Calculate upcoming renewals
  const upcomingRenewals = useMemo(() => {
    const renewals: UpcomingRenewal[] = [];

    subscriptions.forEach((sub) => {
      if (sub.billing_cycle === 'Once') return;

      const renewalDate = getNextRenewalDate(sub.start_date, sub.billing_cycle);
      const daysUntil = getDaysUntilRenewal(sub.start_date, sub.billing_cycle);

      // Only show renewals in the next 31 days
      if (daysUntil >= 0 && daysUntil <= 31) {
        renewals.push({
          subscription: sub,
          renewalDate,
          daysUntil,
          amount: sub.cost,
        });
      }
    });

    // Sort by days until renewal (soonest first)
    return renewals.sort((a, b) => a.daysUntil - b.daysUntil);
  }, [subscriptions]);

  // Calculate total upcoming amount
  const totalUpcomingAmount = useMemo(() => {
    return upcomingRenewals.reduce((total, renewal) => total + renewal.amount, 0);
  }, [upcomingRenewals]);

  const displayName =
    profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-50">
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
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 md:p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <p className="text-sm md:text-base font-semibold text-amber-100 mb-3 uppercase tracking-wide">
              Monthly Spend
            </p>
            <p className="text-4xl md:text-5xl font-bold">
              {formatCurrency(monthlySpend)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-stone-600 to-stone-700 p-6 md:p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
            <p className="text-sm md:text-base font-semibold text-stone-100 mb-3 uppercase tracking-wide">
              Yearly Projection
            </p>
            <p className="text-4xl md:text-5xl font-bold">
              {formatCurrency(yearlyProjection)}
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="mb-6 flex gap-4 bg-white p-2 rounded-xl shadow-lg border-2 border-gray-200">
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'all'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-stone-700 hover:bg-amber-50'
            }`}
          >
            <List className="w-5 h-5" />
            All Subscriptions
          </button>
          <button
            onClick={() => setViewMode('upcoming')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'upcoming'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                : 'text-stone-700 hover:bg-amber-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Upcoming Renewals
            {upcomingRenewals.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                {upcomingRenewals.length}
              </span>
            )}
          </button>
        </div>

        {/* Add Subscription Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl font-semibold text-lg transform hover:-translate-y-0.5"
          >
            <Plus className="w-6 h-6" />
            Add Subscription
          </button>
        </div>

        {/* Content based on view mode */}
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 font-medium">Loading subscriptions...</p>
          </div>
        ) : viewMode === 'upcoming' ? (
          // Upcoming Renewals View
          <div className="space-y-6">
            {upcomingRenewals.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-12 md:p-16 text-center">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-xl text-gray-700 font-semibold mb-2">No upcoming renewals</p>
                <p className="text-gray-600">All your subscriptions are up to date!</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-amber-700 to-amber-800 p-6 rounded-2xl shadow-xl text-white">
                  <p className="text-sm font-semibold text-orange-100 mb-2 uppercase tracking-wide">
                    Total Amount Due (Next 31 Days)
                  </p>
                  <p className="text-3xl md:text-4xl font-bold">
                    {formatCurrency(totalUpcomingAmount)}
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Upcoming Renewals ({upcomingRenewals.length})
                  </h2>
                  {upcomingRenewals.map((renewal) => (
                    <div
                      key={renewal.subscription.id}
                      className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                              style={{ backgroundColor: renewal.subscription.color }}
                            >
                              <span className="text-xl font-bold">
                                {renewal.subscription.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {renewal.subscription.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {renewal.subscription.category} • {renewal.subscription.billing_cycle}
                              </p>
                            </div>
                          </div>
                          <div className="ml-16">
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Renewal Date:</strong>{' '}
                              <span className="font-semibold text-gray-900">
                                {formatIndiaDate(renewal.renewalDate.toISOString().split('T')[0])}
                              </span>
                            </p>
                            <p
                              className={`text-sm font-semibold ${
                                renewal.daysUntil === 0
                                  ? 'text-orange-600'
                                  : renewal.daysUntil <= 3
                                  ? 'text-yellow-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {renewal.daysUntil === 0
                                ? 'Renewing today!'
                                : renewal.daysUntil === 1
                                ? 'Renewing tomorrow'
                                : `Renewing in ${renewal.daysUntil} days`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 mb-2">
                            {formatCurrency(renewal.amount)}
                          </p>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => handleRenew(renewal.subscription)}
                              className="text-sm text-green-700 hover:text-green-800 font-semibold"
                            >
                              Renewed
                            </button>
                            <button
                              onClick={() => handleEdit(renewal.subscription)}
                              className="text-sm text-amber-700 hover:text-amber-800 font-semibold"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : sortedSubscriptions.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-12 md:p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">No subscriptions yet</p>
            <p className="text-gray-600 mb-6">Start tracking your subscriptions to see them here</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg font-semibold"
            >
              Add your first subscription
            </button>
          </div>
        ) : (
          // All Subscriptions View
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Subscriptions ({sortedSubscriptions.length})
            </h2>
            {sortedSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onDelete={(id) => deleteMutation.mutate(id)}
                onEdit={handleEdit}
                onRenew={handleRenew}
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

      {/* Edit Subscription Modal */}
      <EditSubscriptionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSubscription(null);
        }}
        subscription={editingSubscription}
      />
    </div>
  );
}
