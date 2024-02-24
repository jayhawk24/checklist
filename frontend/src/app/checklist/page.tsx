"use client"
import { useUserProfile } from '@/service/profile-service'
import React from 'react'

const TasksPage = () => {
    const userProfile = useUserProfile()

    return (
        <>
            <div>Checklist</div>
            <div>Welcome {userProfile.data?.name}</div>
        </>
    )
}

export default TasksPage