import { useState } from "react";
import { useParams } from "react-router-dom";

const Verification = () => {
    const [code, setCode] = useState(null);
    const { userId } = useParams();

    const handleVerification = async () => {
        const verificationFetchRequest = await fetch(
            import.meta.env.VITE_API_URL + `users/verification`,
            {
                method: "POST",
                body: JSON.stringify({
                    sixDigitCode: code,
                    userId: userId,
                }),
                headers: { "Content-type": "application/json" },
            }
        );
        const { success, result, message } =
            await verificationFetchRequest.json();
        if (!success) console.log(message);
        console.log(result);
    };

    return (
        <>
            <form>
                <label>
                    Your verification code:{" "}
                    <input
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        name=""
                        id=""
                        placeholder="e.g. 123456"
                    />
                </label>
            </form>
            <button onClick={() => handleVerification()}>Submit</button>
        </>
    );
};

export default Verification;
