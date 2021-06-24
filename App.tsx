import React from "react";
import ReactDOM from 'react-dom';
import "@fontsource/rock-salt";
import "@fontsource/yeseva-one";
import "@fontsource/poppins";
import "@fontsource/shadows-into-light";
import { store } from './redux/store';
import { Provider } from 'react-redux'
import Main from "./Main";

function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('react-container'));