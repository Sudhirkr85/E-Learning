/**
 * Utility to provide batch availability messaging.
 * No specific start dates are shown in the UI.
 */
export function getNextMonthlyBatchDateString(now = new Date()): string {
  return 'Limited seats available';
}

export function getNextMonthlyBatchLabel(now = new Date()): string {
  return 'Limited seats available';
}

export default getNextMonthlyBatchDateString;
