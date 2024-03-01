"use client"
import LoadingSpinner from '@/components/commons/loadingSpinner'
import Checklist from '@/components/checklist/checklist'
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
            <div>Checklist</div>
            <div>Welcome {userProfile.data?.name}</div>
            <Checklist tasks={userTasks?.data?.items} />
        </>
    )
}

export default TasksPage