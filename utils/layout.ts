export function getContentMaxWidth(width: number) {
  if (width >= 1200) return 960;
  if (width >= 900) return 820;
  if (width >= 700) return 680;
  if (width >= 520) return 560;
  return width;
}

export function getScreenPadding(width: number) {
  if (width >= 900) return 32;
  if (width >= 700) return 28;
  return 20;
}

export function getTabBarWidth(width: number) {
  const contentWidth = getContentMaxWidth(width);
  const padding = getScreenPadding(width);

  return Math.min(contentWidth - padding * 2, 420);
}

export function getGridColumns(width: number, minItemWidth = 260, maxColumns = 2) {
  const contentWidth = getContentMaxWidth(width) - getScreenPadding(width) * 2;
  const columns = Math.floor(contentWidth / minItemWidth);

  return Math.max(1, Math.min(columns, maxColumns));
}
