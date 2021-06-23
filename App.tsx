import React from "react";
import ReactDOM from 'react-dom';
import "@fontsource/rock-salt";
import "@fontsource/yeseva-one";
import "@fontsource/poppins";
import "@fontsource/shadows-into-light";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('react-container'));