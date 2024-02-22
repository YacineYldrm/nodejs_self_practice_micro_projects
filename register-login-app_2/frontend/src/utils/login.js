import { silentRefresh } from "./silentRefresh";

const login = async (email, password, setAuthorization) => {
    const loginFetchRequest = await fetch(
        import.meta.env.VITE_API_URL + "users/login",
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }
    );
    const { success, error, accessToken } = await loginFetchRequest.json();
    if (!success) console.log(error);
    setAuthorization(`Bearer ${accessToken}`);
    silentRefresh(accessToken, setAuthorization);
};

export default login;
