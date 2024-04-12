"use client"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getTaskStatusAndColor } from "@/service/commons"
import { TaskStatus } from "@/service/tasks-services"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

type Props = {
    value: TaskStatus
    onChange: (...event: any[]) => void
}
export function TaskStatusSelect({ value, onChange }: Props) {
    return (
        <ToggleGroup type="single" value={value} onValueChange={onChange} className="flex justify-start">
            {Object.values(TaskStatus).map(status =>
                <ToggleGroupItem value={status} key={status} aria-label={`Toggle ${status}`}>
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
        params.set("status__in", values.join(","))
        router.push(pathname + "?" + params.toString())
        onChange(value)
    }

    return (
        <ToggleGroup type="multiple" className="flex justify-start" value={values} onValueChange={(value) => handleChange(value as TaskStatus[])}>
            {Object.values(TaskStatus).map(status =>
                <ToggleGroupItem value={status} key={status} aria-label={`Toggle ${status}`}>
                    {getTaskStatusAndColor(status)[0]}
                </ToggleGroupItem>
            )}
        </ToggleGroup>
    )
}
