// This function was created by chatGPT 3.5

export default function getContrastColor(hexColor: string): string {
  // Predefined list of contrasting colors
  const contrastingColors: string[] = [
    '#FF5733',
    '#6C3483',
    '#3498DB',
    '#2ECC71',
    '#F39C12',
    '#E74C3C',
    '#8E44AD',
  ];

  // Remove the '#' symbol if present
  hexColor = hexColor.replace('#', '');

  // Convert hex to RGB
  const r: number = parseInt(hexColor.substring(0, 2), 16);
  const g: number = parseInt(hexColor.substring(2, 4), 16);
  const b: number = parseInt(hexColor.substring(4, 6), 16);

  // Calculate relative luminance (L)
  const luminance: number = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Calculate index based on luminance
  const index: number = Math.round(luminance * (contrastingColors.length - 1));

  // Select contrasting color from the list
  const contrastColor: string = contrastingColors[index];

  return contrastColor;
}
