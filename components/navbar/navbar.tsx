// Next
import Link from "next/link";

// Iconoir
import { DoubleCheck, Planet, ProfileCircle, Timer } from "iconoir-react";
import { useRouter } from "next/router";

const Navbar: React.FC<{}> = () => {

    const pathname = useRouter().pathname;

    

    return (
        <div className="flex flex-col space-y-4 xl:flex-row xl:space-y-0 px-2 items-center justify-between">

            <Link className="flex flex-row py-2 items-center font-black text-4xl group" href="/">
                <Planet className="stroke-2 group-hover:text-accent transition-all duration-500 mr-2" />
                ICHNAEA
            </Link>

            <div className="h-full flex flex-row space-x-8">

                <Link href="/timer" className={`flex aspect-square justify-center items-center rounded-full min-w-max group hover:bg-accent transition-colors duration-500 ${pathname == "/timer" ? "bg-accent" : "bg-inherit"}`}>
                    <Timer className="p-2 stroke-2 text-3xl text-center text-secondary group-hover:animate-wiggle" />
                </Link>

                <Link href="/task" className={`flex aspect-square justify-center items-center rounded-full min-w-max group hover:bg-accent transition-colors duration-500 ${pathname == "/task" ? "bg-accent" : "bg-inherit"}`}>
                    <DoubleCheck className="p-2 stroke-2 text-3xl text-center text-secondary group-hover:animate-wiggle" />
                </Link>

                <Link href="/login" className={`flex aspect-square justify-center items-center rounded-full min-w-max group hover:bg-accent transition-colors duration-500 ${pathname == "/login" ? "bg-accent" : "bg-inherit"}`}>
                    <ProfileCircle className="p-2 stroke-2 text-3xl text-center text-secondary group-hover:animate-wiggle" />
                </Link>

            </div>

        </div>
    );

}

export default Navbar;