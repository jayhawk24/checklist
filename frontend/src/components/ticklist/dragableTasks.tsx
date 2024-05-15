import React, { Dispatch, SetStateAction } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Task } from '@/service/tasks-services'

type Props = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
    children: React.ReactNode
}

const DragableTasks = ({ tasks, setTasks, children }: Props) => {

    const reorderTasks = (e: DragEndEvent) => {
        if (!e.over) return

        if (e.active.id !== e?.over?.id) {
            setTasks((tasks) => {
                const oldIndex = tasks.findIndex((task) => task.id === e.active.id.toString());
                const newIndex = tasks.findIndex((task) => task.id === e.over!.id.toString());
                return arrayMove(tasks, oldIndex, newIndex);
            })
        }

    }

    return (
        <DndContext onDragEnd={reorderTasks}>
            <SortableContext items={tasks}>
                {children}
            </SortableContext>
        </DndContext>
    )
}

export default DragableTasks