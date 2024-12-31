import { debounce } from './debounce';

export const createAutoSave = (saveCallback: (content: string) => void, delay = 1000) => {
  return debounce((content: string) => {
    saveCallback(content);
  }, delay);
};