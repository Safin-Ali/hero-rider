import { getCookieValue } from "./find-cookie";

const getAuthToken = () => {
    const authCookie = document.cookie;
    return getCookieValue(authCookie,`auth_jwt`);
};

export default getAuthToken;