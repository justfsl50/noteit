export const noteColors = ['yellow', 'blue', 'green', 'pink'] as const;

export function getRandomColor() {
  return noteColors[Math.floor(Math.random() * noteColors.length)];
}