import { userType } from "../data/types";

const isValidUser = (parsedUser: any) => {
    return (
        parsedUser.id &&
        parsedUser.name &&
        parsedUser.accessToken &&
        parsedUser.refreshToken &&
        typeof parsedUser.id === "string" &&
        typeof parsedUser.name === "string" &&
        typeof parsedUser.accessToken === "string" &&
        typeof parsedUser.refreshToken === "string"
    );
};

const useCurrentUser: () => userType | null = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
        return null;
    }

    const parsedUser = JSON.parse(user);
    if (!isValidUser(parsedUser)) return null;
    return parsedUser;
};

export default useCurrentUser;
