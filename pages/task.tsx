// React
import { useEffect, useState } from "react";

// Next
import Head from "next/head";
import Router from "next/router";

// API
import { createList, createTask, deleteList, deleteTask, updateList, updateTask, useFetchLists, useFetchTasks } from "@/lib/api/tasks";
import useAuthenticated from "@/lib/hook/useAuthenticated";

// Interfaces
import List from "@/lib/interface/list";
import Task from "@/lib/interface/task";

// Icons
import { Archive, Cancel, Check, Clock, DoubleCheck, Emoji, EmojiLookDown, EmojiPuzzled, EmojiSatisfied, EmojiSingLeftNote, EmojiThinkRight, Plus, Trash } from "iconoir-react";

// Components
import ErrorPage from "@/components/defaults/errorpage";
import IconSelector from "@/components/icons/iconselector";

export default function TaskPage() {

    const auth = useAuthenticated();

    useEffect(() => {
        if (auth.isReady && !auth.isAuthenticated) {
            Router.push("/login");
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

    const auth = useAuthenticated();

    const sorting = ["not-completed", "completed"]
    const [sortBy, setSortBy] = useState<string>(sorting[0]);

    const [edit, setEdit] = useState<boolean>(false);
    const [editedList, setEditedList] = useState({ ...list });

    const updateHandler = async () => {
        updateList(editedList, auth.token ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = async () => {
        deleteList(list.id, auth.token ?? '').then(() => {
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

    const { data: tasks, error: taskError, mutate: taskMutat } = useFetchTasks(list.id, sortBy, auth.isReady && auth.isAuthenticated);

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
            <div className="flex flex-col w-full my-16" onDoubleClick={e => { e.stopPropagation(); reset(); }}>
                <div className="w-full flex flex-row justify-between items-center px-8 py-2 rounded-lg border-2 hover:border-accent transition-colors duration-500">
                    <input className="w-fit bg-inherit font-black text-2xl sm:text-3xl 2xl:text-5xl focus:outline-none"
                        value={editedList.name}
                        onDoubleClick={e => e.stopPropagation()}
                        onChange={e => setEditedList({ ...editedList, name: e.target.value })}
                    />

                    <div className="flex flex-row space-x-4">
                        <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                            onClick={updateHandler}>
                            <Check className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
                        </button>
                        <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                            onClick={deleteHandler}>
                            <Trash className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 2xl:gap-16 sm:px-8 py-4">
                    {tasks?.items.map((task) => (
                        <TaskView key={task.id} task={task} mutateCallback={taskMutat} />
                    ))}
                    <AddTaskView list={list} mutateCallback={taskMutat} />
                </div>



            </div>
        );
    }

    return (
        <div className="flex flex-col w-full my-16" onDoubleClick={e => { e.stopPropagation(); reset(); setEdit(true); }}>
            <div className="w-full flex flex-row justify-between items-center px-8 py-2 rounded-lg border-2 border-dashed border-primary">
                <h1 className="w-fit bg-inherit font-black text-2xl sm:text-3xl 2xl:text-5xl outline-none">{list.name}</h1>
                <div className="flex flex-row space-x-4">
                    <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                        onClick={e => { e.stopPropagation(); setSortBy(sorting[(sorting.indexOf(sortBy) + 1) % sorting.length]); }}>
                        {sort_emoji(sortBy)}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 2xl:gap-16 sm:px-8 py-4">
                {tasks?.items.map((task) => (
                    <TaskView key={task.id} task={task} mutateCallback={taskMutat} />
                ))}
                <AddTaskView list={list} mutateCallback={taskMutat} />
            </div>



        </div>
    );
}

const AddListView = ({ mutateCallback }: { mutateCallback: () => void }) => {

    const [show, setShow] = useState<boolean>(false);

    const [newList, setNewList] = useState({ name: "New List" });

    const auth = useAuthenticated();

    const create = async () => {
        createList({
            name: newList.name,
            owner: auth.id ?? '',
        }, auth.token ?? '').then(() => {
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
            <div className="flex flex-row items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 group hover:border-accent transition-colors duration-500  cursor-pointer" onClick={() => setShow(true)}>
                <Plus className="my-2 stroke-2 text-3xl text-center text-gray-300 group-hover:text-accent group-hover:animate-wiggle transition-colors duration-500 " />
            </div>

        )
    }

    return (
        <div className="w-full flex flex-row justify-between items-center px-8 py-2 rounded-lg border-2 border-dashed border-gray-300 group hover:border-accent transition-colors duration-500  cursor-pointer"
            onDoubleClick={e => { e.stopPropagation(); reset(); }}>
            <input className="w-fit bg-inherit font-black text-2xl sm:text-3xl 2xl:text-5xl focus:outline-none"
                value={newList.name}
                onDoubleClick={e => e.stopPropagation()}
                onChange={e => setNewList({ ...newList, name: e.target.value })}
            />

            <div className="flex flex-row space-x-4">
                <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                    onClick={create}>
                    <Check className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
                </button>

                <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                    onClick={reset}>
                    <Cancel className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
                </button>

            </div>
        </div>
    )

}

const TaskView = ({ task, mutateCallback }: { task: Task, mutateCallback: () => void }) => {

    const auth = useAuthenticated();

    const [edit, setEdit] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const statusUpdateHandler = async (status: string) => {
        updateTask({ ...task, status: status }, auth.token ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const updateHandler = async () => {
        updateTask(editedTask, auth.token ?? '').then(() => {
            reset();
            mutateCallback();
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = async () => {
        deleteTask(editedTask.id, auth.token ?? '').then(() => {
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
            <div className="flex flex-col w-full h-full px-8 py-4 rounded-lg shadow border-2 border-primary hover:border-accent transition-colors duration-500" onDoubleClick={e => { e.stopPropagation(); reset(); }}>

                {/* title */}
                <div className="flex flex-row items-center justify-start" onDoubleClick={e => e.stopPropagation()}>
                    <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                        {task_emoji(task)}
                    </div>
                    <input className="w-full ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light transition-colors duration-500" type="text"
                        defaultValue={task.name}
                        onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                    />
                </div>

                {/* deadline */}
                <div className="my-4 flex flex-row items-center justify-start" onDoubleClick={e => e.stopPropagation()}>
                    <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                        <Clock className="stroke-2" />
                    </div>
                    <input className="w-full ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light transition-colors duration-500" type="datetime-local"
                        defaultValue={convertTimeToInput(editedTask.timestamp)}
                        onChange={(e) => setEditedTask({ ...editedTask, timestamp: Date.parse(e.target.value) })}
                    />
                </div>

                {/* description */}
                <div className="flex flex-row items-start justify-start" onDoubleClick={e => e.stopPropagation()}>
                    <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                        <Archive className="stroke-2" />
                    </div>
                    <textarea className="w-full h-48 ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light whitespace-pre-wrap transition-colors duration-500"
                        defaultValue={task.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    />
                </div>

                {/* actions */}
                <div className="flex flex-row items-center justify-end mt-auto pt-4 space-x-4">
                    <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                        onClick={updateHandler}>
                        <Check className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                    </button>
                    <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                        onClick={deleteHandler}>
                        <Trash className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                    </button>
                </div>

            </div>

        )
    }


    return (
        <div className="flex flex-col w-full h-full px-8 py-4 rounded-lg shadow border-2 border-primary hover:border-accent transition-colors duration-500" onDoubleClick={e => { e.stopPropagation(); reset(); setEdit(true) }}>

            {/* title */}
            <div className="flex flex-row items-center justify-start" onDoubleClick={e => e.stopPropagation()}>
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    {task_emoji(task)}
                </div>
                <h1 className="w-full ml-2 px-2 font-bold text-lg sm:text-xl 2xl:text-2xl">{task.name}</h1>
            </div>

            {/* deadline */}
            <div className="my-4 flex flex-row items-center justify-start" onDoubleClick={e => e.stopPropagation()}>
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    <Clock className="stroke-2" />
                </div>
                <p className="w-full ml-2 px-2 font-light">
                    {convertDate(task.timestamp)}
                </p>
            </div>

            {/* description */}
            <div className="flex flex-row items-start justify-start" onDoubleClick={e => e.stopPropagation()}>
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    <Archive className="stroke-2" />
                </div>
                <p className="w-full ml-2 px-2 font-light whitespace-pre-wrap">
                    {task.description ? task.description : 'No description'}
                </p>
            </div>

            {/* actions */}
            <div className="flex flex-row items-center justify-end mt-auto pt-4 space-x-4">
                <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500"
                    onClick={() => statusUpdateHandler(task.status === 'completed' ? 'not-completed' : 'completed')}>
                    {
                        task.status === 'completed' ?
                            <Cancel className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                            :
                            <DoubleCheck className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                    }
                </button>
            </div>

        </div>

    )
}

const AddTaskView = ({ list, mutateCallback }: { list: List, mutateCallback: () => void }) => {

    const [show, setShow] = useState<boolean>(false);

    const [newTask, setNewTask] = useState({
        name: '',
        description: '',
        timestamp: Date.now(),
        status: 'not-completed',
        list: list.id,
    });

    const auth = useAuthenticated();

    const create = async () => {
        createTask({
            name: newTask.name,
            description: newTask.description,
            timestamp: newTask.timestamp,
            status: newTask.status,
            list: newTask.list
        }, auth.token ?? '').then(() => {
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
            <div className="flex flex-row items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-gray-300 group hover:border-accent transition-colors duration-500  cursor-pointer" onClick={() => setShow(true)}>
                <Plus className="my-2 stroke-2 text-3xl text-center text-gray-300 group-hover:text-accent group-hover:animate-wiggle transition-colors duration-500 " />
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full px-8 py-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-accent transition-colors duration-500" onDoubleClick={reset}>

            {/* title */}
            <div className="flex flex-row items-center justify-start">
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    <Plus className="stroke-2" />
                </div>

                <input className="w-full ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light transition-colors duration-500" type="text" placeholder="Title"
                    onDoubleClick={e => e.stopPropagation()}
                    onChange={(e) => { setNewTask({ ...newTask, name: e.target.value }) }} />
            </div>

            {/* deadline */}
            <div className="my-4 flex flex-row items-center justify-start">
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    <Clock className="stroke-2" />
                </div>

                <input className="w-full ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light transition-colors duration-500" type="datetime-local"
                    defaultValue={convertTimeToInput(newTask.timestamp)}
                    onDoubleClick={e => e.stopPropagation()}
                    onChange={(e) => { setNewTask({ ...newTask, timestamp: new Date(e.target.value).getTime() }) }} />
            </div>

            {/* description */}
            <div className="flex flex-row items-start justify-start">
                <div className="flex flex-row items-center justify-center w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7">
                    <Archive className="stroke-2" />
                </div>

                <textarea className="w-full h-48 ml-2 px-2 rounded-md border-2 border-dashed focus:border-accent focus:outline-none bg-inherit font-light transition-colors duration-500 whitespace-pre-wrap" placeholder="Description"
                    onDoubleClick={e => e.stopPropagation()}
                    onChange={(e) => { setNewTask({ ...newTask, description: e.target.value }) }} />
            </div>

            {/* actions */}
            <div className="flex flex-row items-center justify-end mt-auto pt-4 space-x-4">
                <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500" onClick={create}>
                    <Plus className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                </button>
                <button className="flex aspect-square justify-center items-center rounded-full group hover:bg-accent transition-colors duration-500" onClick={reset}>
                    <Cancel className="p-2 stroke-2 text-3xl text-center text-secondary group-active:animate-spinshrink group-hover:animate-wiggle" />
                </button>
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


const sort_emoji = (sortBy: string) => {
    switch (sortBy) {
        case "":
            return <Emoji className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
        case "completed":
            return <EmojiSatisfied className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
        case "not-completed":
            return <EmojiThinkRight className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
        case "deadline":
            return <EmojiLookDown className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
        case "overdue":
            return <EmojiPuzzled className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
        case "no-deadline":
            return <EmojiSingLeftNote className="p-2 stroke-2 text-3xl text-center group-active:animate-spinshrink group-hover:animate-wiggle" />
    }
}

const task_emoji = (task: Task) => {
    if (task.status === 'completed') {
        return <EmojiSatisfied className="stroke-2" />
    }

    if (task.timestamp === 0) {
        return <EmojiSingLeftNote className="stroke-2" />
    }

    // calculate the days left
    const today = Date.now();
    const days = Math.floor((task.timestamp - today) / (1000 * 60 * 60 * 24));

    // if the task is due this week
    if (days <= 7 && days >= 0) {
        return <EmojiLookDown className="stroke-2" />
    }

    // if task is overdue
    if (days < 0) {
        return <EmojiPuzzled className="stroke-2" />
    }

    return <Emoji className="stroke-2" />
}