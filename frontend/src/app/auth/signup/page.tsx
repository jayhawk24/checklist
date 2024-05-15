import Signup from '@/components/signup'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const SignupPage = (props: Props) => {
    return (
        <div className="border border-secondary p-16 rounded-xl">
            <h1 className="text-5xl mb-20 text-center">Sign Up</h1>
            <Signup />
            <Link href={'/auth/login'} className="w-full">
                <Button variant={"secondary"} className="mt-4 w-full">Already have an account? Login</Button>
            </Link>
        </div>
    )
}

export default SignupPage