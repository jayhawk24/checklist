"use client"
import LoadingSpinner from '@/components/commons/loadingSpinner'
import Ticklist from '@/components/ticklist/ticklist'
import { useUserProfile } from '@/service/profile-service'
import { useUserTasks } from '@/service/tasks-services'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Calendar } from "@/components/ui/calendar"

const TasksPage = () => {
    const router = useRouter()
    const userProfile = useUserProfile()
    const searchParams = useSearchParams()
    const userTasks = useUserTasks(searchParams.toString() || "")
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    if (userProfile.isError) {
        router.push('/login')
    }

    if (userProfile.isLoading) {
        return <LoadingSpinner />
    }

    return (
        <main className='mt-7 space-y-5 justify-center flex'>
            <h1 className='text-5xl'>
                My tasks
            </h1>
            <div className='flex flex-col w-2/3'>
                <div className="flex max-w-full max-h-full justify-around">
                    <Image src="/images/undraw_completed_tasks_vs6q.svg" alt='tasks image' height={150} width={300} />
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border"
                    />
                </div>
                <Ticklist tasks={userTasks?.data?.items} />
            </div>
        </main >
    )
}

export default TasksPage