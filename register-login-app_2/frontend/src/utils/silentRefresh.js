export const getExpirationTime = (accessToken) => {
    if (!accessToken || typeof accessToken === "object") return;
    const [_, payloadBase64] = accessToken.split(".");
    const { iat, exp } = JSON.parse(atob(payloadBase64));
    const delayTime = (exp - iat) * 1000;
    return delayTime;
};

export const getNewAccessToken = async () => {
    const newAccessTokenFetch = await fetch(
        import.meta.env.VITE_API_URL + "users/refreshToken",
        {
            method: "POST",
            credentials: "include",
        }
    );
    const { newAccessToken } = await newAccessTokenFetch.json();
    console.log(newAccessToken);
    return newAccessToken;
};

export const silentRefresh = (accessToken, setAuthorization) => {
    const delayTime = getExpirationTime(accessToken);
    setTimeout(async () => {
        const newAccessToken = await getNewAccessToken();
        setAuthorization(`Bearer ${newAccessToken}`);
        silentRefresh(newAccessToken, setAuthorization);
    }, 3000);
};
