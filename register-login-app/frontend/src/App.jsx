import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { getNewAccessToken, silentRefresh } from "./utils/silentRefresh";

function App() {
    const [authorization, setAuthorization] = useState(null);

    useEffect(() => {
        if (!authorization)
            getNewAccessToken().then((result) => {
                setAuthorization(`Bearer ${result}`);
                silentRefresh(result, setAuthorization);
            });
    }, []);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Login
                            onLoginSuccess={(authorization) => {
                                setAuthorization(authorization);
                            }}
                        />
                    }
                />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
