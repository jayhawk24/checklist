"use client"
import ProfileForm from '@/components/forms/profileForm'
import React from 'react'

const ProfilePage = () => {


    return (
        <main className='mt-7 space-y-10 justify-center flex-col'>
            <h1 className='text-5xl'>
                My Profile
            </h1>
            <div className='flex items-center space-x-2 flex-col'>
                <div className="border border-secondary p-6 md:p-16 rounded-xl">
                    <ProfileForm />
                </div>
            </div>
        </main>
    )
}

export default ProfilePage