import { Task, useDeleteTask, useUpdateTask } from '@/service/tasks-services'
import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import TaskForm from '../forms/taskForm'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Badge } from '../ui/badge'
import { getTaskStatusAndColor } from '@/service/commons'
import { Trash2Icon } from 'lucide-react'

type Props = {
    task: Task
}

const TicklistItem = ({ task }: Props) => {
    const queryClient = useQueryClient()
    const updateTaskMutation = useUpdateTask()
    const deleteTaskMutation = useDeleteTask()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleSubmit = (task: Partial<Task>) => {
        toast.promise(updateTaskMutation.mutateAsync(task), {
            loading: "Updating task...",
            error: "Error updating task.",
            success: "Task updated successfully.",
        })
            .then(
                () => {
                    queryClient.invalidateQueries({
                        queryKey: ["tasks"],
                    })
                    setIsDrawerOpen(false)
                }
            )
    }
    const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()

        toast.promise(deleteTaskMutation.mutateAsync(task.id), {
            loading: "Deleting task...",
            error: "Error deleting task.",
            success: "Task deleted successfully.",
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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger>
                <div className='border dark:border-white rounded-lg p-4 my-2 relative overflow-hidden bg-secondary'>
                    <div className="flex w-full justify-between">
                        <div className='flex flex-col items-start'>
                            <p>{task.title}</p>
                            <p className='text-sm dark:text-slate-400'>{task.description}</p>
                        </div>
                        <div className='flex space-x-4'>
                            <Badge variant={'outline'} className={getTaskStatusAndColor(task.status)[1]}>
                                {getTaskStatusAndColor(task.status)[0]}
                            </Badge>
                            <Badge variant={'destructive'} className='h-10 w-10 z-10' onClick={(e) => handleDelete(e)} >
                                <Trash2Icon />
                            </Badge>
                        </div>
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
                    <DrawerClose className='w-full'>
                        <Button variant="outline" className='w-full'>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}

export default TicklistItem