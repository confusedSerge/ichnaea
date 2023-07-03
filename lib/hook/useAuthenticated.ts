import { useEffect, useState } from "react";
import useStorage from "./useStorage";
import axios from "axios";
import { ROUTES } from "../api/ROUTES";

const useAuthenticated = () => {

    const TOKEN = "TOKEN";
    const ID = "ID";

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isReady, setReady] = useState(false);

    const storage = useStorage();

    useEffect(() => {
        const token = storage.get(TOKEN);
        if (token) {
            validate().
                then(response => {
                    setAuthenticated(true);
                    storage.set(TOKEN, response.token);
                    setReady(true);
                }).
                catch(() => {
                    storage.remove(TOKEN);
                    setAuthenticated(false);
                    setReady(true);
                });
        } else {
            setReady(true);
        }

    }, []);

    const login = async (identity: string, password: string) => {
        return await axios.post(ROUTES.USERS.LOGIN, { identity, password }).then(response => {
            storage.set(TOKEN, response.data.token);
            storage.set("ID", response.data.record.id);
            setAuthenticated(true);
            return response.data;
        });
    }

    const logout = () => {
        storage.remove(TOKEN);
        setAuthenticated(false);
    }

    const validate = async () => {
        return await axios.post(ROUTES.USERS.REFRESH, {}, {
            headers: {
                Authorization: `Bearer ${storage.get(TOKEN)}`
            },
        },).then(response => {
            return response.data;
        });
    }

    return { isAuthenticated, isReady, login, logout , token: storage.get(TOKEN), id: storage.get(ID) };
}

export default useAuthenticated;
