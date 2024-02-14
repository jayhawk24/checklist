import { useMutation } from "@tanstack/react-query";
import axiosInstance from ".";

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
};
type LoginErrorResponse = {};

export const useSigninMutationFn = async (variables: {
    email: string;
    password: string;
}) => {
    const { email, password } = variables;
    const { data } = await axiosInstance.post("/users/signin", {
        email,
        password
    });
    return data;
};
