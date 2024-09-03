// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF7043", // Warm Orange
            dark: "#E64A19",
        },
        secondary: {
            main: "#FFFFFF", // Professional White
        },
        background: {
            default: "#FFFFFF", // Professional White for the background
            paper: "#F5F5F5", // Slightly off-white paper color
        },
        text: {
            primary: "#000000",
            secondary: "#4E342E", // Darker shade for secondary text
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h4: {
            color: "#000000", // Warm Orange for headings
        },
        body1: {
            color: "#000000", // Darker shade for body text
        },
    },
});

export default theme;
