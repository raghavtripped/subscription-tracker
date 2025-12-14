import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatInTimeZone, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

// India timezone constant
const INDIA_TIMEZONE = 'Asia/Kolkata';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Parse a date string (YYYY-MM-DD) as a date in India timezone
 * This ensures dates are interpreted correctly regardless of server timezone
 */
export function parseIndiaDate(dateString: string): Date {
  // Parse the date string as if it's in India timezone
  // dateString is in format YYYY-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  // Create date string in ISO format for India timezone
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
  return zonedTimeToUtc(dateStr, INDIA_TIMEZONE);
}

/**
 * Format a date to display in India timezone
 */
export function formatIndiaDate(date: Date | string, formatStr: string = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseIndiaDate(date) : date;
  return formatInTimeZone(dateObj, INDIA_TIMEZONE, formatStr);
}

/**
 * Get today's date in India timezone as YYYY-MM-DD string
 */
export function getTodayIndiaDateString(): string {
  const now = new Date();
  return formatInTimeZone(now, INDIA_TIMEZONE, 'yyyy-MM-dd');
}

export function getNextRenewalDate(
  startDate: string,
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
): Date {
  // Parse start date in India timezone to avoid timezone shifts
  const start = parseIndiaDate(startDate);
  const next = new Date(start);

  switch (billingCycle) {
    case 'Monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    case 'Quarterly':
      next.setMonth(next.getMonth() + 3);
      break;
    case 'Yearly':
      next.setFullYear(next.getFullYear() + 1);
      break;
    case 'Once':
      return start; // For one-time payments, return start date
  }

  return next;
}

export function getDaysUntilRenewal(
  startDate: string,
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
): number {
  const nextRenewal = getNextRenewalDate(startDate, billingCycle);
  // Get today's date in India timezone
  const todayStr = getTodayIndiaDateString();
  const today = parseIndiaDate(todayStr);
  today.setHours(0, 0, 0, 0);
  nextRenewal.setHours(0, 0, 0, 0);

  const diffTime = nextRenewal.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function calculateMonthlyCost(
  cost: number,
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
): number {
  switch (billingCycle) {
    case 'Monthly':
      return cost;
    case 'Quarterly':
      return cost / 3;
    case 'Yearly':
      return cost / 12;
    case 'Once':
      return 0; // One-time payments don't contribute to monthly cost
  }
}

