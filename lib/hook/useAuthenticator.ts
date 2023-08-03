import { useEffect, useState } from "react";
import axios from "axios";

// Routes
import { ROUTES } from "../api/ROUTES";

// Storage
import useAuthStorage from "./useAuthStorage";

const useAuthenticator = () => {

    const authStorage = useAuthStorage();

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isReady, setReady] = useState(false);


    useEffect(() => {
        const token = authStorage.getToken();
        if (token) {
            axios.post(ROUTES.USERS.REFRESH, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },).then(response => {
                    setAuthenticated(true);
                    authStorage.setToken(response.data.token);
                    setReady(true);
                }).
                catch(() => {
                    authStorage.setToken("");
                    setAuthenticated(false);
                    setReady(true);
                });
        } else {
            setReady(true);
        }

    }, []);

    const login = async (identity: string, password: string) => {
        return await axios.post(ROUTES.USERS.LOGIN, { identity, password }).then(response => {
            authStorage.setToken(response.data.token);
            authStorage.setId(response.data.record.id);
            setAuthenticated(true);
            return response.data;
        });
    }

    const logout = () => {
        authStorage.setToken("");
        setAuthenticated(false);
    }

    return { isAuthenticated, isReady, login, logout };
}

export default useAuthenticator;
