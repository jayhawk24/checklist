import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from ".";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    is_active: boolean;
    avatar?: string;
};

type UpdateProfileRequest = {
    name?: string;
    email?: string;
    password?: string;
    old_password?: string;
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

const updateProfile = async (user: UpdateProfileRequest) => {
    const { data } = await axiosInstance.put(`/users/me`, user);
    return data;
};

export const useUpdateProfile = () =>
    useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: updateProfile
    });
