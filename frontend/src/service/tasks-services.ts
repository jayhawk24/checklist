import { useQuery } from "@tanstack/react-query";
import axiosInstance from ".";
import { PageResponse } from "./commons";

export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    start?: string;
    due?: string;
    created_at: string;
    updated_at: string;
};

const getTasks = async () => {
    const { data } = await axiosInstance.get<PageResponse<Task>>("/tasks");
    return data;
};

export const useUserTasks = () =>
    useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks
    });
