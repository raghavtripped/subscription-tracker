-- Migration script to update categories
-- Run this in Supabase SQL Editor if you already have the tables

-- Update the category constraint to include new categories
ALTER TABLE subscriptions 
  DROP CONSTRAINT IF EXISTS subscriptions_category_check;

ALTER TABLE subscriptions 
  ADD CONSTRAINT subscriptions_category_check 
  CHECK (category IN ('Entertainment', 'Utility', 'Food', 'Health', 'Music', 'Gaming', 'News', 'Other'));

