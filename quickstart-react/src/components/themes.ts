import { Colors } from "../colors";

export interface ThemeType {
  body: string;
  text: string;
  toggleBorder: string;
  background: string;
}

export const lightTheme = {
  body: Colors.PRIMARY_WHITE,
  text: Colors.PRIMARY_BLACK,
  cardBorder: Colors.BORDER_CARD,
  cardBackground: Colors.GREY,
  background: Colors.PRIMARY_WHITE,
  sidebarHover: Colors.SIDE_BAR_HOVER,
  sidebarSelected: Colors.SIDE_BAR_SELECTED,
  iconColor: Colors.DARK_GREEN,
};
export const darkTheme = {
  body: Colors.DARK_THEME_SECONDARY,
  text: Colors.DARK_THEME_TEXT,
  cardBorder: Colors.DARK_THEME_SECONDARY,
  cardBackground: Colors.DARK_THEME_SECONDARY,
  background: Colors.DARK_THEME_PRIMARY,
  sidebarHover: Colors.DARK_SIDE_BAR_HOVER,
  sidebarSelected: Colors.DARK_SIDE_BAR_SELECTED,
  iconColor: Colors.DARK_THEME_TEXT,
};
