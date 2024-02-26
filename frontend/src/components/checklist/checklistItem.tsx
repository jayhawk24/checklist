import { Task } from '@/service/tasks-services'
import React from 'react'


type Props = {
    task: Task
}

const ChecklistItem = ({ task }: Props) => {
    return (
        <div className='border border-white rounded-lg p-4 m-4 relative'>
            <div className="flex">
                <p>{task.title}</p>

            </div>
        </div>
    )
}

export default ChecklistItem