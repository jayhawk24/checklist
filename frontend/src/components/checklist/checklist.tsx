"use client"
import React from 'react'
import { Task } from "@/service/tasks-services"
import ChecklistItem from './checklistItem';

type Props = {
    tasks: Task[] | undefined
}

const Checklist = ({ tasks }: Props) => {
    return tasks?.map(
        (task) => (
            <ChecklistItem task={task} />
        )
    )
}

export default Checklist