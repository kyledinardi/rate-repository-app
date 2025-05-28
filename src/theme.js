import { Platform } from "react-native";

const theme = {
  fontSizes: { body: 14, subheading: 16 },
  fontWeights: { normal: "400", bold: "700" },

  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },

  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarBackground: "#24292e",
    mainBackground: "#e1e4e8",
    error: "#d73a4a",
  },
};

export default theme;
