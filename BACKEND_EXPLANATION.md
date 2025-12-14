# 🔧 Backend Explanation

## Where is the Backend?

**The backend is Supabase** - it's a **cloud-hosted database** (like Firebase, but for PostgreSQL).

### You DON'T need to:
- ❌ Write backend code
- ❌ Set up a server
- ❌ Deploy anything
- ❌ Manage databases

### You DO need to:
- ✅ Create a **free Supabase account**
- ✅ Create a **project** (takes 2 minutes)
- ✅ Run the **SQL schema** (copy-paste from `schema.sql`)
- ✅ Get your **API keys** (URL + anon key)
- ✅ Put keys in `.env.local` file

## Step-by-Step Backend Setup

### Step 1: Create Supabase Project
1. Go to **https://database.new**
2. Sign up/login (free account)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `subscription-tracker` (or anything)
   - **Database Password**: Create a password (save it!)
   - **Region**: Choose closest to India
5. Click **"Create new project"** (wait 1-2 minutes)

### Step 2: Get API Keys
1. In Supabase Dashboard, click **Settings** (⚙️ icon)
2. Click **API** (in left sidebar)
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co` ← Copy this
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ← Copy this

### Step 3: Run Database Schema
1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Open `schema.sql` file from this project
4. **Copy ALL the SQL code** (it's about 100+ lines)
5. **Paste** into Supabase SQL Editor
6. Click **"Run"** button (or press Cmd/Ctrl + Enter)
7. You should see: ✅ "Success. No rows returned"

This creates:
- `profiles` table (user info)
- `subscriptions` table (your subscriptions)
- Security rules (RLS policies)

### Step 4: Enable Email Authentication
1. In Supabase Dashboard, click **Authentication** (left sidebar)
2. Click **Providers**
3. Make sure **Email** toggle is **ON** (green)

### Step 5: Create `.env.local` File
In your project root, create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace with YOUR actual values from Step 2.

## That's It! 🎉

Once you have:
- ✅ Supabase project created
- ✅ SQL schema run
- ✅ `.env.local` file with keys

Your backend is ready! The frontend will connect to it automatically.

## Testing Without Backend

You can still test the frontend UI (it will show errors when trying to login, but you can see the design):

```bash
npm run dev
```

Then open http://localhost:3000

But to actually **use** the app, you need the Supabase backend set up first.

