import { Planet } from "iconoir-react";

export default function Home() {

    return (
        <div className="flex flex-col xl:flex-row m-auto xl:py-16 justify-center items-center">

            <div className="flex xl:mr-16 aspect-square justify-center items-center rounded-full min-w-max bg-accent">
                <Planet className="m-4 sm:m-6 xl:m-8 text-6xl sm:text-7xl xl:text-9xl  stroke-2 text-center text-secondary" />
            </div>


            <div className="mt-4 xl:mt-0 text-center xl:text-left">
                <h1 className="font-black text-5xl sm:text-6xl 2xl:text-8xl">
                    ICHNAEA
                </h1>
                <h2 className="mt-2 font-black text-2xl sm:text-3xl 2xl:text-5xl">
                    A <span className="text-accent">personal</span> assistant for your life. <br />
                    Without the invasion of your <span className="text-accent">privacy</span>.
                </h2>

            </div>
        </div>

    );

}
