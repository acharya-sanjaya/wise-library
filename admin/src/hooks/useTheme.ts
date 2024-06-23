import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

const useTheme = () => {
    const { darkTheme, lightTheme } = useContext(AppContext);

    return { darkTheme, lightTheme };
};

export default useTheme;
