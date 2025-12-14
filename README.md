# Subscription Tracker - India Edition 🇮🇳

A modern, beautiful PWA for tracking and managing your subscriptions, built specifically for the Indian market with stunning UI and full-featured functionality. Now includes 50+ Indian services, full edit capability, and an upcoming renewals view.

![Subscription Tracker](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

- 🎯 **Smart Quick Add**: Search and add 50+ Indian subscriptions with one click
- ✏️ **Edit Everything**: Edit name, cost, billing cycle, start date, category, payment method
- 📅 **Upcoming Renewals**: Tab showing renewals in the next 90 days + total due
- 📊 **Beautiful Dashboard**: Monthly spend and yearly projections with gradient cards
- 🔔 **Renewal Tracking**: Color-coded renewal status (overdue, soon, normal)
- 💰 **Indian Currency**: All prices in ₹ (INR) with proper formatting
- 🔒 **Secure**: Supabase Auth + RLS
- 📱 **PWA Ready**: Installable on mobile
- 🎨 **Modern UI**: Gradients, animations, and responsive design
- 💳 **Payment Tracking**: Track which UPI or card is linked
- 🌏 **India Timezone**: All dates handled in Asia/Kolkata timezone
- ⚡ **Real-time Updates**: React Query for live refresh

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
- Supabase account (free tier works)
- npm or yarn
- Git

## 🛠️ Setup Instructions

### Step 1: Clone and Install

```bash
git clone https://github.com/raghavtripped/subscription-tracker.git
cd subscription-tracker
npm install
```

### Step 2: Set Up Supabase Backend

1) Create a Supabase Project  
   - Go to [database.new](https://database.new)  
   - Create a project (name + password + closest region)

2) Get Your API Keys  
   - Supabase Dashboard → Settings (⚙️) → API  
   - Copy **Project URL** and **anon public key**

3) Run the Database Schema  
   - Supabase Dashboard → SQL Editor → New Query  
   - Copy `schema.sql` (fresh installs) OR run `schema_update.sql` + `schema_update_2.sql` if upgrading  
   - Run the SQL (Cmd/Ctrl + Enter) → should say “Success”

   Creates:  
   - `profiles` table  
   - `subscriptions` table  
   - RLS policies  
   - Profile auto-create trigger  
   - `payment_method` field  
   - `upcoming_renewals` view (from `schema_update_2.sql`)

4) Enable Email Auth  
   - Authentication → Providers → Email = ON  
   - Site URL: `http://localhost:3000` (dev)  
   - Redirect URLs: `http://localhost:3000/**`

### Step 3: Configure Environment Variables

Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Run the Dev Server
```bash
npm run dev
```
Open http://localhost:3000

### Step 5: Create Your First Account
- Go to `/signup`
- Create an account, confirm email
- You’ll land on the dashboard

## 📖 Usage Guide

### Adding Subscriptions

**Preset Services (50+):**
1) Click **Add Subscription**  
2) Type the service (e.g., Netflix)  
3) Pick a plan (shows price + cycle)  
4) Set **Start Date** (when it started/will start)  
5) Optional: Payment method (UPI/card)  
6) Add

**Custom Services:**
1) Click **Add Subscription**  
2) Type a name not in presets (e.g., “Doodhwala”) → “Create ...”  
3) Fill: cost, billing cycle, **start date**, category (Entertainment, Utility, Food, Health, Music, Gaming, News, Other), payment method  
4) Add

### Editing Subscriptions
- Click the pencil (✏️) on a card
- Edit any field: name, cost, billing cycle, start date, category, payment method
- Save changes → dashboard updates instantly

### Upcoming Renewals (New)
- Switch to **Upcoming Renewals** tab
- Shows renewals in next 90 days
- Displays renewal date, days until, amount due
- Shows **Total Amount Due** across all upcoming renewals

### Viewing Subscriptions
- Sorted by renewal date (soonest first)
- Each card shows: name, icon, cost (₹), renewal status color, category badge, billing cycle, payment method, start date

