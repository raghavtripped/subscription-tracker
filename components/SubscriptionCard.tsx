import { Subscription } from '@/types/database';
import { formatCurrency, getDaysUntilRenewal, formatIndiaDate } from '@/lib/utils';
import { SubscriptionIcon } from './SubscriptionIcon';
import { Pencil, RotateCcw } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete?: (id: string) => void;
  onEdit?: (subscription: Subscription) => void;
  onRenew?: (subscription: Subscription) => void;
}

export function SubscriptionCard({
  subscription,
  onDelete,
  onEdit,
  onRenew,
}: SubscriptionCardProps) {
  const daysUntilRenewal = getDaysUntilRenewal(
    subscription.start_date,
    subscription.billing_cycle
  );

  const getRenewalText = () => {
    if (subscription.billing_cycle === 'Once') {
      return 'One-time payment';
    }
    if (daysUntilRenewal < 0) {
      return 'Overdue';
    }
    if (daysUntilRenewal === 0) {
      return 'Renewing today';
    }
    if (daysUntilRenewal === 1) {
      return 'Renewing tomorrow';
    }
    return `Renewing in ${daysUntilRenewal} days`;
  };

  const getRenewalColor = () => {
    if (subscription.billing_cycle === 'Once') return 'text-gray-600';
    if (daysUntilRenewal < 0) return 'text-red-600 font-bold';
    if (daysUntilRenewal === 0) return 'text-orange-600 font-bold';
    if (daysUntilRenewal <= 3) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  return (
    <div
      className="flex items-center gap-4 p-5 md:p-6 bg-white rounded-xl shadow-lg border-2 border-stone-200 hover:shadow-xl hover:border-amber-300 transition-all transform hover:-translate-y-1"
      style={{ borderLeftColor: subscription.color, borderLeftWidth: '6px' }}
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md"
        style={{ backgroundColor: subscription.color }}
      >
        <SubscriptionIcon iconKey={subscription.icon_key} className="w-7 h-7 md:w-8 md:h-8" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg md:text-xl text-gray-900 truncate mb-1">
          {subscription.name}
        </h3>
        <p className={`text-sm md:text-base font-semibold mb-2 ${getRenewalColor()}`}>
          {getRenewalText()}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
            {subscription.category}
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            {subscription.billing_cycle}
          </span>
        </div>
        {subscription.payment_method && (
          <p className="text-xs text-gray-600 mt-2 font-medium" title="Payment Method">
            💳 {subscription.payment_method}
          </p>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-bold text-xl md:text-2xl text-gray-900 mb-1">
          {formatCurrency(subscription.cost)}
        </p>
        <p className="text-xs text-gray-600 font-medium">
          {formatIndiaDate(subscription.start_date)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {onRenew && subscription.billing_cycle !== 'Once' && (
          <button
            onClick={() => onRenew(subscription)}
            className="p-2.5 text-green-600 hover:bg-green-50 rounded-lg transition-all hover:scale-110"
            aria-label="Mark as renewed"
            title="Mark as renewed - moves to next billing cycle"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(subscription)}
            className="p-2.5 text-amber-700 hover:bg-amber-50 rounded-lg transition-all hover:scale-110"
            aria-label="Edit subscription"
            title="Edit subscription"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(subscription.id)}
            className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
            aria-label="Delete subscription"
            title="Delete subscription"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

