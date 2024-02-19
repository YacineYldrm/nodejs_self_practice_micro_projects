import { silentRefresh } from "./silentRefresh.js";

const login = async (email, password, setAuthorization) => {
    const loginFetchRequest = await fetch(
        import.meta.env.VITE_API_URL + "/users/login",
        {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        }
    );
    const { success, error, tokens } = await loginFetchRequest.json();
    if (!success) console.log(error);
    else {
        setAuthorization(`Bearer ${tokens.accessToken}`);
        silentRefresh(tokens.accessToken, setAuthorization);
    }
};

export default login;
