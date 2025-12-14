# 🚀 Quick Start Guide

## Backend Setup (Supabase - Cloud Database)

**The backend is Supabase** - it's a cloud-hosted PostgreSQL database. You need to:

1. **Create a Supabase Project** (FREE):
   - Go to https://database.new
   - Sign up/login with GitHub/Email
   - Click "New Project"
   - Fill in:
     - Name: "subscription-tracker" (or any name)
     - Database Password: (create a strong password, save it!)
     - Region: Choose closest to you
   - Click "Create new project" (takes 1-2 minutes)

2. **Get Your API Keys**:
   - Once project is ready, go to **Settings** (gear icon) → **API**
   - Copy these two values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public key** (long string starting with `eyJ...`)

3. **Set Up Database Tables**:
   - In Supabase Dashboard, click **SQL Editor** (left sidebar)
   - Click **New Query**
   - Open `schema.sql` from this project
   - Copy ALL the SQL code
   - Paste into Supabase SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)
   - You should see "Success. No rows returned"

4. **Enable Email Auth**:
   - Go to **Authentication** → **Providers** (left sidebar)
   - Make sure **Email** is enabled (toggle should be ON)

## Frontend Setup (Local - Your Computer)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Create Environment File**:
   - Create `.env.local` in the project root
   - Add your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   - Go to http://localhost:3000
   - You should see the login page!

## Testing Checklist

- [ ] Supabase project created
- [ ] Database schema run successfully
- [ ] Email auth enabled
- [ ] `.env.local` file created with keys
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opens to http://localhost:3000
- [ ] Can sign up for new account
- [ ] Can log in
- [ ] Can add subscriptions

