"use client"
import ProfileForm from '@/components/forms/profileForm'
import React from 'react'

const ProfilePage = () => {


    return (
        <main className='md:mt-24 mt-10 space-y-10 justify-center flex-col'>
            <div className='flex items-center space-x-2 flex-col'>
                <div className="border border-secondary md:p-16 p-4 rounded-xl space-y-10 lg:w-2/3">
                    <h1 className='text-5xl w-full text-center md:text-left'>
                        My profile
                    </h1>
                    <ProfileForm />
                </div>
            </div>
        </main>
    )
}

export default ProfilePage