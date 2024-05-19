"use client"
import Ticklist from '@/components/ticklist/ticklist'
import { useUserProfile } from '@/service/profile-service'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'

const TasksPage = () => {
    const router = useRouter()
    const userProfile = useUserProfile()

    if (userProfile.isError) {
        router.push('/login')
    }

    return (
        <main className='flex md:mt-7 mt-10 justify-center'>
            <div className="border border-secondary md:p-16 p-5 rounded-xl space-y-10 lg:w-2/3">
                <h1 className='text-5xl'>
                    My tasks
                </h1>
                <div className='flex flex-col space-y-10'>
                    <Suspense>
                        <Ticklist />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}

export default TasksPage