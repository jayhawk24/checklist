import { useMutation } from "@tanstack/react-query";
import axiosInstance from ".";
import { setTokens } from "@/utils/auth";

type LoginResponse = {
    access_token: string;
    refresh_token: string;
};

export const useSigninMutationFn = async (variables: {
    email: string;
    password: string;
}) => {
    const { email, password } = variables;
    const { data } = await axiosInstance.post<LoginResponse>(
        "/users/signin",
        {
            email,
            password
        },
        { withCredentials: true }
    );
    return data;
};

export const useSigninMutation = () =>
    useMutation({
        mutationKey: ["signin"],
        mutationFn: useSigninMutationFn,
        onSuccess: ({ access_token, refresh_token }) => {
            setTokens(access_token, refresh_token);
        }
    });
