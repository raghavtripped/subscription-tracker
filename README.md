# Subscription Tracker - India Edition 🇮🇳

A modern, beautiful PWA for tracking and managing your subscriptions, built specifically for the Indian market with stunning UI and full-featured functionality.

![Subscription Tracker](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

- 🎯 **Smart Quick Add**: Search and add popular Indian subscriptions (Netflix, Hotstar, Prime, etc.) with one click
- 📊 **Beautiful Dashboard**: View monthly spend and yearly projections with stunning gradient cards
- 🔔 **Renewal Tracking**: See when each subscription renews with smart sorting and color-coded alerts
- 💰 **Indian Currency**: All prices displayed in ₹ (INR) with proper formatting
- 🔒 **Secure**: Built with Supabase Auth and Row Level Security (RLS)
- 📱 **PWA Ready**: Progressive Web App support for mobile installation
- 🎨 **Modern UI**: Beautiful gradients, smooth animations, and responsive design
- 💳 **Payment Tracking**: Track which UPI ID or card is linked to each subscription
- 🌏 **India Timezone**: All dates handled in Asia/Kolkata timezone to prevent date drift
- ⚡ **Real-time Updates**: Instant UI updates with React Query

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: Tailwind CSS with custom gradients and animations
- **Icons**: Lucide React
- **Backend/DB**: Supabase (PostgreSQL) + Supabase Auth
- **State Management**: React Query (Tanstack Query)
- **Date Handling**: date-fns with date-fns-tz for India timezone
- **Styling**: Modern gradients, shadows, and responsive design

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works perfectly)
- npm or yarn package manager
- Git (for version control)

## 🛠️ Setup Instructions

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/raghavtripped/subscription-tracker.git
cd subscription-tracker

# Install dependencies
npm install
```

### Step 2: Set Up Supabase Backend

1. **Create a Supabase Project**:
   - Go to [database.new](https://database.new)
   - Sign up/login (free account)
   - Click "New Project"
   - Fill in:
     - **Name**: `subscription-tracker` (or any name)
     - **Database Password**: Create a strong password (save it!)
     - **Region**: Choose closest to India
   - Click "Create new project" (takes 1-2 minutes)

2. **Get Your API Keys**:
   - In Supabase Dashboard, go to **Settings** (⚙️) → **API**
   - Copy these two values:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Run the Database Schema**:
   - In Supabase Dashboard, go to **SQL Editor**
   - Click **"New Query"**
   - Open `schema.sql` from this repository
   - Copy ALL the SQL code
   - Paste into Supabase SQL Editor
   - Click **"Run"** (or press Cmd/Ctrl + Enter)
   - You should see: ✅ "Success. No rows returned"

   This creates:
   - `profiles` table (user information)
   - `subscriptions` table (subscription data)
   - Row Level Security (RLS) policies
   - Automatic profile creation on signup
   - `payment_method` field for tracking UPI/cards

4. **Enable Email Authentication**:
   - Go to **Authentication** → **Providers**
   - Make sure **Email** toggle is **ON** (green)
   - Configure **Site URL**: `http://localhost:3000` (for development)
   - Add **Redirect URLs**: `http://localhost:3000/**`

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with YOUR actual values from Step 2.

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Create Your First Account

- Navigate to `/signup` or click "Sign up" on the login page
- Create an account with your email and password
- Check your email and confirm your account
- You'll be automatically redirected to the dashboard

## 📖 Usage Guide

### Adding Subscriptions

#### For Preset Services (Netflix, Hotstar, etc.):
1. Click the **"Add Subscription"** button on the dashboard
2. Start typing the service name (e.g., "Netflix")
3. Select from the dropdown suggestions
4. Choose a plan (Mobile, Basic, Premium, etc.)
5. Optionally add payment method (e.g., "Paytm UPI")
6. Click **"Add Subscription"**

#### For Custom Services:
1. Click **"Add Subscription"**
2. Type a name that doesn't match any preset (e.g., "Doodhwala")
3. Click **"Create '[Your Service Name]'"**
4. Fill in:
   - Cost in ₹
   - Billing cycle (Monthly, Quarterly, Yearly, Once)
   - Category (Entertainment, Utility, Food, Health)
   - Payment method (optional)
5. Click **"Add Subscription"**

### Viewing Subscriptions

- Subscriptions are **automatically sorted** by renewal date (soonest first)
- Each card shows:
  - Service name and icon with brand colors
  - Days until renewal (color-coded: red for overdue, yellow for soon, green for normal)
  - Cost in ₹ with proper formatting
  - Category and billing cycle badges
  - Payment method (if added)
  - Start date

### Monthly Spend Calculation

- **Monthly subscriptions**: Full cost
- **Quarterly subscriptions**: Cost ÷ 3
- **Yearly subscriptions**: Cost ÷ 12
- **One-time payments**: Not included in monthly spend

### Payment Method Tracking

Track which payment method is linked to each subscription:
- UPI IDs (e.g., "Paytm UPI: user@paytm")
- Credit/Debit Cards (e.g., "HDFC Credit Card ending 1234")
- Other methods (e.g., "PhonePe", "Google Pay")

## 🎨 UI Features

### Modern Design
- **Gradient backgrounds** on login/signup pages
- **Gradient summary cards** on dashboard (blue and purple)
- **Color-coded renewal status** on subscription cards
- **Smooth animations** and hover effects
- **Responsive design** for mobile and desktop

### Visual Indicators
- **Red**: Overdue subscriptions
- **Yellow**: Renewing in 1-3 days
- **Green**: Renewing in 4+ days
- **Gradient cards**: Monthly spend and yearly projection

## 📁 Project Structure

