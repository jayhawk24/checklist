import { useMutation } from "@tanstack/react-query";
import axiosInstance from ".";
import toast from "react-hot-toast";

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
    try {
        const { data } = await axiosInstance.post("/users/signin", {
            email,
            password
        });
        return data;
    } catch (error) {
        toast.error("Invalid email or password");
    }
};
