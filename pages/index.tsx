
// React
import { useEffect, useState } from "react";

// Auth
import useAuthenticator from "@/lib/hook/useAuthenticator";

// Components
import { Planet } from "iconoir-react";
import Button from "@/components/basics/button";
import Input from "@/components/basics/input";

export default function Home() {

    const auth = useAuthenticator();

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
        <div className="flex flex-col m-auto justify-center items-center space-y-8">

            <div className="text-left">
                <h1 className="flex flex-row py-2 items-center font-black text-4xl sm:text-5xl 2xl:text-6xl">
                    <Planet className="stroke-2 mr-2" />
                    ICHNAEA
                </h1>
                <h2 className="mt-2 font-light text-2xl sm:text-3xl 2xl:text-5xl">
                    A <span className="italic font-bold">personal</span> assistant for your life. <br />
                    Without the invasion of your <span className="italic font-bold">privacy</span>.
                </h2>
            </div>

            {/* Auth Box */}
            {
                loggedIn ?

                    <div className="w-full flex mt-8">
                        <Button descriptor="Logout" onClick={() => { auth.logout(); }} title="You are logged in!" />
                    </div>

                    :
                    <div className="w-full flex flex-col space-y-4 mt-8">

                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-4 sm:space-y-0">
                            <Input descriptor="Username" type="text" onChange={(e: any) => { setCredentials({ ...credentials, identity: e.target.value }); }} defaultValue={credentials.identity} style={1} />

                            <Input descriptor="Password" type="password" onChange={(e: any) => { setCredentials({ ...credentials, password: e.target.value }); }} defaultValue={credentials.password} style={1} />
                        </div>
                        <Button descriptor={error ? "Try again!" : "Login"}
                            onClick={() => {
                                auth.login(credentials.identity, credentials.password).then(res => {
                                    setCredentials({
                                        identity: "",
                                        password: ""
                                    });
                                }).catch(err => {
                                    setError(true);
                                });
                            }} />

                    </div>
            }
        </div>

    );

}
