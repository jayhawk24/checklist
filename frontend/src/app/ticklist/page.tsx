"use client"
import LoadingSpinner from '@/components/commons/loadingSpinner'
import Ticklist from '@/components/ticklist/ticklist'
import { useUserProfile } from '@/service/profile-service'
import { useUserTasks } from '@/service/tasks-services'
import { useRouter } from 'next/navigation'
import React from 'react'

const TasksPage = () => {
    const router = useRouter()
    const userProfile = useUserProfile()
    const userTasks = useUserTasks()

    if (userProfile.isError) {
        router.push('/login')
    }

    if (userProfile.isLoading) {
        return <LoadingSpinner />
    }

    return (
        <>
            <Ticklist tasks={userTasks?.data?.items} />
        </>
    )
}

export default TasksPage