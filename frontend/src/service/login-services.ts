import axiosInstance from ".";

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
