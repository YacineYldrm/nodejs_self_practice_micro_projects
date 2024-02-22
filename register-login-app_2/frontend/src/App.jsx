import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import Verification from "./pages/Verification";
import { getNewAccessToken, silentRefresh } from "./utils/silentRefresh";

function App() {
    const [authorization, setAuthorization] = useState(null);
    console.log(authorization);

    const getFirstAccessToken = async () => {
        const accessToken = await getNewAccessToken();
        setAuthorization(`Bearer ${accessToken}`);
        silentRefresh(accessToken, setAuthorization);
    };

    useEffect(() => {
        if (!authorization) getFirstAccessToken();
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
                <Route
                    path="/verification/:userId"
                    element={<Verification />}
                />
            </Routes>
        </>
    );
}

export default App;
