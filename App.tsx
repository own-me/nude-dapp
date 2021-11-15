import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/rock-salt";
import "@fontsource/yeseva-one";
import "@fontsource/poppins";
import "@fontsource/shadows-into-light";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <Main />
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById("react-container"));