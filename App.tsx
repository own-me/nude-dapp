import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/rock-salt";
import "@fontsource/yeseva-one";
import "@fontsource/poppins";
import "@fontsource/shadows-into-light";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Main />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

createRoot(document.getElementById("react-container")).render(<App />);