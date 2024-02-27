"use client"
import { Task, TaskStatus } from '@/service/tasks-services'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { TaskStatusSelect } from '../Commons/taskStatusSelect'

type Props = {
    task: Task
    onSubmit: (task: Partial<Task>) => void;
}

const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus),
})
const TaskForm = ({ task, onSubmit }: Props) => {
    const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: task.title,
            description: task?.description || "",
            status: task.status
        }
    })

    const handleSubmit = (data: z.infer<typeof TaskFormSchema>) => {
        const updatedTask = { ...task, ...data }
        onSubmit(updatedTask)
    }

    return (
        <Form {...taskForm}>
            <form onSubmit={taskForm.handleSubmit(handleSubmit)} className="space-y-2 flex flex-col mx-4 ">
                <FormField
                    control={taskForm.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="task title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={taskForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl aria-required={false}>
                                <Input type="text" placeholder="task description" {...field} required={false} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={taskForm.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <TaskStatusSelect value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' onSubmit={() => handleSubmit(task)}>Submit</Button>
            </form>
        </Form>
    )
}

export default TaskForm