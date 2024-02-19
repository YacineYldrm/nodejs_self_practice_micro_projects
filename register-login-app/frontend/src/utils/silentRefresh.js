const getExpirationTime = (accessToken) => {
    if (typeof accessToken === "object") return;
    const [_, tokenPayload64] = accessToken.split(".");
    const { iat, exp } = JSON.parse(atob(tokenPayload64));
    const delayTime = (exp - iat - 120) * 1000;
    return delayTime;
};

export const getNewAccessToken = async () => {
    const newAccessTokenFetch = await fetch(
        import.meta.env.VITE_API_URL + "/users/refresh",
        {
            method: "POST",
            credentials: "include",
        }
    );
    const { success, error, newAccessToken } = await newAccessTokenFetch.json();
    if (!success) console.log(error);
    else return newAccessToken;
};

export const silentRefresh = async (accessToken, setAuthorization) => {
    let delayTime = 1000;
    if (accessToken) {
        delayTime = getExpirationTime(accessToken);
    }
    setTimeout(async () => {
        const newAccesToken = await getNewAccessToken();
        setAuthorization(`Bearer ${newAccesToken}`);
        silentRefresh(newAccesToken, setAuthorization);
    }, 3000);
};
