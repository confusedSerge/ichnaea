// React
import { useEffect, useState } from "react";

// Next
import Head from "next/head";
import Router from "next/router";

// API
import { createList, createTask, deleteList, deleteTask, updateList, updateTask, useFetchLists, useFetchTasks } from "@/lib/api/tasks";

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

// Iconoir
import { Plus } from "iconoir-react";

export default function TaskPage() {

    const auth = useAuthenticator();

    useEffect(() => {
        if (auth.isReady && !auth.isAuthenticated) {
            Router.push("/");
        }
    }, [auth]);

    // get the data from the API
    const { data: lists, error: listError, mutate: listMutate } = useFetchLists(auth.isReady && auth.isAuthenticated);

    if (listError) {
        return <ErrorPage title="Error" message={`Something went wrong. \n Please try again later.`} />
    }

    return (
        <div className="flex flex-col h-full py-4 sm:px-8">
            <Head>
                <title>ICHNAEA | Task</title>
            </Head>


            {lists?.items.map((list) => (
                <ListView key={list.id} list={list} mutateCallback={listMutate} />
            ))}
            <AddListView mutateCallback={listMutate} />
        </div >

    );

}

const ListView = ({ list, mutateCallback }: { list: List, mutateCallback: () => void }) => {

    const auth = useAuthStorage();

    const sorting = [["not-completed", "Not Completed"], ["completed", "Completed"]];
    const [sortBy, setSortBy] = useState<number>(0);

    const [edit, setEdit] = useState<boolean>(false);
    const [editedList, setEditedList] = useState({ ...list });

    const updateHandler = async () => {
        updateList(editedList, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = async () => {
        deleteList(list.id, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const reset = () => {
        setEdit(false);
        setEditedList({ ...list });
    }

    // if token exists, fetch the tasks
    const { data: tasks, error: taskError, mutate: taskMutate } = useFetchTasks(list.id, sorting[sortBy][0], !!auth.getToken());

    if (taskError) {
        return (
            <div className="flex m-auto">
                <h1 className="text-center font-black text-2xl sm:text-3xl 2xl:text-5xl">
                    Could not load tasks for list <br />
                    <span className="text-accent">{list.name}</span>
                    <br /> Please try again later.
                </h1>
            </div>
        );
    }

    if (edit) {
        return (
            <div className="flex flex-col w-full my-16">
                <div className="w-full flex flex-row">
                    <div className="flex flex-grow flex-row border-5 border-r-0 border-secondary">
                        <input type="text" className="w-4/5 flex flex-grow px-2 border-t-5 border-l-5 focus:outline-none font-light"
                            onChange={e => setEditedList({ ...editedList, name: e.target.value })}
                            defaultValue={editedList.name}
                        />
                    </div>

                    <div className="flex flex-row space-x-2">
                        <Button descriptor="Update" onClick={updateHandler} />
                        <Button descriptor="Delete" onClick={deleteHandler} />
                        <Button descriptor="Cancel" onClick={reset} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 2xl:gap-16 py-4">
                    {tasks?.items.map((task) => (
                        <TaskView key={task.id} task={task} mutateCallback={taskMutate} />
                    ))}
                    <AddTaskView list={list} mutateCallback={taskMutate} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full my-16" onDoubleClick={e => { e.stopPropagation(); reset(); setEdit(true); }}>

            <div className="w-full flex flex-row justify-between items-center py-2">
                <h1 className="w-full flex bg-inherit font-black text-2xl sm:text-3xl 2xl:text-4xl outline-none">{list.name}</h1>

                <div onDoubleClick={(e: any) => { e.stopPropagation(); }}>
                    <Button descriptor={sorting[sortBy][1]} onClick={(e: any) => { setSortBy((sortBy + 1) % sorting.length); }} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 2xl:gap-16 py-4">
                {tasks?.items.map((task) => (
                    <TaskView key={task.id} task={task} mutateCallback={taskMutate} />
                ))}
                <AddTaskView list={list} mutateCallback={taskMutate} />
            </div>



        </div>
    );
}

const AddListView = ({ mutateCallback }: { mutateCallback: () => void }) => {

    const auth = useAuthStorage();

    const [show, setShow] = useState<boolean>(false);
    const [newList, setNewList] = useState({ name: "" });

    const create = async () => {
        createList({
            name: newList.name,
            owner: auth.getId() ?? '',
        }, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const reset = () => {
        setShow(false);
        setNewList({ name: "New List" });
    }

    if (!show) {
        return (
            <div className="flex flex-row items-center justify-center w-full my-16 rounded-lg border-2 border-dashed border-gray-300 group cursor-pointer" onClick={() => setShow(true)}>
                <Plus className="my-2 stroke-2 text-3xl text-center text-gray-300 group-hover:animate-wiggle" />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full my-16">
            <div className="w-full flex flex-row">
                <div className="flex flex-grow flex-row border-5 border-r-0 border-secondary">
                    <input type="text" className="w-4/5 flex flex-grow px-2 border-t-5 border-l-5 focus:outline-none font-light"
                        onChange={(e: any) => setNewList({ ...newList, name: e.target.value })}
                        defaultValue={newList.name}
                    />
                </div>

                <div className="flex flex-row space-x-2">
                    <Button descriptor="Create" onClick={create} />
                    <Button descriptor="Cancel" onClick={reset} />
                </div>
            </div>
        </div>
    )

}

const TaskView = ({ task, mutateCallback }: { task: Task, mutateCallback: () => void }) => {

    const auth = useAuthStorage();

    const [edit, setEdit] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const statusUpdateHandler = async (status: string) => {
        updateTask({ ...task, status: status }, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const updateHandler = async () => {
        updateTask(editedTask, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = async () => {
        deleteTask(editedTask.id, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const reset = () => {
        setEdit(false);
        setEditedTask({ ...task });
    }

    if (edit) {
        return (
            <div className="flex flex-col w-full h-full space-y-4">

                {/* title */}
                <Input descriptor="Title" type="text" onChange={(e: any) => setEditedTask({ ...editedTask, name: e.target.value })} defaultValue={task.name} />

                {/* deadline */}
                <Input descriptor="Deadline" type="datetime-local" onChange={(e: any) => setEditedTask({ ...editedTask, timestamp: new Date(e.target.value).getTime() })} defaultValue={convertTimeToInput(task.timestamp)} />

                {/* description */}
                <Textarea descriptor="Description" onChange={(e: any) => setEditedTask({ ...editedTask, description: e.target.value })} defaultValue={task.description} />

                {/* actions */}

                <div className="flex flex-row space-x-4 mt-auto">
                    <Button descriptor="Update" onClick={updateHandler} />
                    <Button descriptor="Delete" onClick={deleteHandler} />
                    <Button descriptor="Cancel" onClick={reset} />
                </div>

            </div>

        )
    }


    return (
        <div className="flex flex-col w-full h-full px-12 py-8 border-5 border-secondary" onDoubleClick={e => { e.stopPropagation(); reset(); setEdit(true) }}>

            {/* title */}
            <h1 className="w-full px-2 font-bold text-2xl sm:text-3xl 2xl:text-4xl">
                {task.name}
            </h1>

            {/* deadline */}
            <p className="w-full px-2 font-light text-sm sm:text-base 2xl:text-lg">
                {convertDate(task.timestamp)}
            </p>

            {/* description */}
            <p className="w-full pt-4 pb-24 px-2 font-light whitespace-pre-wrap text-sm sm:text-base 2xl:text-lg">
                {task.description ? task.description : 'No description'}
            </p>

            {/* actions */}
            <div className="flex flex-row space-x-4 mt-auto">
                <Button descriptor={task.status === 'completed' ? 'Re-Start' : 'Finish It'} onClick={() => statusUpdateHandler(task.status === 'completed' ? 'not-completed' : 'completed')} />
            </div>

        </div>

    )
}

const AddTaskView = ({ list, mutateCallback }: { list: List, mutateCallback: () => void }) => {

    const auth = useAuthStorage();

    const [show, setShow] = useState<boolean>(false);
    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        timestamp: Date.now(),
        status: 'not-completed',
        list: list.id,
    });

    const create = async () => {
        createTask({
            name: newTask.name,
            description: newTask.description,
            timestamp: newTask.timestamp,
            status: newTask.status,
            list: newTask.list
        }, auth.getToken() ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const reset = () => {
        setNewTask({
            name: '',
            description: '',
            timestamp: Date.now(),
            status: 'not-completed',
            list: list.id
        });
        setShow(false);
    }

    if (!show) {
        return (
            <div className="flex flex-row items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-gray-300 group cursor-pointer" onClick={() => setShow(true)}>
                <Plus className="my-2 stroke-2 text-3xl text-center text-gray-300 group-hover:animate-wiggle" />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full space-y-4">

            {/* title */}
            <Input descriptor="Title" type="text" onChange={(e: any) => setNewTask({ ...newTask, name: e.target.value })} defaultValue={newTask.name} />

            {/* deadline */}
            <Input descriptor="Deadline" type="datetime-local" onChange={(e: any) => setNewTask({ ...newTask, timestamp: new Date(e.target.value).getTime() })} defaultValue={convertTimeToInput(newTask.timestamp)} />

            {/* description */}
            <Textarea descriptor="Description" onChange={(e: any) => setNewTask({ ...newTask, description: e.target.value })} defaultValue={newTask.description} />

            {/* actions */}

            <div className="flex flex-row space-x-4 mt-auto">
                <Button descriptor="Create" onClick={(e: any) => create()} />
                <Button descriptor="Cancel" onClick={(e: any) => reset()} />
            </div>

        </div>
    )
}

// Helpers

const convertTimeToInput = (timestamp: number) => {
    if (timestamp === 0) return '';
    try {
        return new Date(timestamp).toISOString().slice(0, 16);
    } catch (err) {
        return '';
    }
}

const convertDate = (timestamp: number) => {
    if (timestamp === 0) {
        return 'No deadline';
    }

    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + ' at ' + date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' });
}

