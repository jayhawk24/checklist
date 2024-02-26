import { Task } from '@/service/tasks-services'
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

type Props = {
    task: Task
}

const ChecklistItem = ({ task }: Props) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <div className='border border-white rounded-lg p-4 m-4 relative'>
                    <div className="flex">
                        <p>{task.title}</p>
                        <p> {task.description} </p>

                    </div>
                </div>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Task</DrawerTitle>
                </DrawerHeader>
                <div>
                    <TaskForm task={task} />
                </div>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ChecklistItem