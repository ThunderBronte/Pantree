//maps views and server to client side
import React from "react";
import useEffect = require("react");

function App() {
    useEffect(() => {
        fetch('users');
    }, []);

    return (
        <div>

        </div>
    );
}

export default App;