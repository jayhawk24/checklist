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
        <div>TasksPage</div>
    )
}

export default TasksPage