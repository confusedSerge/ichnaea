import axios from "axios";
import useSWR from "swr";

import { ROUTES } from "./ROUTES";

// Pagination
import Pagination from "../interface/pagination";

// Auth Hooks
import useAuthStorage from "../hook/useAuthStorage";

// Model
import List from "../interface/list";
import Task from "../interface/task";

export function useFetchLists(fetch: boolean) {
    const auth = useAuthStorage();
    const token = auth.getToken();

    const fetchLists = (url: string) => axios.get<Pagination<List>>(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);

    const { data, error, mutate } = useSWR(fetch ? `${ROUTES.TASKS.LIST}?perPage=100&sort=created` : null, fetchLists);

    return {
        data,
        error,
        mutate
    };

}

export const updateList = async(list: List, token: string) => {
    return axios.patch<List>(`${ROUTES.TASKS.LIST}/${list.id}`,
        {
            name: list.name,
            owner: list.owner
        }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const createList = async(data: {
    name: string,
    owner: string
}, token: string) => {
    return axios.post<List>(ROUTES.TASKS.LIST,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const deleteList = async(id: string, token: string) => {
    return axios.delete<List>(`${ROUTES.TASKS.LIST}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

// Task

export function useFetchTasks(listid: string = "", filter: string = "", fetch: boolean = true) {
    const auth = useAuthStorage();
    const token = auth.getToken();

    const fetchTasks = (url: string) => axios.get<Pagination<Task>>(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);

    const listfilter = listid ? `list.id="${listid}"` : "";
    const statusfilter = filter ? `status="${filter}"` : "";
    const fullfilter = listfilter && statusfilter ? `${listfilter} %26%26 ${statusfilter}` : listfilter ? `${listfilter}` : statusfilter ? `${statusfilter}` : "";

    const { data, error, mutate } = useSWR(fetch ? `${ROUTES.TASKS.TASK}?perPage=100&sort=-timestamp&filter=(${fullfilter})` : null, fetchTasks);

    return {
        data,
        error,
        mutate
    };

}

export const updateTask = async(task: Task, token: string) => {
    return axios.patch<Task>(`${ROUTES.TASKS.TASK}/${task.id}`,
        {
            name: task.name,
            description: task.description,
            timestamp: task.timestamp,
            status: task.status
        }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const createTask = async(data: {
    name: string,
    description: string,
    timestamp: number,
    status: string,
    list: string,
}, token: string) => {
    return axios.post<Task>(ROUTES.TASKS.TASK,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const deleteTask = async(id: string, token: string) => {
    return axios.delete<Task>(`${ROUTES.TASKS.TASK}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}
