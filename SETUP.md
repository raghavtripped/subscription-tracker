# Quick Setup Checklist

Follow these steps to get your Subscription Tracker up and running:

## ✅ Pre-Flight Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Git repository cloned

## ✅ Supabase Setup

1. [ ] Go to [database.new](https://database.new) and create a project
2. [ ] Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Project Settings > API
3. [ ] Go to SQL Editor and run the contents of `schema.sql`
4. [ ] Verify tables created: `profiles` and `subscriptions`
5. [ ] Go to Authentication > Providers and ensure "Email" is enabled

## ✅ Local Setup

1. [ ] Run `npm install` in the project directory
2. [ ] Create `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```
3. [ ] Run `npm run dev`
4. [ ] Open [http://localhost:3000](http://localhost:3000)
5. [ ] Sign up for a new account
6. [ ] Add your first subscription!

## 🧪 Testing the Features

### Test Preset Subscription
- [ ] Click "Add Subscription"
- [ ] Type "Netflix"
- [ ] Select "Netflix India" from dropdown
- [ ] Choose a plan (e.g., "Premium")
- [ ] Verify it appears on dashboard with ₹649

### Test Custom Subscription
- [ ] Click "Add Subscription"
- [ ] Type "Doodhwala" (or any custom name)
- [ ] Click "Create 'Doodhwala'"
- [ ] Enter cost: ₹500
- [ ] Select "Monthly" billing cycle
- [ ] Choose category: "Food"
- [ ] Verify it appears on dashboard

### Test Dashboard Features
- [ ] Verify "Monthly Spend" calculates correctly
- [ ] Verify "Yearly Projection" = Monthly Spend × 12
- [ ] Verify subscriptions sorted by renewal date
- [ ] Test delete functionality (× button)

## 🐛 Troubleshooting

**Issue**: "Failed to log in" or authentication errors
- ✅ Check `.env.local` has correct Supabase credentials
- ✅ Verify Email provider is enabled in Supabase

**Issue**: "relation does not exist" database errors
- ✅ Make sure you ran `schema.sql` in Supabase SQL Editor
- ✅ Check that tables `profiles` and `subscriptions` exist

**Issue**: Can't see subscriptions after adding
- ✅ Check browser console for errors
- ✅ Verify RLS policies are active in Supabase
- ✅ Check that you're logged in with the correct account

## 🚀 Next Steps

Once everything is working:
- Customize subscription presets in `lib/presets.ts`
- Add more categories or features
- Deploy to Vercel/Netlify for production use

