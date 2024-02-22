import React from 'react'

type Props = {
    children: React.ReactNode;
}

const TasksLayoutPage = ({ children }: Props) => {
    return (
        <div className='flex flex-col justify-between h-full'>
            {children}
        </div>
    )
}

export default TasksLayoutPage