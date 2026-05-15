/**
 * Utility to compute the next monthly batch date on 1st or 15th.
 * Rules:
 * - If today is before or on 1st -> show 1st of current month
 * - If today is after 1st and before or on 15th -> show 15th of current month
 * - If today is after 15th -> show 1st of next month
 */
export function getNextMonthlyBatchDateString(now = new Date()): string {
  const day = now.getDate();
  let targetYear = now.getFullYear();
  let targetMonth = now.getMonth(); // 0-based
  let targetDay = 1;

  if (day <= 1) {
    targetDay = 1;
  } else if (day <= 15) {
    targetDay = 15;
  } else {
    // next month's 1st
    targetDay = 1;
    targetMonth += 1;
    if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }
  }

  const date = new Date(targetYear, targetMonth, targetDay);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default getNextMonthlyBatchDateString;
