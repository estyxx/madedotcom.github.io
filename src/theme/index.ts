import { Colors, ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const meridianRegular = "FS Meridian Regular, sans-serif";
export const meridianMedium = "FS Meridian Medium";
export const neruda = "FS Neruda";
export const hackFont = "FS Hack";

const colors: Colors = {
  made: {
    black: "#131413",
    baige: "#d9c3b8",
    green: "#c0d0cf",
    grey: "#d7d3d0",
    blue: "#353F7D",
    90: "#222321",
    80: "#434442",
    70: "#626360",
    60: "#767874",
    50: "#9fa19d",
    40: "#bdbfbb",
    30: "#e1e3de",
    20: "#eef0ed",
    10: "#f5f6f4",
    5: "#fafafa",
  },
  red: {
    80: "#d03740",
    50: "#F15856",
    10: "#ffdfdd",
    5: "#fff2f0",
  },
  green: {
    80: "#008248",
    50: "#30a75b",
    10: "#ccf5ce",
    5: "#e4fbe5",
  },
};

const fonts = {
  heading: meridianMedium,
  body: meridianRegular,
  mono: hackFont,
};

const breakpoints = {
  sm: "23em",
  md: "37em",
  lg: "90em",
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  breakpoints,
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default theme;
