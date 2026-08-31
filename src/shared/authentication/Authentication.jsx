import { Outlet } from "react-router-dom";

const Authentication = () => {
    return (
        <>
            <h1>Identity and Access Management</h1>

            <Outlet />
        </>
    );
};

export default Authentication;