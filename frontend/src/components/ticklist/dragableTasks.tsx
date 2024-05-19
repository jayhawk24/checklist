import React, { Dispatch, SetStateAction } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, arraySwap, SortableContext } from '@dnd-kit/sortable'
import { Task } from '@/service/tasks-services'
import TicklistItem from './ticklistItem'

type Props = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>,
}

const DragableTasks = ({ tasks, setTasks }: Props) => {

    const reorderTasks = (e: DragEndEvent) => {
        if (!e.over) return

        if (e.active.id !== e?.over?.id) {
            const oldIndex = tasks.findIndex((task) => task.id === e.active.id.toString());
            const newIndex = tasks.findIndex((task) => task.id === e.over!.id.toString());
            const newOrder = arrayMove(tasks, oldIndex, newIndex);
            setTasks(newOrder)
        }
    }

    return (
        <DndContext onDragEnd={reorderTasks}>
            <SortableContext items={tasks}>
                {tasks.map((task) => <TicklistItem task={task} key={task.id} />)}
            </SortableContext>
        </DndContext>
    )
}

export default DragableTasks