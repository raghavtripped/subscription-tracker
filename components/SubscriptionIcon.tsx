import {
  Play,
  ShoppingBag,
  UtensilsCrossed,
  Heart,
  Package,
  Music,
  Music2,
  Music4,
  Headphones,
  Video,
  Tv,
  Tv2,
  Globe,
  Sun,
  Cloud,
  Files,
  Palette,
  Phone,
  Dumbbell,
  Activity,
  Smile,
  Stethoscope,
  Newspaper,
  BookOpen,
  Book,
  Gamepad,
  Gamepad2,
  Car,
  Wallet,
  Pizza,
  ShoppingBasket,
} from 'lucide-react';

interface SubscriptionIconProps {
  iconKey: string;
  className?: string;
}

export function SubscriptionIcon({ iconKey, className }: SubscriptionIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    // Entertainment
    netflix: <Play className={className} />,
    hotstar: <Play className={className} />,
    prime: <ShoppingBag className={className} />,
    youtube: <Play className={className} />,
    jiocinema: <Play className={className} />,
    // Music
    spotify: <Music className={className} />,
    apple: <Package className={className} />,
    // Food
    zomato: <UtensilsCrossed className={className} />,
    swiggy: <UtensilsCrossed className={className} />,
    blinkit: <ShoppingBag className={className} />,
    // Default
    custom: <Package className={className} />,
  };

  // Fallback to custom if icon not found
  return (
    <div className="flex items-center justify-center">
      {iconMap[iconKey] || iconMap.custom}
    </div>
  );
}

