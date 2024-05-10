import Signup from '@/components/signup'
import React from 'react'

type Props = {}

const SignupPage = (props: Props) => {
    return (
        <>
            <h1 className="text-5xl mb-20">Sign Up</h1>
            <Signup />
        </>
    )
}

export default SignupPage