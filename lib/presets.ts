export type SubscriptionCategory = 'Entertainment' | 'Food' | 'Utility' | 'Music' | 'Health' | 'Gaming' | 'News' | 'Other';

export interface PresetService {
  name: string;
  icon_key: string; // Matches a Lucide icon or custom SVG key
  color: string;
  category: SubscriptionCategory;
  plans: { name: string; price: number; cycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Bi-Annual' }[];
}

export const PRESET_SERVICES: PresetService[] = [
  // --- ENTERTAINMENT (OTT) ---
  {
    name: "Disney+ Hotstar",
    icon_key: "hotstar",
    color: "#0f1014",
    category: "Entertainment",
    plans: [
      { name: "Mobile", price: 149, cycle: "Yearly" },
      { name: "Super", price: 899, cycle: "Yearly" },
      { name: "Premium", price: 1499, cycle: "Yearly" },
    ]
  },
  {
    name: "Netflix India",
    icon_key: "netflix",
    color: "#E50914",
    category: "Entertainment",
    plans: [
      { name: "Mobile", price: 149, cycle: "Monthly" },
      { name: "Basic", price: 199, cycle: "Monthly" },
      { name: "Standard", price: 499, cycle: "Monthly" },
      { name: "Premium", price: 649, cycle: "Monthly" },
    ]
  },
  {
    name: "Prime Video",
    icon_key: "prime",
    color: "#00A8E1",
    category: "Entertainment",
    plans: [
      { name: "Mobile (6 Months)", price: 599, cycle: "Bi-Annual" },
      { name: "Classic", price: 299, cycle: "Monthly" },
    ]
  },
  {
    name: "Amazon Prime",
    icon_key: "prime",
    color: "#00A8E1",
    category: "Utility",
    plans: [
      { name: "Monthly", price: 299, cycle: "Monthly" },
      { name: "Quarterly", price: 599, cycle: "Quarterly" },
      { name: "Yearly", price: 1499, cycle: "Yearly" },
      { name: "Lite", price: 799, cycle: "Yearly" },
    ]
  },
  {
    name: "JioCinema Premium",
    icon_key: "jiocinema",
    color: "#D8046B",
    category: "Entertainment",
    plans: [
      { name: "Premium Monthly", price: 29, cycle: "Monthly" },
      { name: "Family", price: 89, cycle: "Monthly" },
    ]
  },
  {
    name: "SonyLIV",
    icon_key: "custom",
    color: "#F05628",
    category: "Entertainment",
    plans: [
      { name: "Mobile Only", price: 599, cycle: "Yearly" },
      { name: "Premium Monthly", price: 299, cycle: "Monthly" },
      { name: "Premium Yearly", price: 999, cycle: "Yearly" },
    ]
  },
  {
    name: "Zee5",
    icon_key: "custom",
    color: "#2C0846",
    category: "Entertainment",
    plans: [
      { name: "Premium HD", price: 699, cycle: "Yearly" },
      { name: "Premium 4K", price: 1499, cycle: "Yearly" },
    ]
  },
  {
    name: "YouTube Premium",
    icon_key: "youtube",
    color: "#FF0000",
    category: "Entertainment",
    plans: [
      { name: "Individual", price: 129, cycle: "Monthly" },
      { name: "Family", price: 189, cycle: "Monthly" },
      { name: "Student", price: 79, cycle: "Monthly" },
      { name: "Annual", price: 1290, cycle: "Yearly" },
    ]
  },
  {
    name: "Discovery+",
    icon_key: "custom",
    color: "#00558F",
    category: "Entertainment",
    plans: [
      { name: "Ad-Free", price: 399, cycle: "Yearly" },
    ]
  },
  {
    name: "Lionsgate Play",
    icon_key: "custom",
    color: "#000000",
    category: "Entertainment",
    plans: [
      { name: "Monthly", price: 149, cycle: "Monthly" },
      { name: "Yearly", price: 699, cycle: "Yearly" },
    ]
  },
  {
    name: "MUBI",
    icon_key: "custom",
    color: "#0F1626",
    category: "Entertainment",
    plans: [
      { name: "Monthly", price: 499, cycle: "Monthly" },
      { name: "Yearly", price: 3588, cycle: "Yearly" },
    ]
  },
  {
    name: "Hoichoi",
    icon_key: "custom",
    color: "#EE203F",
    category: "Entertainment",
    plans: [
      { name: "Plan 1", price: 899, cycle: "Yearly" },
    ]
  },
  {
    name: "Aha",
    icon_key: "custom",
    color: "#FF6D00",
    category: "Entertainment",
    plans: [
      { name: "Gold", price: 699, cycle: "Yearly" },
    ]
  },
  {
    name: "SunNXT",
    icon_key: "custom",
    color: "#F6921E",
    category: "Entertainment",
    plans: [
      { name: "Annual", price: 480, cycle: "Yearly" },
    ]
  },

  // --- MUSIC ---
  {
    name: "Spotify",
    icon_key: "spotify",
    color: "#1DB954",
    category: "Music",
    plans: [
      { name: "Individual", price: 119, cycle: "Monthly" },
      { name: "Duo", price: 149, cycle: "Monthly" },
      { name: "Family", price: 179, cycle: "Monthly" },
      { name: "Student", price: 59, cycle: "Monthly" },
    ]
  },
  {
    name: "Apple Music",
    icon_key: "apple",
    color: "#FA243C",
    category: "Music",
    plans: [
      { name: "Voice", price: 49, cycle: "Monthly" },
      { name: "Individual", price: 99, cycle: "Monthly" },
      { name: "Family", price: 149, cycle: "Monthly" },
    ]
  },
  {
    name: "JioSaavn",
    icon_key: "custom",
    color: "#2BC5B4",
    category: "Music",
    plans: [
      { name: "Pro Monthly", price: 99, cycle: "Monthly" },
      { name: "Pro Yearly", price: 749, cycle: "Yearly" },
    ]
  },
  {
    name: "Gaana",
    icon_key: "custom",
    color: "#E72C30",
    category: "Music",
    plans: [
      { name: "Plus Yearly", price: 299, cycle: "Yearly" },
    ]
  },
  {
    name: "Wynk Music",
    icon_key: "custom",
    color: "#ED1C24",
    category: "Music",
    plans: [
      { name: "Premium", price: 49, cycle: "Monthly" },
    ]
  },

  // --- FOOD & GROCERY ---
  {
    name: "Swiggy One",
    icon_key: "swiggy",
    color: "#FC8019",
    category: "Food",
    plans: [
      { name: "3 Months", price: 249, cycle: "Quarterly" },
      { name: "Lite", price: 99, cycle: "Quarterly" },
    ]
  },
  {
    name: "Zomato Gold",
    icon_key: "zomato",
    color: "#CB202D",
    category: "Food",
    plans: [
      { name: "3 Months", price: 99, cycle: "Quarterly" },
    ]
  },
  {
    name: "BigBasket bbstar",
    icon_key: "custom",
    color: "#84C225",
    category: "Food",
    plans: [
      { name: "6 Months", price: 299, cycle: "Quarterly" },
    ]
  },
  {
    name: "EazyDiner Prime",
    icon_key: "custom",
    color: "#FC642D",
    category: "Food",
    plans: [
      { name: "Yearly", price: 2495, cycle: "Yearly" },
    ]
  },

  // --- CLOUD & UTILITY ---
  {
    name: "Google One",
    icon_key: "custom",
    color: "#4285F4",
    category: "Utility",
    plans: [
      { name: "Basic (100GB)", price: 130, cycle: "Monthly" },
      { name: "Standard (200GB)", price: 210, cycle: "Monthly" },
      { name: "Premium (2TB)", price: 650, cycle: "Monthly" },
      { name: "Premium (2TB) Annual", price: 6500, cycle: "Yearly" },
      { name: "Basic Annual", price: 1300, cycle: "Yearly" },
    ]
  },
  {
    name: "ChatGPT",
    icon_key: "custom",
    color: "#10A37F",
    category: "Utility",
    plans: [
      { name: "Plus", price: 1650, cycle: "Monthly" },
      { name: "Team", price: 2500, cycle: "Monthly" },
      { name: "Plus Annual", price: 16500, cycle: "Yearly" },
    ]
  },
  {
    name: "Cursor",
    icon_key: "custom",
    color: "#111827",
    category: "Utility",
    plans: [
      { name: "Pro", price: 1650, cycle: "Monthly" },
      { name: "Pro Annual", price: 16500, cycle: "Yearly" },
    ]
  },
  {
    name: "Apple One",
    icon_key: "apple",
    color: "#000000",
    category: "Utility",
    plans: [
      { name: "Individual", price: 195, cycle: "Monthly" },
      { name: "Family", price: 365, cycle: "Monthly" },
    ]
  },
  {
    name: "iCloud+",
    icon_key: "custom",
    color: "#3897F0",
    category: "Utility",
    plans: [
      { name: "50GB", price: 75, cycle: "Monthly" },
      { name: "200GB", price: 219, cycle: "Monthly" },
      { name: "2TB", price: 749, cycle: "Monthly" },
    ]
  },
  {
    name: "Microsoft 365",
    icon_key: "custom",
    color: "#0078D4",
    category: "Utility",
    plans: [
      { name: "Personal", price: 489, cycle: "Monthly" },
      { name: "Family", price: 619, cycle: "Monthly" },
      { name: "Personal Annual", price: 4899, cycle: "Yearly" },
    ]
  },
  {
    name: "Canva Pro",
    icon_key: "custom",
    color: "#00C4CC",
    category: "Utility",
    plans: [
      { name: "Monthly", price: 499, cycle: "Monthly" },
      { name: "Yearly", price: 3999, cycle: "Yearly" },
    ]
  },
  {
    name: "Truecaller",
    icon_key: "custom",
    color: "#0087FF",
    category: "Utility",
    plans: [
      { name: "Premium Connect", price: 529, cycle: "Yearly" },
      { name: "Gold", price: 4999, cycle: "Yearly" },
    ]
  },

  // --- HEALTH ---
  {
    name: "Cult.fit",
    icon_key: "custom",
    color: "#FF3278",
    category: "Health",
    plans: [
      { name: "Elite (3 Months)", price: 7990, cycle: "Quarterly" },
      { name: "Pro (3 Months)", price: 4990, cycle: "Quarterly" },
    ]
  },
  {
    name: "HealthifyMe",
    icon_key: "custom",
    color: "#FA5252",
    category: "Health",
    plans: [
      { name: "Smart Plan", price: 1999, cycle: "Quarterly" },
    ]
  },
  {
    name: "Headspace",
    icon_key: "custom",
    color: "#F47D31",
    category: "Health",
    plans: [
      { name: "Monthly", price: 199, cycle: "Monthly" },
      { name: "Annual", price: 1499, cycle: "Yearly" },
    ]
  },
  {
    name: "Medibuddy Gold",
    icon_key: "custom",
    color: "#FFB800",
    category: "Health",
    plans: [
      { name: "Unlimited", price: 2499, cycle: "Yearly" },
    ]
  },

  // --- NEWS ---
  {
    name: "Times Prime",
    icon_key: "custom",
    color: "#000000",
    category: "Utility",
    plans: [
      { name: "Membership", price: 1199, cycle: "Yearly" },
    ]
  },
  {
    name: "The Ken",
    icon_key: "custom",
    color: "#ED2024",
    category: "News",
    plans: [
      { name: "India Annual", price: 2950, cycle: "Yearly" },
    ]
  },
  {
    name: "The Hindu",
    icon_key: "custom",
    color: "#2C2C2C",
    category: "News",
    plans: [
      { name: "Digital Annual", price: 1499, cycle: "Yearly" },
    ]
  },
  {
    name: "Audible",
    icon_key: "custom",
    color: "#F7991C",
    category: "News",
    plans: [
      { name: "Monthly", price: 199, cycle: "Monthly" },
    ]
  },
  {
    name: "Kindle Unlimited",
    icon_key: "custom",
    color: "#00A8E1",
    category: "News",
    plans: [
      { name: "Monthly", price: 169, cycle: "Monthly" },
    ]
  },

  // --- GAMING ---
  {
    name: "Xbox Game Pass",
    icon_key: "custom",
    color: "#107C10",
    category: "Gaming",
    plans: [
      { name: "PC", price: 349, cycle: "Monthly" },
      { name: "Console", price: 349, cycle: "Monthly" },
      { name: "Ultimate", price: 549, cycle: "Monthly" },
    ]
  },
  {
    name: "PlayStation Plus",
    icon_key: "custom",
    color: "#00439C",
    category: "Gaming",
    plans: [
      { name: "Essential", price: 499, cycle: "Monthly" },
      { name: "Extra", price: 749, cycle: "Monthly" },
      { name: "Deluxe", price: 849, cycle: "Monthly" },
    ]
  },
  
  // --- MOBILITY & OTHERS ---
  {
    name: "Uber One",
    icon_key: "custom",
    color: "#000000",
    category: "Utility",
    plans: [
      { name: "Monthly", price: 149, cycle: "Monthly" },
    ]
  },
  {
    name: "Paytm First",
    icon_key: "custom",
    color: "#00B9F5",
    category: "Utility",
    plans: [
      { name: "Annual", price: 799, cycle: "Yearly" },
    ]
  },
  {
    name: "Tinder",
    icon_key: "custom",
    color: "#FE3C72",
    category: "Other",
    plans: [
      { name: "Plus", price: 499, cycle: "Monthly" },
      { name: "Gold", price: 999, cycle: "Monthly" },
    ]
  },
  {
    name: "Bumble",
    icon_key: "custom",
    color: "#FFC629",
    category: "Other",
    plans: [
      { name: "Boost", price: 249, cycle: "Monthly" },
      { name: "Premium", price: 499, cycle: "Monthly" },
    ]
  },
];

// Legacy compatibility - keep old interface for existing code
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

export const SUBSCRIPTION_PRESETS: SubscriptionPreset[] = PRESET_SERVICES.map(service => ({
  name: service.name,
  plans: service.plans.map(plan => ({
    name: plan.name,
    cost: plan.price,
  })),
  color: service.color,
  iconKey: service.icon_key,
  category: service.category as 'Entertainment' | 'Utility' | 'Food' | 'Health',
})).filter(preset => 
  ['Entertainment', 'Utility', 'Food', 'Health'].includes(preset.category)
);

export function findPresetByName(name: string): PresetService | undefined {
  return PRESET_SERVICES.find(
    (preset) => preset.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function searchPresets(query: string): PresetService[] {
  const lowerQuery = query.toLowerCase();
  return PRESET_SERVICES.filter((preset) =>
    preset.name.toLowerCase().includes(lowerQuery)
  );
}
