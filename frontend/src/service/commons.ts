import { TaskStatus } from "./tasks-services";

export type PageResponse<T> = {
    items?: T[];
    total: number;
    page: number;
    size: number;
    pages: number;
};

export const getTaskStatusAndColor = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.todo:
            return ["Todo", "bg-violet-700"];
        case TaskStatus.done:
            return ["Done", "bg-lime-700"];
        case TaskStatus.in_progress:
            return ["In Progress", "bg-indigo-700"];
        default:
            return "unkown";
    }
};
