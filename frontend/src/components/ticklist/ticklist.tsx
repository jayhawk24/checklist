"use client"
import React from 'react'
import { Task, TaskStatus, useAddTasks } from "@/service/tasks-services"
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

type Props = {
    tasks: Task[] | undefined
}



const Ticklist = ({ tasks }: Props) => {
    const addTaskMutation = useAddTasks()
    const queryClient = useQueryClient()
    const [values, setValues] = React.useState<TaskStatus[]>([TaskStatus.todo])
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
        <div className="flex">
            <TaskStatusMultiSelect values={values} onChange={setValues} />
        </div>
        {
            tasks?.map(
                (task) => (
                    <ChecklistItem task={task} key={task.id} />
                )
            )
        }
        <Drawer>
            <DrawerTrigger>
                <div className='border border-white rounded-lg p-4 m-2 relative'>
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