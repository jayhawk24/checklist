import { Task, useUpdateTask } from '@/service/tasks-services'
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import TaskForm from '../forms/taskForm'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
    task: Task
}

const AddChecklistItem = ({ task }: Props) => {
    const queryClient = useQueryClient()
    const updateTaskMutation = useUpdateTask()

    const handleSubmit = (task: Partial<Task>) => {
        toast.promise(updateTaskMutation.mutateAsync(task), {
            loading: "Updating task...",
            error: "Error updating task.",
            success: "Task updated successfully.",
        })
            .then(
                () => queryClient.invalidateQueries(
                    {
                        queryKey: ["tasks"],
                    }
                )
            )
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <div className='border border-white rounded-lg p-4 m-4 relative'>
                    <div className="flex">
                        <p>{task.title}</p>
                        <p>{task.description}</p>
                    </div>
                </div>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Task</DrawerTitle>
                </DrawerHeader>
                <div>
                    <TaskForm task={task} onSubmit={handleSubmit} />
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddChecklistItem