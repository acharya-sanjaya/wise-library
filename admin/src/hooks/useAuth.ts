import { userType } from "../data/types";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

const useAuth = () => {
    const { isAuth, setIsAuth } = useContext(AppContext);

    const login = (user: userType) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsAuth(true);
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setIsAuth(false);
    };

    return { isAuth, setIsAuth, login, logout };
};

export default useAuth;
