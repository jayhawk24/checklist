"use client"
import Checklist from '@/components/checklist/Checklist'
import { useUserProfile } from '@/service/profile-service'
import { useUserTasks } from '@/service/tasks-services'
import React from 'react'

const TasksPage = () => {
    const userProfile = useUserProfile()
    const userTasks = useUserTasks()

    return (
        <>
            <div>Checklist</div>
            <div>Welcome {userProfile.data?.name}</div>
            <Checklist tasks={userTasks?.data?.items} />
        </>
    )
}

export default TasksPage