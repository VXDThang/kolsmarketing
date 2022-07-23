import { Navigate } from 'react-router-dom';

export default function LogOut({ socket }) {
    socket?.disconnect();
    localStorage.removeItem("access_token");
    localStorage.removeItem("check_admin");
    localStorage.removeItem("check_role");
    if (localStorage.beforeLink)
        localStorage.removeItem("beforeLink");
    return (
        <Navigate to="/" />
    );
}