### Monthly Spend Calculation
- Monthly: full cost
- Quarterly: cost ÷ 3
- Yearly: cost ÷ 12
- Once: excluded from monthly spend

## 🎨 UI Features
- Gradients on auth pages and dashboard
- Gradient summary cards (monthly, yearly)
- Color-coded renewal status (red overdue, yellow soon, green normal)
- Smooth hover/animation effects
- Fully responsive

## 📁 Project Structure

```
subscription-tracker/
├── public/                # PWA assets
│   ├── manifest.json
│   └── icons/
├── app/                   # Next.js App Router
│   ├── login/ signup/ layout.tsx page.tsx providers.tsx globals.css
├── components/
│   ├── Dashboard.tsx             # Tabs + upcoming renewals
│   ├── SubscriptionCard.tsx      # Cards with edit/delete
│   ├── AddSubscriptionModal.tsx  # Add (preset/custom) + start date
│   ├── EditSubscriptionModal.tsx # Edit all fields
│   └── SubscriptionIcon.tsx
├── lib/
│   ├── presets.ts        # 50+ services, 8 categories
│   └── utils.ts          # Timezone-aware helpers
├── utils/supabase/       # Client, server, middleware
├── types/database.ts     # Types with expanded categories
├── middleware.ts         # Auth persistence
├── schema.sql            # Full schema (fresh)
├── schema_update.sql     # Migration: new categories
├── schema_update_2.sql   # Migration: upcoming renewals view + categories
└── package.json
```

## 🗄️ Database Schema

### `profiles`
- Links to `auth.users`, auto-created on signup

### `subscriptions`
- Fields: `name`, `cost`, `billing_cycle (Monthly|Quarterly|Yearly|Once)`, `start_date`, `category (8)`, `icon_key`, `color`, `payment_method`, `active`, timestamps
- RLS ensures users only see their own data

### `upcoming_renewals` view (schema_update_2.sql)
- Shows renewals due in next 90 days
- Includes `days_until` and `renewal_date`

## 🇮🇳 Indian Market Presets
- **50+ services** across 8 categories: OTT, Music, Food, Utility, Health, News, Gaming, Other  
- See `lib/presets.ts` for the full list

## 🔧 Critical Features & Fixes
- ✅ Auth persistence via root middleware
- ✅ PWA manifest + metadata
- ✅ Timezone handling (Asia/Kolkata) with `date-fns-tz`
- ✅ Payment method tracking
- ✅ Upcoming renewals view/tab
- ✅ Edit modal for all fields

## 🚀 Development
```bash
npm run dev      # start dev server
npm run build    # production build
npm start        # start production
npm run lint     # lint
```

## 🔒 Security
- RLS on all tables
- Supabase Auth
- Environment variables for secrets
- Secure cookie handling

## 🐛 Troubleshooting
- Login issues: check Site URL/Redirects in Supabase (`http://localhost:3000`), clear cookies, check console
- DB issues: run `schema.sql` (fresh) or `schema_update.sql` + `schema_update_2.sql` (upgrade)
- Date issues: all dates handled in India timezone

## 📝 Recent Updates
- Added 50+ services across 8 categories
- Added Edit Subscription modal (edit all fields)
- Added Upcoming Renewals tab (next 90 days + total due)
- Added start date inputs for preset and custom adds
- Added new categories to schema + migration scripts
- UI improvements across all pages/components
- Added `schema_update_2.sql` for renewals view and categories

## 🤝 Contributing
PRs welcome!

## 📄 License
MIT

## 🙏 Acknowledgments
- Next.js, Supabase, Lucide React, Tailwind CSS

## 📞 Support
- See troubleshooting
- Check `DEBUG_LOGIN.md` and `SUPABASE_AUTH_CHECK.md`
- Open an issue on GitHub

---

**Made with ❤️ for the Indian market**
