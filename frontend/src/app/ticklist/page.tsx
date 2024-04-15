"use client"
import LoadingSpinner from '@/components/commons/loadingSpinner'
import Ticklist from '@/components/ticklist/ticklist'
import { useUserProfile } from '@/service/profile-service'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'

const TasksPage = () => {
    const router = useRouter()
    const userProfile = useUserProfile()

    // const [date, setDate] = React.useState<Date | undefined>(new Date())

    if (userProfile.isError) {
        router.push('/login')
    }

    if (userProfile.isLoading) {
        return <LoadingSpinner />
    }

    return (
        <main className='mt-7 space-y-10 justify-center flex-col'>
            <h1 className='text-5xl'>
                My tasks
            </h1>
            <div className='flex flex-col w-2/3 space-y-10'>
                {/* <div className="flex max-w-full max-h-full justify-around">
                    <Image src="/images/undraw_completed_tasks_vs6q.svg" alt='tasks image' height={150} width={300} />
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border"
                    />
                </div> */}
                <Suspense>
                    <Ticklist />
                </Suspense>
            </div>
        </main >
    )
}

export default TasksPage