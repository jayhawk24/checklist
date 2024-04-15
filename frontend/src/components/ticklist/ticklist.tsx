"use client"
import React, { Suspense, useEffect } from 'react'
import { Task, TaskStatus, useAddTasks, useUserTasks } from "@/service/tasks-services"
import ChecklistItem from './ticklistItem';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import TaskForm from '../forms/taskForm';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { TaskStatusMultiSelect } from '../commons/taskStatusSelect';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '../commons/loadingSpinner';




const Ticklist = () => {
    const searchParams = useSearchParams()
    const userTasks = useUserTasks(searchParams.toString() || "")

    const addTaskMutation = useAddTasks()
    const queryClient = useQueryClient()
    const [values, setValues] = React.useState<TaskStatus[]>([TaskStatus.todo, TaskStatus.done, TaskStatus.in_progress])
    let emptyTask: Task = {
        id: "",
        title: "",
        description: "",
        status: TaskStatus.todo,
        created_at: "",
        updated_at: "",
    }

    const addTask = (taskData: Partial<Task>) => {
        toast.promise(addTaskMutation.mutateAsync(taskData), {
            loading: "Adding task...",
            success: "Task added successfully",
            error: "Error adding task"
        })
        queryClient.invalidateQueries({
            queryKey: ["tasks"]
        })
    }


    return <div className='flex flex-col'>
        <div className="flex mb-3">
            <TaskStatusMultiSelect values={values} onChange={setValues} />
        </div>
        {
            userTasks.isLoading && <div className='flex justify-center items-center my-10 '>
                <LoadingSpinner />
                <p className='ml-2'>
                    Loading tasks...
                </p>
            </div>
        }
        {
            userTasks.data?.items?.map(
                (task) => (
                    <ChecklistItem task={task} key={task.id} />
                )
            )
        }
        <Drawer>
            <DrawerTrigger>
                <div className='border border-white rounded-lg p-4 m-2 ml-0 relative'>
                    <p className='text-slate-400'>Add a new task</p>
                </div>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add Task</DrawerTitle>
                </DrawerHeader>
                <div>
                    <TaskForm task={emptyTask} onSubmit={addTask} />
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
}

export default Ticklist