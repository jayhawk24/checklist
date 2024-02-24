export const setTokens = (access_token: string, refresh_token: string) => {
    if (!access_token || !refresh_token) Error("Token invalid");
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
};

export const removeTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
