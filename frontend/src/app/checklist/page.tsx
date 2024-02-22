"use client"
import { getProfile } from '@/service/profile-service'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TasksPage = () => {
    const userProfile = useQuery({
        queryKey: ["userProfile"],
        queryFn: getProfile
    });

    console.log(userProfile.data)
    return (
        <>
            <div>Checklist</div>
            <div>Welcome {userProfile.data?.name}</div>
        </>
    )
}

export default TasksPage