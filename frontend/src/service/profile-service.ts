import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    is_active: boolean;
};

export const getProfile = async () => {
    const { data } = await axiosInstance.get<UserProfile>("/users/me");
    localStorage.setItem("user", JSON.stringify(data));
    return data;
};

export const useUserProfile = () =>
    useQuery({
        queryKey: ["userProfile"],
        queryFn: getProfile,
        staleTime: Infinity
    });
