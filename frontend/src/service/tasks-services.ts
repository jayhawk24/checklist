import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from ".";
import { PageResponse } from "./commons";

export enum TaskStatus {
    "todo" = "todo",
    "in_progress" = "in_progress",
    "done" = "done"
}

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    start?: Date;
    due?: Date;
    created_at: string;
    updated_at: string;
};

const getTasks = async (query: string) => {
    const { data } = await axiosInstance.get<Task[]>("/tasks?" + query);
    return data;
};

export const useUserTasks = (params: string) =>
    useQuery({
        queryKey: ["tasks", params],
        queryFn: () => getTasks(params)
    });

const addTasks = async (task: Partial<Task>) => {
    const { data } = await axiosInstance.post("/tasks", task);
    return data;
};

export const useAddTasks = () =>
    useMutation({
        mutationKey: ["addTasks"],
        mutationFn: addTasks
    });

const updateTask = async (task: Partial<Task>) => {
    const { data } = await axiosInstance.put(`/tasks/${task.id}`, task);
    return data;
};

export const useUpdateTask = () =>
    useMutation({
        mutationKey: ["updateTask"],
        mutationFn: updateTask
    });

const deleteTask = async (taskId: string) => {
    const { data } = await axiosInstance.delete(`/tasks/${taskId}`);
    return data;
};

export const useDeleteTask = () =>
    useMutation({
        mutationKey: ["deleteTask"],
        mutationFn: deleteTask
    });
