"use client"

import * as React from "react"
import { endOfDay, format, startOfDay, formatRFC3339, formatISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

type Props = {
    date?: Date,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    label: string
    filter?: boolean
}


export function DatePicker({ date, setDate, label, filter }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname();

    const handleChange = () => {
        if (filter) {
            const params = new URLSearchParams(searchParams)

            if (date) {
                params.set('due', formatISO(date))
            }
            else {
                params.delete('due')
            }
            router.push(pathname + "?" + params.toString())
        }
    }

    React.useEffect(() => {
        if (filter) {
            const params = new URLSearchParams(searchParams)
            if (params.has('due')) {
                setDate(new Date(params.get('due') as string))
            }
        }
    }, [])

    return (
        <Popover modal={true} >
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" onBlur={handleChange}>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
