// React
import { useEffect, useState } from "react";

// Auth
import useAuthenticated from "@/lib/hook/useAuthenticated";

// Icons
import { Planet } from "iconoir-react";

export default function Login() {

    const auth = useAuthenticated();

    const [credentials, setCredentials] = useState({
        identity: "",
        password: ""
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (auth.isReady && auth.isAuthenticated) {
            setLoggedIn(true);
        }

        if (auth.isReady && !auth.isAuthenticated) {
            setLoggedIn(false);
        }
    }, [auth]);

    return (
        <div className="flex flex-col xl:flex-row m-auto xl:py-16 justify-center items-center">

            {/* Image growing evenly */}
            <div className="hidden xl:flex xl:mr-16 aspect-square justify-center items-center rounded-full min-w-max bg-accent">
                <Planet className="m-4 sm:m-6 xl:m-8 text-6xl sm:text-7xl xl:text-9xl  stroke-2 text-center" />
            </div>

            {
                loggedIn ?
                    (
                        <h1 className="flex flex-col items-start font-bold text-2xl sm:text-3xl 2xl:text-5xl">
                            You are logged in! 
                            <button className="mt-4 w-full p-2 rounded-md border-2 border-accent font-bold text-accent transition-colors duration-500 hover:bg-accent hover:text-secondary"
                                onClick={e => {
                                    e.preventDefault();
                                    auth.logout();
                                }}
                            >
                                Logout
                            </button>
                        </h1>

                    )
                    :
                    (
                        <div className="flex flex-col space-y-4 mt-8 xl:mt-0">

                            <input type="text" placeholder="Username" className="p-2 rounded-md focus:outline-none bg-inherit border-2 hover:border-accent transition-colors duration-500"
                                defaultValue={credentials.identity}
                                onChange={e => setCredentials({ ...credentials, identity: e.target.value })}
                            />
                            <input type="password" placeholder="Password" className="p-2 rounded-md focus:outline-none bg-inherit border-2 hover:border-accent transition-colors duration-500"
                                defaultValue={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            />
                            <button className="p-2 rounded-md border-2 border-accent font-bold text-accent transition-colors duration-500 hover:bg-accent hover:text-secondary"
                                onClick={e => {
                                    e.preventDefault();
                                    auth.login(credentials.identity, credentials.password).then(res => {
                                        setCredentials({
                                            identity: "",
                                            password: ""
                                        });
                                    }).catch(err => {
                                        setError(true);
                                    });
                                }}
                            >
                                {error ? "Try again!" : "Login"}
                            </button>
                        </div>
                    )
            }


        </div>
    );

}