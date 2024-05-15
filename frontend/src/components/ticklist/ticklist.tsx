"use client"
import React, { useEffect, useState } from 'react'
import { Task, TaskStatus, useAddTasks, useUserTasks } from "@/service/tasks-services"
import TicklistItem from './ticklistItem';
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
import { DatePicker } from '../commons/datePicker';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import DragableTasks from './dragableTasks';


let emptyTask: Task = {
    id: "",
    title: "",
    description: "",
    status: TaskStatus.todo,
    created_at: "",
    updated_at: "",
}


const Ticklist = () => {
    const [date, setDate] = useState<Date>()
    const [parent] = useAutoAnimate()
    const searchParams = useSearchParams()
    const userTasksQuery = useUserTasks(searchParams.toString() || "")
    const [userTasks, setUserTasks] = useState<Task[]>([])

    const addTaskMutation = useAddTasks()
    const queryClient = useQueryClient()
    const [values, setValues] = React.useState<TaskStatus[]>([TaskStatus.todo, TaskStatus.done, TaskStatus.in_progress])

    useEffect(() => {
        if (userTasksQuery.isSuccess) {
            setUserTasks(userTasksQuery?.data?.items || [])
        }
    }, [userTasksQuery])

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



    return <div className='flex flex-col' ref={parent}>
        <div className="flex mb-3 flex-wrap justify-between gap-2">
            <TaskStatusMultiSelect values={values} onChange={setValues} />
            <DatePicker date={date} setDate={setDate} label="Filter by date" filter />
        </div>
        {
            userTasksQuery.isLoading && <div className='flex justify-center items-center my-10 '>
                <LoadingSpinner />
                <p className='ml-2'>
                    Loading tasks...
                </p>
            </div>
        }
        <DragableTasks tasks={userTasks} setTasks={setUserTasks}>
            {
                userTasks.map(
                    (task) => (
                        <TicklistItem task={task} key={task.id} />
                    )
                )
            }
        </DragableTasks>


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