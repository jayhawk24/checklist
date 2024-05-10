"use client"
import { useSigninMutation } from "../service/login-services"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/service/profile-service';
import LoginForm from './forms/loginForm';

export default function Login() {
    const router = useRouter()
    const userProfile = useUserProfile()

    if (userProfile.data) {
        router.push("/ticklist")
    }

    const signinMutation = useSigninMutation()

    const handleSubmit = ({ email, password }: { email: string, password: string }) => {

        toast.promise(signinMutation.mutateAsync({ email, password }), {
            loading: "Logging in...",
            success: "Login successful.",
            error: "Invalid email or password."
        }).then(() => router.push("/ticklist"))

    }

    return <LoginForm onSubmit={handleSubmit} />

}