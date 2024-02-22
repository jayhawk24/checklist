export const postLogin = (access_token: string, refresh_token: string) => {
    if (!access_token || !refresh_token) Error("Token invalid");
    localStorage.setItem("access_token", `Bearer ${access_token}`);
    localStorage.setItem("refresh_token", refresh_token);
};
