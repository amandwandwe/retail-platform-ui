import { createBrowserRouter } from "react-router-dom";
import Index from "./shared/Index.jsx";
import Authentication from "./shared/authentication/Authentication.jsx";
import Login from "./shared/authentication/pages/Login.jsx";
import Register from "./shared/authentication/pages/Register.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/auth",
        element: <Authentication />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ],
    },
]);

export default router;