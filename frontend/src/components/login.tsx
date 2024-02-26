"use client"
import { useSigninMutation } from "../service/login-services"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/service/profile-service';
import LoginForm from './Login/loginForm';

export default function Login() {
    const router = useRouter()
    const userProfile = useUserProfile()

    if (userProfile.data) {
        router.push("/checklist")
    }

    const signinMutation = useSigninMutation()

    const handleSubmit = ({ email, password }: { email: string, password: string }) => {

        toast.promise(signinMutation.mutateAsync({ email, password }), {
            loading: "Logging in...",
            success: "Login successful.",
            error: "Invalid email or password."
        }).then(() => router.push("/checklist"))

    }

    return <div className='flex flex-col justify-between h-full'>
        {/* <form onSubmit={e => handleSubmit(e)}> */}
        <LoginForm onSubmit={handleSubmit} />
        <div className=''>
            {/* <InputField
                    type="email"
                    label="email"
                    placeholder="enter your email"
                    id="email"
                    autoFocus
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    label="password"
                    placeholder="enter your password"
                    id="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                /> */}

        </div>
        <div>
            {/* <Button
                    variant="primary"
                    kind="elevated"
                    size="big"
                    colorMode="dark"
                    onClick={(e: FormEvent<HTMLFormElement>) => {
                        handleSubmit(e)
                    }}
                    disabled={signinMutation.isPending}
                >
                    Login
                </Button> */}

        </div>
        {/* </form> */}
    </div>

}