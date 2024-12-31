export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isValidDateString(dateStr: string): boolean {
  try {
    const date = new Date(dateStr);
    return isValidDate(date);
  } catch {
    return false;
  }
}