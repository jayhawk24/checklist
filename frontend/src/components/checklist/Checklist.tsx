"use client"
import React from 'react'
import {
    ElevatedCard,
} from '@cred/neopop-web/lib/components';
import { Task } from "@/service/tasks-services"
import { primaryColors } from '../../../tailwind.config';
import { cardColorConfig } from '../Commons/colorConfig';
import ChecklistItem from './ChecklistItem';

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