```
subscription-tracker/
├── public/                # Static assets (PWA)
│   ├── manifest.json      # PWA manifest
│   └── icons/             # App icons (192x192, 512x512)
├── app/                   # Next.js App Router pages
│   ├── login/             # Login page (beautiful gradient UI)
│   ├── signup/            # Signup page (beautiful gradient UI)
│   ├── layout.tsx         # Root layout (with PWA metadata)
│   ├── page.tsx           # Dashboard (home)
│   ├── providers.tsx       # React Query provider
│   └── globals.css        # Global styles with custom scrollbar
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard with gradient cards
│   ├── SubscriptionCard.tsx  # Beautiful subscription cards
│   ├── AddSubscriptionModal.tsx  # Smart modal with autocomplete
│   └── SubscriptionIcon.tsx  # Icon component
├── lib/                   # Utilities and presets
│   ├── presets.ts        # Indian subscription presets (10 services)
│   └── utils.ts          # Helper functions (timezone-aware)
├── utils/                 # Supabase utilities
│   └── supabase/         # Client, server, middleware
├── types/                 # TypeScript types
│   └── database.ts       # Database types
├── middleware.ts          # Root-level middleware (auth persistence)
├── schema.sql            # Supabase database schema
└── package.json
```

## 🗄️ Database Schema

The application uses two main tables:

### `profiles` Table
- User profile information (linked to `auth.users`)
- Automatically created on signup via trigger

### `subscriptions` Table
- Subscription data with RLS policies
- Fields:
  - `name`: Subscription name
  - `cost`: Cost in INR (numeric)
  - `billing_cycle`: Monthly, Quarterly, Yearly, or Once
  - `start_date`: Start date (DATE type)
  - `category`: Entertainment, Utility, Food, or Health
  - `icon_key`: Icon identifier
  - `color`: Hex color code for card
  - `payment_method`: Optional UPI/card tracking
  - `active`: Boolean flag

See `schema.sql` for the complete schema with RLS policies.

## 🇮🇳 Indian Market Presets

The app comes pre-loaded with 10 popular Indian subscription services:

| Service | Plans | Category |
|---------|-------|----------|
| **Disney+ Hotstar** | ₹149 (Mobile), ₹899 (Super), ₹1499 (Premium) | Entertainment |
| **Netflix India** | ₹149 (Mobile), ₹199 (Basic), ₹649 (Premium) | Entertainment |
| **Amazon Prime** | ₹299 (Monthly), ₹1499 (Yearly) | Entertainment |
| **Zomato Gold** | ₹99 (3 Months) | Food |
| **Swiggy One** | ₹249 (3 Months) | Food |
| **YouTube Premium** | ₹129 (Month) | Entertainment |
| **Spotify** | ₹119 (Month) | Entertainment |
| **JioCinema Premium** | ₹29 (Month) | Entertainment |
| **Apple One** | ₹195 (Month) | Utility |
| **Blinkit** | ₹99 (Month) | Food |

## 🔧 Critical Features & Fixes

This project includes several production-ready fixes:

### ✅ 1. Auth Persistence
- Root-level middleware ensures users stay logged in after page refreshes
- Proper cookie handling with Supabase SSR

### ✅ 2. PWA Support
- Complete manifest and metadata for mobile app installation
- App icons support (add 192x192 and 512x512 PNG files)

### ✅ 3. Timezone Handling
- All dates use India timezone (UTC+5:30) to prevent date drift
- Uses `date-fns-tz` for accurate date parsing and formatting
- Dates stored as `DATE` type in PostgreSQL (YYYY-MM-DD)

### ✅ 4. Payment Method Tracking
- Optional field to track which UPI/card is linked to each subscription
- Helps users remember payment methods for renewals

### ✅ 5. Beautiful UI
- Modern gradient designs
- Color-coded renewal status
- Smooth animations and hover effects
- Responsive mobile-first design
- High contrast for better visibility

## 🚀 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔒 Security

- All database queries use Row Level Security (RLS)
- Users can only access their own subscriptions
- Authentication handled by Supabase Auth
- Environment variables for sensitive keys
- Secure cookie handling

## 📱 PWA Setup

To make the app installable:

1. Generate app icons:
   - 192x192 PNG
   - 512x512 PNG
2. Place them in `public/icons/`:
   - `icon-192x192.png`
   - `icon-512x512.png`
3. The app will be installable on mobile devices!

## 🐛 Troubleshooting

### Login Issues
- **Check Supabase Site URL**: Should be `http://localhost:3000` for development
- **Check Redirect URLs**: Should include `http://localhost:3000/**`
- **Clear browser cookies** and try again
- **Check browser console** (F12) for errors

### Database Issues
- **"relation does not exist"**: Make sure you ran `schema.sql` in Supabase SQL Editor
- **RLS errors**: Verify RLS policies are enabled in Supabase Dashboard

### Date Issues
- All dates are handled in India timezone automatically
- If dates seem wrong, check server timezone settings

## 📝 Recent Updates

### UI Improvements (Latest)
- ✨ Beautiful gradient backgrounds on auth pages
- 🎨 Enhanced dashboard with gradient summary cards
- 💳 Improved subscription cards with color-coded renewal status
- 🔍 Better modal with autocomplete and visual feedback
- 📱 Fully responsive design for all screen sizes
- 🎯 High contrast for better visibility
- ⚡ Smooth animations and hover effects

### Technical Improvements
- ✅ Fixed timezone handling for India (UTC+5:30)
- ✅ Added payment method tracking
- ✅ Improved error handling and logging
- ✅ Enhanced PWA support
- ✅ Better authentication flow

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the `DEBUG_LOGIN.md` and `SUPABASE_AUTH_CHECK.md` files
3. Open an issue on GitHub

---

**Made with ❤️ for the Indian market**
