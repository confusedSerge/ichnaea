
// Habit tracker page, final form:
// 
// Habit                      Week X
// [Habit 1]    [] [] [] [] [] [] []
// [Habit 2]    [] [] [] [] [] [] []
// [Habit 3]    [] [] [] [] [] [] []

// React
import { useEffect, useState } from "react";

// Next
import Head from "next/head";
import Router from "next/router";

// API
import { useFetchHabits } from "@/lib/api/habits";

// Auth Hooks
import useAuthenticator from "@/lib/hook/useAuthenticator";
import useAuthStorage from "@/lib/hook/useAuthStorage";

// Interfaces
import List from "@/lib/interface/list";
import Task from "@/lib/interface/task";

// Components
import ErrorPage from "@/components/defaults/errorpage";
import Input from "@/components/basics/input";
import Textarea from "@/components/basics/textarea";
import Button from "@/components/basics/button";


export default function HabitPage() {

    const auth = useAuthenticator();

    const [week, setWeek] = useState(1);
    const [year, setYear] = useState(2023);

    const [touchY, setTouchY] = useState(0);

    const touchYDirection = (e: any) => {
        let sensitivity = 10;
        console.log(e.touches[0].clientY);
        if (e.touches.length > 0) {
            // Don't register, if scrolling is not big enough
            if (touchY < e.touches[0].clientY + sensitivity && touchY > e.touches[0].clientY - sensitivity) {
                return 0;
            }


            if (e.touches[0].clientY - sensitivity > touchY) {
                setTouchY(e.touches[0].clientY);
                return 1;
            }
            if (e.touches[0].clientY + sensitivity < touchY) {
                setTouchY(e.touches[0].clientY);
                return -1;
            }
        }
        return 0;
    }

    useEffect(() => {
        if (auth.isReady && !auth.isAuthenticated) {
            Router.push("/");
        }
    }, [auth]);

    // get the data from the API
    const { data: habits, error: habitsError, mutate: habitsMutate } = useFetchHabits(auth.isReady && auth.isAuthenticated);

    if (habitsError) {
        return <ErrorPage title="Error" message={`Something went wrong. \n Please try again later.`} />
    }

    return (
        <div className="flex flex-col h-full py-4 sm:px-8">
            <Head>
                <title>ICHNAEA | Habit</title>
            </Head>


            <div className="w-full flex flex-row justify-between items-center my-16 py-2 space-x-4 font-black text-2xl sm:text-3xl 2xl:text-4xl">
                <h1 className="w-full flex">Habit</h1>

                <div className='flex scroll touch-none whitespace-nowrap'
                    onWheel={(e: any) => { e.stopPropagation(); setWeek((prevWeek) => (prevWeek - Math.sign(e.deltaY) + 53) % 53); }}
                    onTouchStart={(e: any) => { e.stopPropagation(); setTouchY(e.touches[0].clientY); }}
                    onTouchMove={(e: any) => { e.stopPropagation(); e.preventDefault(); setWeek((prevWeek) => (prevWeek - touchYDirection(e) + 53) % 53); }}>
                    Week {week + 1}
                </div>

                <div className='flex touch-none whitespace-nowrap'
                    onWheel={(e: any) => { e.stopPropagation(); setWeek((prevWeek) => (prevWeek - Math.sign(e.deltaY) + 53) % 53); }}
                    onTouchStart={(e: any) => { e.stopPropagation(); setTouchY(e.touches[0].clientY); }}
                    onTouchMove={(e: any) => { e.stopPropagation(); e.preventDefault(); setWeek((prevWeek) => (prevWeek - touchYDirection(e) + 53) % 53); }}>
                    Year {year + 1}
                </div>

            </div>


            {habits?.items.map((habit) => (
                <div>{habit.name}</div>
            ))}

        </div >

    );


}