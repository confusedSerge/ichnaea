import useStorage from "./useStorage";

export default function useAuthStorage() {

    const TOKEN = "TOKEN";
    const ID = "ID";

    const storage = useStorage();


    const getId = () => {
        return storage.get(ID);
    }

    const getToken = () => {
        return storage.get(TOKEN);
    }

    const setId = (id: string) => {
        if (!id) {
            storage.remove(ID);
            return;
        }
        storage.set(ID, id);
    }

    const setToken = (token: string) => {
        if (!token) {
            storage.remove(TOKEN);
            return;
        }
        storage.set(TOKEN, token);
    }

    return { getId, getToken, setId, setToken };
}
