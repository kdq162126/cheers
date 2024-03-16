function getStartOfDay(date: Date): Date {
  const startOfDay = new Date(date.getTime());
  startOfDay.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to get the start of the day

  return startOfDay;
}

function getStartOfWeek(date: Date): Date {
  const currentDayOfWeek: number = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const startOfWeek: Date = new Date(date); // Create a new Date object to avoid modifying the original date

  // Calculate the number of days to subtract to set the date to the start of the week (Monday)
  const daysToSubtract: number =
    currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  // Set the date to the start of the week (Monday) by subtracting the number of days
  startOfWeek.setDate(date.getDate() - daysToSubtract);

  // Set the time to 00:00:00 to get the exact start of the day
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function getStartOfMonth(date: Date): Date {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();

  // Create a new Date object with the start day of the month
  const startDayOfMonth: Date = new Date(year, month, 1);

  // Set the time to 00:00:00 to get the exact start of the day
  startDayOfMonth.setHours(0, 0, 0, 0);

  return startDayOfMonth;
}

function isPastDateOlderThan(pastDate: Date, threshold: number): boolean {
  const now = new Date();
  const dateBefore = new Date();
  dateBefore.setDate(now.getDate() - threshold);

  return pastDate < dateBefore;
}

export { getStartOfDay, getStartOfWeek, getStartOfMonth, isPastDateOlderThan };
