import {DefaultTheme} from "styled-components";

export const theme: DefaultTheme = {
    breakpoints: {
        mobile: 768,
        tablet: 992,
        desktop: 1200
    },
    dark: {
        backgroundColor: "rgb(14 0 26)",
        backgroundColor2: "rgb(16 0 30)",
        textColor: "white"
    },
    light: {
        backgroundColor: "white",
        textColor: "black"
    },
    isDarkMode: false
};