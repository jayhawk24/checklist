"use client"
import { Button, InputField } from '@cred/neopop-web/lib/components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSigninMutationFn } from "../service/login-services"
import { useMutation } from '@tanstack/react-query';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signinMutation = useMutation({
        mutationKey: ["signin"],
        mutationFn: useSigninMutationFn
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signinMutation.mutate({ email, password })
    }

    return <div className='flex flex-col justify-between h-full'>
        <form onSubmit={e => handleSubmit(e)}>
            <div className=''>
                <InputField
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
                />

            </div>
            <div>
                <Button
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
                </Button>

            </div>
        </form>
    </div>

}