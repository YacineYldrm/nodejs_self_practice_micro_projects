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
        const registrationRequest = await fetch(
            import.meta.env.VITE_API_URL + "/users/register",
            {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                }),
                headers: { "Content-Type": "application/json" },
            }
        );
        const { success, error, message } = await registrationRequest.json();
        if (!success) return console.log(error);
        else {
            setMessage(message);
            console.log(message);
        }
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
