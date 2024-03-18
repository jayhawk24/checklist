import { useMutation } from "@tanstack/react-query";
import axiosInstance from ".";

type SignupResponse = {
    detail: string;
};

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
};

export const useSignupMutationFn = async (variables: SignupRequest) => {
    const { data } = await axiosInstance.post<SignupResponse>(
        "/users/signup",
        variables,
        { withCredentials: true }
    );
    return data;
};

export const useSignupMutation = () =>
    useMutation({
        mutationKey: ["signup"],
        mutationFn: useSignupMutationFn
    });
