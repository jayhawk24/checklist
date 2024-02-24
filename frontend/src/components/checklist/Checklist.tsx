"use client"
import React from 'react'
import {
    ElevatedCard,
} from '@cred/neopop-web/lib/components';
import { Task } from "@/service/tasks-services"

type Props = {
    tasks: Task[] | undefined
}

const Checklist = ({ tasks }: Props) => {
    return tasks?.map(
        (task) => (<ElevatedCard
            backgroundColor="#AE275F"
            edgeColors={{
                bottom: '#5C1532',
                right: '#851E49',
            }}
            style={{
                width: '230px',
            }}
        >
            {task.title}
        </ElevatedCard>
        )
    )
}

export default Checklist