export const TOOLTIP_WIDTH = 400;
export const TOOLTIP_DEFAULT_PADDING = 40;

export const COLORS = {
  primary: "#4A9FFF",
  primaryDark: "#2D7DD2",
  glass: "rgba(100, 100, 110, 0.72)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassBorderHover: "rgba(255, 255, 255, 0.28)",
  inputBackground: "rgba(0, 0, 0, 0.5)",
  textPrimary: "rgba(255, 255, 255, 0.92)",
  textSecondary: "rgba(255, 255, 255, 0.7)",
} as const;

export const PRIMARY_GRADIENT = `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`;
