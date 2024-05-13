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
import { TaskStatusSelect } from '../commons/taskStatusSelect'
import { DatePicker } from '../commons/datePicker'
import { formatRFC3339 } from 'date-fns'

type Props = {
    task: Task
    onSubmit: (task: Partial<Task>) => void;
}

const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus),
    due: z.date().optional()
})
const TaskForm = ({ task, onSubmit }: Props) => {
    const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: task.title,
            description: task?.description || "",
            status: task.status,
            due: task?.due || undefined
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
                <div className="flex items-end justify-between">

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

                    <FormField
                        control={taskForm.control}
                        name="due"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DatePicker date={field.value} setDate={field.onChange} label="Due date" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button type='submit' onSubmit={() => handleSubmit(task)}>Submit</Button>
            </form>
        </Form>
    )
}

export default TaskForm