import { Inter } from "next/font/google";
import "../Static/scss/Styles.scss";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wakoopa",
  description: "Wakoopa is your front-row seat to digital consumer behavior",
};

// use default theme
// const theme = createTheme();

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    primary: {
      main: "#1AAC6D",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MuiThemeProvider theme={theme}>
        <body>{children}</body>
      </MuiThemeProvider>
    </html>
  );
}
