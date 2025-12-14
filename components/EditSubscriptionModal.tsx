'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Subscription, SubscriptionCategory } from '@/types/database';
import { getTodayIndiaDateString } from '@/lib/utils';

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
}

export function EditSubscriptionModal({
  isOpen,
  onClose,
  subscription,
}: EditSubscriptionModalProps) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Quarterly' | 'Yearly' | 'Once'>('Monthly');
  const [startDate, setStartDate] = useState('');
  const [category, setCategory] = useState<SubscriptionCategory>('Entertainment');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setCost(subscription.cost.toString());
      setBillingCycle(subscription.billing_cycle);
      setStartDate(subscription.start_date);
      setCategory(subscription.category);
      setPaymentMethod(subscription.payment_method || '');
    }
  }, [subscription]);

  const handleSubmit = async () => {
    if (!subscription || !name || !cost) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          name,
          cost: parseFloat(cost),
          billing_cycle: billingCycle,
          start_date: startDate,
          category,
          payment_method: paymentMethod.trim() || null,
        })
        .eq('id', subscription.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      onClose();
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto border-2 border-gray-200">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold">Edit Subscription</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all"
              placeholder="Subscription name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Cost (₹)</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Billing Cycle</label>
            <select
              value={billingCycle}
              onChange={(e) =>
                setBillingCycle(
                  e.target.value as 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
                )
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all font-medium"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
              <option value="Once">Once</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all"
            />
            <p className="mt-2 text-xs text-gray-600 font-medium">
              💡 This is when your subscription started or will start
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as SubscriptionCategory
                )
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all font-medium"
            >
              <option value="Entertainment">Entertainment</option>
              <option value="Utility">Utility</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Music">Music</option>
              <option value="Gaming">Gaming</option>
              <option value="News">News</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Payment Method (Optional)
            </label>
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="e.g., Paytm UPI, HDFC Credit Card, PhonePe"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white transition-all"
            />
            <p className="mt-2 text-xs text-gray-600 font-medium">
              💡 Track which payment method is linked to this subscription
            </p>
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !name || !cost || !startDate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

