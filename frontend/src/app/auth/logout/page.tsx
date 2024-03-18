"use client"
import { setTokens } from '@/utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

type Props = {}

const LogoutPage = (props: Props) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        setTokens("", "")
        queryClient.invalidateQueries({ queryKey: ["userProfile"] })
        window.location.replace('/auth/login')
    }, [])
    return (
        <div>Logging out...</div>
    )
}

export default LogoutPage