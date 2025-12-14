export interface SubscriptionPreset {
  name: string;
  plans: {
    name: string;
    cost: number;
  }[];
  color: string;
  iconKey: string;
  category: 'Entertainment' | 'Utility' | 'Food' | 'Health';
}

export const SUBSCRIPTION_PRESETS: SubscriptionPreset[] = [
  {
    name: 'Disney+ Hotstar',
    plans: [
      { name: 'Mobile', cost: 149 },
      { name: 'Super', cost: 899 },
      { name: 'Premium', cost: 1499 },
    ],
    color: '#13284a',
    iconKey: 'hotstar',
    category: 'Entertainment',
  },
  {
    name: 'Netflix India',
    plans: [
      { name: 'Mobile', cost: 149 },
      { name: 'Basic', cost: 199 },
      { name: 'Premium', cost: 649 },
    ],
    color: '#E50914',
    iconKey: 'netflix',
    category: 'Entertainment',
  },
  {
    name: 'Amazon Prime',
    plans: [
      { name: 'Monthly', cost: 299 },
      { name: 'Yearly', cost: 1499 },
    ],
    color: '#00A8E1',
    iconKey: 'prime',
    category: 'Entertainment',
  },
  {
    name: 'Zomato Gold',
    plans: [
      { name: '3 Months', cost: 99 },
    ],
    color: '#CB202D',
    iconKey: 'zomato',
    category: 'Food',
  },
  {
    name: 'Swiggy One',
    plans: [
      { name: '3 Months', cost: 249 },
    ],
    color: '#FC8019',
    iconKey: 'swiggy',
    category: 'Food',
  },
  {
    name: 'YouTube Premium',
    plans: [
      { name: 'Month', cost: 129 },
    ],
    color: '#FF0000',
    iconKey: 'youtube',
    category: 'Entertainment',
  },
  {
    name: 'Spotify',
    plans: [
      { name: 'Month', cost: 119 },
    ],
    color: '#1DB954',
    iconKey: 'spotify',
    category: 'Entertainment',
  },
  {
    name: 'JioCinema Premium',
    plans: [
      { name: 'Month', cost: 29 },
    ],
    color: '#D8046B',
    iconKey: 'jiocinema',
    category: 'Entertainment',
  },
  {
    name: 'Apple One',
    plans: [
      { name: 'Month', cost: 195 },
    ],
    color: '#000000',
    iconKey: 'apple',
    category: 'Utility',
  },
  {
    name: 'Blinkit',
    plans: [
      { name: 'Month', cost: 99 },
    ],
    color: '#F8CB46',
    iconKey: 'blinkit',
    category: 'Food',
  },
];

export function findPresetByName(name: string): SubscriptionPreset | undefined {
  return SUBSCRIPTION_PRESETS.find(
    (preset) => preset.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function searchPresets(query: string): SubscriptionPreset[] {
  const lowerQuery = query.toLowerCase();
  return SUBSCRIPTION_PRESETS.filter((preset) =>
    preset.name.toLowerCase().includes(lowerQuery)
  );
}

