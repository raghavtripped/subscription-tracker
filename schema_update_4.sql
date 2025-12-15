-- Migration: Limit upcoming renewals window to 31 days
-- Run this in Supabase SQL Editor after schema_update_3.sql

-- Recreate upcoming_renewals view to cap days_until at 31
DROP VIEW IF EXISTS upcoming_renewals;

CREATE VIEW upcoming_renewals AS
WITH monthly AS (
  SELECT
    s.id,
    s.user_id,
    s.name,
    s.cost,
    s.billing_cycle,
    s.start_date,
    s.category,
    s.icon_key,
    s.color,
    s.payment_method,
    s.active,
    s.created_at,
    s.updated_at,
    (s.start_date + (n || ' month')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 60) AS n
  WHERE s.billing_cycle = 'Monthly'
),
quarterly AS (
  SELECT
    s.id,
    s.user_id,
    s.name,
    s.cost,
    s.billing_cycle,
    s.start_date,
    s.category,
    s.icon_key,
    s.color,
    s.payment_method,
    s.active,
    s.created_at,
    s.updated_at,
    (s.start_date + (n * 3 || ' month')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 20) AS n
  WHERE s.billing_cycle = 'Quarterly'
),
bi_annual AS (
  SELECT
    s.id,
    s.user_id,
    s.name,
    s.cost,
    s.billing_cycle,
    s.start_date,
    s.category,
    s.icon_key,
    s.color,
    s.payment_method,
    s.active,
    s.created_at,
    s.updated_at,
    (s.start_date + (n * 6 || ' month')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 20) AS n
  WHERE s.billing_cycle = 'Bi-Annual'
),
yearly AS (
  SELECT
    s.id,
    s.user_id,
    s.name,
    s.cost,
    s.billing_cycle,
    s.start_date,
    s.category,
    s.icon_key,
    s.color,
    s.payment_method,
    s.active,
    s.created_at,
    s.updated_at,
    (s.start_date + (n || ' year')::interval)::date AS renewal_date
  FROM subscriptions s
  CROSS JOIN generate_series(0, 10) AS n
  WHERE s.billing_cycle = 'Yearly'
),
once_cycle AS (
  SELECT
    s.id,
    s.user_id,
    s.name,
    s.cost,
    s.billing_cycle,
    s.start_date,
    s.category,
    s.icon_key,
    s.color,
    s.payment_method,
    s.active,
    s.created_at,
    s.updated_at,
    s.start_date AS renewal_date
  FROM subscriptions s
  WHERE s.billing_cycle = 'Once'
),
all_cycles AS (
  SELECT * FROM monthly
  UNION ALL
  SELECT * FROM quarterly
  UNION ALL
  SELECT * FROM bi_annual
  UNION ALL
  SELECT * FROM yearly
  UNION ALL
  SELECT * FROM once_cycle
),
next_renewal AS (
  SELECT
    ac.*,
    (ac.renewal_date - CURRENT_DATE) AS days_until
  FROM all_cycles ac
  WHERE ac.renewal_date >= CURRENT_DATE
)
SELECT *
FROM next_renewal
WHERE days_until <= 31
ORDER BY renewal_date ASC;

