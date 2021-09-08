import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const dark = createTheme({
  palette: {
    type: "dark",
    primary: {
        light: "#4f5b62",
        main: "#263238",
        dark: "#000a12",
        contrastText: "#fff"
    },
    secondary: {
      main: green[500],
    },
    text: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
    }
  },
  typography: {
    h6: {
      color: "#ffe4c4",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    }
  }
});

export default dark