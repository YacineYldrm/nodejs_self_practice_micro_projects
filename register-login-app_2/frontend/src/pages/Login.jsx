import { useNavigate } from "react-router-dom";
import login from "../utils/login.js";
import { useState } from "react";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    console.log(email, password);

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    return (
        <>
            <form>
                <label>
                    User email:
                    <input onChange={handleEmailInput} type="email" />
                </label>

                <label>
                    User password:
                    <input onChange={handlePasswordInput} type="password" />
                </label>
            </form>
            <button onClick={() => login(email, password, onLoginSuccess)}>
                Login
            </button>
            <button onClick={() => navigate("/register")}>
                Create a new account
            </button>
        </>
    );
};

export default Login;
