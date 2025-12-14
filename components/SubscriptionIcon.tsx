import {
  Play,
  ShoppingBag,
  UtensilsCrossed,
  Heart,
  Package,
} from 'lucide-react';

interface SubscriptionIconProps {
  iconKey: string;
  className?: string;
}

export function SubscriptionIcon({ iconKey, className }: SubscriptionIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    netflix: <Play className={className} />,
    hotstar: <Play className={className} />,
    prime: <ShoppingBag className={className} />,
    zomato: <UtensilsCrossed className={className} />,
    swiggy: <UtensilsCrossed className={className} />,
    youtube: <Play className={className} />,
    spotify: <Play className={className} />,
    jiocinema: <Play className={className} />,
    apple: <Package className={className} />,
    blinkit: <ShoppingBag className={className} />,
    custom: <Package className={className} />,
  };

  return (
    <div className="flex items-center justify-center">
      {iconMap[iconKey] || iconMap.custom}
    </div>
  );
}

