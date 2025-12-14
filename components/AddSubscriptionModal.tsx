'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  PRESET_SERVICES,
  SUBSCRIPTION_PRESETS,
  findPresetByName,
  type PresetService,
  type SubscriptionPreset,
} from '@/lib/presets';
import { SubscriptionCategory } from '@/types/database';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { getTodayIndiaDateString } from '@/lib/utils';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSubscriptionModal({
  isOpen,
  onClose,
}: AddSubscriptionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<PresetService | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [presetStartDate, setPresetStartDate] = useState(getTodayIndiaDateString());
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCost, setCustomCost] = useState('');
  const [customBillingCycle, setCustomBillingCycle] = useState<'Monthly' | 'Quarterly' | 'Yearly' | 'Once'>('Monthly');
  const [customStartDate, setCustomStartDate] = useState(getTodayIndiaDateString());
  const [customCategory, setCustomCategory] = useState<SubscriptionCategory>('Entertainment');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const filteredPresets = searchQuery
    ? PRESET_SERVICES.filter((preset) =>
        preset.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handlePresetSelect = (preset: PresetService) => {
    setSelectedPreset(preset);
    setSearchQuery(preset.name);
    setShowCustomForm(false);
    if (preset.plans.length === 1) {
      setSelectedPlan(preset.plans[0].name);
    }
  };

  const handleCustomSubmit = () => {
    if (!customName.trim()) return;
    setShowCustomForm(true);
    setSelectedPreset(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert('Please log in to add subscriptions');
        return;
      }

      let subscriptionData;

      if (selectedPreset && selectedPlan) {
        const plan = selectedPreset.plans.find((p) => p.name === selectedPlan);
        if (!plan) return;

        subscriptionData = {
          user_id: user.id,
          name: selectedPreset.name,
          cost: plan.price,
          billing_cycle: plan.cycle,
          start_date: presetStartDate || getTodayIndiaDateString(),
          category: selectedPreset.category,
          icon_key: selectedPreset.icon_key,
          color: selectedPreset.color,
          payment_method: paymentMethod.trim() || null,
          active: true,
        };
      } else if (showCustomForm && customName) {
        subscriptionData = {
          user_id: user.id,
          name: customName,
          cost: parseFloat(customCost) || 0,
          billing_cycle: customBillingCycle,
          start_date: customStartDate || getTodayIndiaDateString(),
          category: customCategory,
          icon_key: 'custom',
          color: '#6366f1',
          payment_method: paymentMethod.trim() || null,
          active: true,
        };
      } else {
        return;
      }

      const { error } = await supabase
        .from('subscriptions')
        .insert(subscriptionData);

      if (error) throw error;

      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });

      // Reset form
      setSearchQuery('');
      setSelectedPreset(null);
      setSelectedPlan('');
      setPresetStartDate(getTodayIndiaDateString());
      setShowCustomForm(false);
      setCustomName('');
      setCustomCost('');
      setCustomBillingCycle('Monthly');
      setCustomStartDate(getTodayIndiaDateString());
      setCustomCategory('Entertainment');
      setPaymentMethod('');

      onClose();
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto border-2 border-gray-200">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold">Add Subscription</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Search for a Service
            </label>
            <input
              ref={searchRef}
              type="text"
              placeholder="Type to search (e.g., Netflix, Hotstar, Prime)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedPreset(null);
                setShowCustomForm(false);
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all text-base"
            />

            {/* Preset Suggestions */}
            {searchQuery && !selectedPreset && !showCustomForm && (
              <div className="mt-3 border-2 border-gray-200 rounded-xl max-h-60 overflow-y-auto shadow-lg bg-white">
                {filteredPresets.length > 0 ? (
                  filteredPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-full text-left px-5 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="font-semibold text-gray-900 text-base">{preset.name}</div>
                      <div className="text-sm text-gray-600 font-medium">
                        {preset.category}
                      </div>
                    </button>
                  ))
                ) : (
                  <button
                    onClick={handleCustomSubmit}
                    className="w-full text-left px-5 py-3 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="font-semibold text-gray-900 text-base">
                      Create &quot;{searchQuery}&quot;
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Custom subscription</div>
                  </button>
                )}
              </div>
            )}

            {!searchQuery && (
              <div className="mt-2 text-sm text-gray-600 font-medium">
                💡 Start typing to search for a service or create a custom one
              </div>
            )}
          </div>

          {/* Preset Form */}
          {selectedPreset && (
            <div className="space-y-6 bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Select Plan
                </label>
                <div className="space-y-3">
                  {selectedPreset.plans.map((plan) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`w-full text-left px-5 py-3 border-2 rounded-xl transition-all ${
                        selectedPlan === plan.name
                          ? 'border-blue-600 bg-blue-100 shadow-md'
                          : 'border-gray-300 hover:bg-white hover:border-blue-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-gray-900 text-base block">{plan.name}</span>
                          <span className="text-xs text-gray-600">{plan.cycle}</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900">₹{plan.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={presetStartDate}
                  onChange={(e) => setPresetStartDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
                <p className="mt-2 text-xs text-gray-600 font-medium">
                  💡 When did/will this subscription start?
                </p>
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
                <p className="mt-2 text-xs text-gray-600 font-medium">
                  💡 Track which payment method is linked to this subscription
                </p>
              </div>
            </div>
          )}

          {/* Custom Form */}
          {showCustomForm && (
            <div className="space-y-5 bg-indigo-50 p-5 rounded-xl border-2 border-indigo-200">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
                <input
                  type="text"
                  value={customName || searchQuery}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Subscription name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Cost (₹)</label>
                <input
                  type="number"
                  value={customCost}
                  onChange={(e) => setCustomCost(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Billing Cycle
                </label>
                <select
                  value={customBillingCycle}
                  onChange={(e) =>
                    setCustomBillingCycle(
                      e.target.value as
                        | 'Monthly'
                        | 'Quarterly'
                        | 'Yearly'
                        | 'Once'
                    )
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all font-medium"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Once">Once</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
                <p className="mt-2 text-xs text-gray-600 font-medium">
                  💡 When did/will this subscription start?
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
                <select
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(
                      e.target.value as
                        | 'Entertainment'
                        | 'Utility'
                        | 'Food'
                        | 'Health'
                    )
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all font-medium"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all"
                />
                <p className="mt-2 text-xs text-gray-600 font-medium">
                  💡 Track which payment method is linked to this subscription
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                (!selectedPreset && !showCustomForm) ||
                (selectedPreset && (!selectedPlan || !presetStartDate)) ||
                (showCustomForm && (!customName || !customCost || !customStartDate))
              }
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Adding...' : 'Add Subscription'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

