# Subscription Tracker - India Edition 🇮🇳

A modern, beautiful PWA for tracking and managing your subscriptions, built specifically for the Indian market with stunning UI and full-featured functionality. Now includes 50+ Indian services, full edit capability, and an upcoming renewals view.

![Subscription Tracker](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

- 🎯 **Smart Quick Add**: Search and add 50+ Indian subscriptions with one click
- ✏️ **Edit Everything**: Edit name, cost, billing cycle, start date, category, payment method
- 📅 **Upcoming Renewals**: Tab showing renewals in the next 31 days + total due
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
   - **Fresh Install**: Supabase Dashboard → SQL Editor → Copy & run `schema.sql`  
   - **Upgrading Existing**: Run in order:
     1. `schema_update.sql` (adds new categories)
     2. `schema_update_2.sql` (adds `upcoming_renewals` view + ensures categories)
     3. `schema_update_3.sql` (adds Bi-Annual billing cycle + refreshes view)
     4. `schema_update_4.sql` (limits upcoming_renewals to next 31 days)
   - Run SQL (Cmd/Ctrl + Enter) → should say "Success"

   Creates:  
   - `profiles` table (user profiles)  
   - `subscriptions` table (subscription data)  
   - RLS policies (security)  
   - Profile auto-create trigger  
   - `payment_method` field (UPI/card tracking)  
   - `upcoming_renewals` view (renewals in next 90 days)

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
4) Adjust **Amount** if your price differs (discounts, regional pricing)  
5) Set **Start Date** (when it started/will start)  
6) Optional: Payment method (UPI/card)  
7) Add

**Custom Services:**
1) Click **Add Subscription**  
2) Type a name not in presets (e.g., “Doodhwala”) → “Create ...”  
3) Fill: cost, billing cycle (Monthly, Quarterly, Bi-Annual, Yearly, Once), **start date**, category (Entertainment, Utility, Food, Health, Music, Gaming, News, Other), payment method  
4) Add

### Editing Subscriptions
- Click the pencil (✏️) on a card
- Edit any field: name, cost, billing cycle, start date, category, payment method
- Save changes → dashboard updates instantly

### Upcoming Renewals (New)
- Switch to **Upcoming Renewals** tab
- Shows renewals in next 31 days
- Displays renewal date, days until, amount due
- Shows **Total Amount Due** across all upcoming renewals

### Viewing Subscriptions
- Sorted by renewal date (soonest first)
- Each card shows: name, icon, cost (₹), renewal status color, category badge, billing cycle, payment method, start date

### Monthly Spend Calculation
- Monthly: full cost
- Quarterly: cost ÷ 3
- Bi-Annual: cost ÷ 6
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
- Fields: `name`, `cost`, `billing_cycle (Monthly|Quarterly|Bi-Annual|Yearly|Once)`, `start_date`, `category (8)`, `icon_key`, `color`, `payment_method`, `active`, timestamps
- RLS ensures users only see their own data

### `upcoming_renewals` view (schema_update_2.sql / schema_update_3.sql)
- Database view showing renewals due in next 31 days
- Calculates renewal dates based on `start_date` and `billing_cycle`
- Includes computed fields:
  - `renewal_date`: Next renewal date
  - `days_until`: Days until renewal (0-90)
- Automatically filters active subscriptions
- Can be queried directly: `SELECT * FROM upcoming_renewals WHERE user_id = '...'`
- Note: Frontend currently calculates renewals client-side; view available for future use

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

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy - build should succeed (login/signup pages are server-rendered)

### Other Platforms
- Ensure environment variables are set
- Build command: `npm run build`
- Start command: `npm start`

## 🔒 Security
- RLS on all tables
- Supabase Auth
- Environment variables for secrets
- Secure cookie handling

## 🐛 Troubleshooting

### General Issues
- **Login issues**: check Site URL/Redirects in Supabase (`http://localhost:3000`), clear cookies, check console
- **DB issues**: run `schema.sql` (fresh) or `schema_update.sql` + `schema_update_2.sql` (upgrade)
- **Date issues**: all dates handled in India timezone

### Vercel Deployment Issues
- **"Supabase URL and API key required" error**: This is normal - login/signup pages are server-rendered to prevent build-time env var issues
- **Build fails with date-fns-tz errors**: Fixed in v2.1 - `zonedTimeToUtc` import was removed
- **TypeScript errors in middleware**: Fixed in v2.1 - added proper type annotations for cookies
- **Pages not loading**: Ensure environment variables are set in Vercel dashboard (Settings > Environment Variables)

## 📝 Recent Updates

### Latest (v2.1) - Vercel Deployment Fixes
- ✅ **Vercel Deployment**: Fixed build errors and deployment issues
- ✅ **Dynamic Pages**: Login/signup pages now server-rendered to avoid build-time Supabase client issues
- ✅ **Import Fixes**: Removed problematic `zonedTimeToUtc` import from `date-fns-tz`
- ✅ **TypeScript Fixes**: Added proper type annotations for Supabase middleware cookies

### v2.0 - Major Feature Update
- ✅ **50+ Indian Services**: Expanded from 10 to 50+ across 8 categories
- ✅ **Edit Functionality**: Edit all subscription fields (name, cost, cycle, date, category, payment)
- ✅ **Upcoming Renewals Tab**: View renewals in next 31 days with total amount due
- ✅ **Start Date Input**: Set accurate start dates for precise renewal calculations
- ✅ **Database View**: `upcoming_renewals` view for future query optimization
- ✅ **Enhanced Categories**: Added Music, Gaming, News, Other (8 total categories)
- ✅ **UI Improvements**: Better visibility, gradients, animations across all pages

### Previous
- Auth persistence via middleware
- PWA support (manifest + metadata)
- India timezone handling (Asia/Kolkata)
- Payment method tracking
- Beautiful gradient UI

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
