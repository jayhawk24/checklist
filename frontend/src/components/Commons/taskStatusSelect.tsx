import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function TaskStatusSelect() {
    return (
        <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
                Todo
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
                In Progress
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
                Done
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
