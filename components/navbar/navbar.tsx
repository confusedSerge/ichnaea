// Next
import Link from "next/link";

// Iconoir
import { DoubleCheck, Planet, ProfileCircle, Timer } from "iconoir-react";
import { useRouter } from "next/router";

const Navbar: React.FC<{}> = () => {

    return (
        <div className="flex flex-col space-y-4 xl:flex-row xl:space-y-0 px-2 items-center justify-between">

            <Link className="flex flex-row py-2 items-center font-black text-4xl group" href="/">
                <Planet className="stroke-2" />
                ICHNAEA
            </Link>

            <div className="h-full flex flex-row space-x-8">

                <Link href="/timer" className="flex aspect-square justify-center items-center group">
                    <Timer className="p-2 stroke-2 text-3xl text-center group-hover:animate-wiggle" />
                </Link>

                <Link href="/task" className="flex aspect-square justify-center items-center group">
                    <DoubleCheck className="p-2 stroke-2 text-3xl text-center group-hover:animate-wiggle" />
                </Link>
            </div>

        </div>
    );

}

export default Navbar;