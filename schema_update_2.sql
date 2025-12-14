-- Migration: Upcoming renewals view + expanded categories (if not already applied)
-- Run this in Supabase SQL Editor if you already have data in production.

-- 1) Ensure categories constraint includes new categories
ALTER TABLE subscriptions 
  DROP CONSTRAINT IF EXISTS subscriptions_category_check;

ALTER TABLE subscriptions 
  ADD CONSTRAINT subscriptions_category_check 
  CHECK (category IN ('Entertainment', 'Utility', 'Food', 'Health', 'Music', 'Gaming', 'News', 'Other'));

-- 2) Create a view for upcoming renewals (next 90 days)
--    This view calculates the next renewal date based on billing_cycle.
--    It limits results to renewals that are due in the next 90 days.
DROP VIEW IF EXISTS upcoming_renewals;

CREATE VIEW upcoming_renewals AS
WITH monthly AS (
  SELECT
    s.*,
    (s.start_date + (n || ' month')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 60) AS n
  WHERE s.billing_cycle = 'Monthly'
),
quarterly AS (
  SELECT
    s.*,
    (s.start_date + (n * 3 || ' month')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 20) AS n
  WHERE s.billing_cycle = 'Quarterly'
),
yearly AS (
  SELECT
    s.*,
    (s.start_date + (n || ' year')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 10) AS n
  WHERE s.billing_cycle = 'Yearly'
),
once_cycle AS (
  SELECT
    s.*,
    s.start_date AS renewal_date
  FROM subscriptions s
  WHERE s.billing_cycle = 'Once'
),
all_cycles AS (
  SELECT * FROM monthly
  UNION ALL
  SELECT * FROM quarterly
  UNION ALL
  SELECT * FROM yearly
  UNION ALL
  SELECT * FROM once_cycle
),
next_renewal AS (
  SELECT
    ac.*,
    ac.renewal_date,
    (ac.renewal_date - CURRENT_DATE) AS days_until
  FROM all_cycles ac
  WHERE ac.renewal_date >= CURRENT_DATE
)
SELECT *
FROM next_renewal
WHERE days_until <= 90
ORDER BY renewal_date ASC;


