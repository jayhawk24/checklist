"use client"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/service/profile-service';
import { SignupRequest, useSignupMutation } from '@/service/signup';
import SignupForm from './forms/signupForm';

export default function Signup() {
    const router = useRouter()
    const userProfile = useUserProfile()

    if (userProfile.data) {
        router.push("/ticklist")
    }

    const signupMutation = useSignupMutation()

    const handleSubmit = ({ name, email, password }: SignupRequest) => {

        toast.promise(signupMutation.mutateAsync({ name, email, password }), {
            loading: "Signing up...",
            success: "Signup successful.",
            error: "Invalid email or password."
        }).then(() => router.push("/auth/login"))

    }

    return <div className='flex flex-col justify-between'>
        <SignupForm onSubmit={handleSubmit} />
    </div>

}