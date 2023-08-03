import axios from "axios";
import useSWR from "swr";

import { ROUTES } from "./ROUTES";

// Pagination
import Pagination from "../interface/pagination";

// Auth Hooks
import useAuthStorage from "../hook/useAuthStorage";

// Model
import Habit from "../interface/habit";
import HabitTrack from "../interface/habittrack";

// Habits of User

export function useFetchHabits(fetch: boolean) {
    const auth = useAuthStorage();
    const token = auth.getToken();

    const fetchHabits = (url: string) => axios.get<Pagination<Habit>>(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);

    const { data, error, mutate } = useSWR(fetch ? `${ROUTES.HABITS.HABIT}?perPage=100&sort=created` : null, fetchHabits);

    return {
        data,
        error,
        mutate
    };

}

export const updateHabit = async(habit: Habit, token: string) => {
    return axios.patch<Habit>(`${ROUTES.HABITS.HABIT}/${habit.id}`,
        {
            name: habit.name,
            user: habit.user
        }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const createHabit = async(data: {
    name: string,
    user: string
}, token: string) => {
    return axios.post<Habit>(ROUTES.HABITS.HABIT,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

export const deleteHabit = async(id: string, token: string) => {
    return axios.delete<Habit>(`${ROUTES.HABITS.HABIT}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);
}

// Habit Tracks of User

export function useFetchHabitTracks(habit: string, start: number, end: number, fetch: boolean) {
    const auth = useAuthStorage();
    const token = auth.getToken();

    const fetchHabitTracks = (url: string) => axios.get<Pagination<HabitTrack>>(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => response.data);

    const timerange = `timestamp%3E${start} %26%26 timestamp%3C${end}`;

    const { data, error, mutate } = useSWR(fetch ? `${ROUTES.HABITS.HABIT}/${habit}/tracks?perPage=100&sort=created&filter=(${timerange})` : null, fetchHabitTracks);

    return {
        data,
        error,
        mutate
    };

}



