"use client"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getTaskStatusAndColor } from "@/service/commons"
import { TaskStatus } from "@/service/tasks-services"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

type Props = {
    value: TaskStatus
    onChange: (...event: any[]) => void
}
export function TaskStatusSelect({ value, onChange }: Props) {
    return (
        <ToggleGroup type="single" value={value} onValueChange={onChange} className="flex justify-start">
            {Object.values(TaskStatus).map(status =>
                <ToggleGroupItem variant={'outline'} className="text-nowrap dark:text-slate-400 text-slate-700" value={status} key={status} aria-label={`Toggle ${status}`}>
                    {getTaskStatusAndColor(status)[0]}
                </ToggleGroupItem>
            )}
        </ToggleGroup>
    )
}

type MutliSelectProps = {
    values: TaskStatus[]
    onChange: (...event: any[]) => void
}

export function TaskStatusMultiSelect(
    { values, onChange }: MutliSelectProps
) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname();

    const handleChange = (value: TaskStatus[]) => {
        const params = new URLSearchParams(searchParams)
        params.set("status__in", value.join(","))
        if (value.length === 0) {
            params.delete("status__in")
        }
        router.push(pathname + "?" + params.toString())
        onChange(value)
    }

    useEffect(() => {
        handleChange(values)
    }, [])

    return (
        <ToggleGroup type="multiple" className="flex justify-start" value={values} onValueChange={(value) => handleChange(value as TaskStatus[])}>
            {Object.values(TaskStatus).map(status =>
                <ToggleGroupItem className="text-nowrap" value={status} key={status} aria-label={`Toggle ${status}`}>
                    {getTaskStatusAndColor(status)[0]}
                </ToggleGroupItem>
            )}
        </ToggleGroup>
    )
}
