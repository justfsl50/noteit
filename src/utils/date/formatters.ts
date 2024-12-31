import { DATE_FORMATS } from './constants';
import { isValidDate, isValidDateString } from './validators';

export function formatDateTime(input: string | Date): string {
  if (typeof input === 'string' && !isValidDateString(input)) {
    return 'Invalid date';
  }

  const date = typeof input === 'string' ? new Date(input) : input;
  
  if (!isValidDate(date)) {
    return 'Invalid date';
  }

  try {
    return new Intl.DateTimeFormat('en-US', DATE_FORMATS.NOTE_TIMESTAMP).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}