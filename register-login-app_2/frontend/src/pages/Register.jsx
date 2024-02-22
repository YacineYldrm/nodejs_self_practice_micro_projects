import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);

    const handleRegistration = async () => {
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        const registerFetchRequest = await fetch(
            import.meta.env.VITE_API_URL + "users/register",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newUser),
            }
        );
        const { success, error, result } = await registerFetchRequest.json();
        if (!success) console.log(error);
        console.log(result);
    };

    return (
        <>
            <form>
                <label>
                    First name:
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                    />
                </label>
                <label>
                    Last name:
                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                    />
                </label>
                <label>
                    email:
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                    />
                </label>
                <label>
                    password:
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </label>
            </form>
            <button onClick={() => handleRegistration()}>
                Confirm registration
            </button>
            <button onClick={() => navigate("/")}>Back to login</button>
        </>
    );
};

export default Register;
