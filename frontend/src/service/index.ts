import { removeTokens, setTokens } from "@/utils/auth";
import axios from "axios";
import toast from "react-hot-toast";

type RefreshTokenResponse = { access_token: string };

const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token") || "";
    try {
        const { data } = await axiosInstance.post<RefreshTokenResponse>(
            "auth/refresh-token",
            { refresh_token }
        );
        setTokens(data.access_token, refresh_token);
        return data.access_token;
    } catch {
        toast.error("Session Expired.");
        removeTokens();
    }
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            error.response.data?.detail === "Could not validate credentials"
        ) {
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                axiosInstance.defaults.headers.common["Authorization"] =
                    "Bearer " + newAccessToken;
                // Make the original request again
                return axiosInstance(originalRequest);
            }
        }

        // If the error was not due to an expired access token, reject the promise with the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
