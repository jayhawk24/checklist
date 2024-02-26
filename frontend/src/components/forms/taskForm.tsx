"use client"
import { Task } from '@/service/tasks-services'
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

type Props = {
    task: Task
}

const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.enum(["todo", "in_progress", "done"]),
})
const TaskForm = ({ task }: Props) => {
    const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status
        }
    })

    const onSubmit = () => { }

    return (
        <Form {...taskForm}>
            <form onSubmit={taskForm.handleSubmit(onSubmit)} className="space-y-2">
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
            </form>
        </Form>
    )
}

export default TaskForm