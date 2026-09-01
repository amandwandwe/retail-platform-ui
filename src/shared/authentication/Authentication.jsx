import { Outlet } from "react-router-dom";

const Authentication = () => {
    return (
        <div className="auth-page">
            <div className="auth-panel">
                <header className="auth-header">
                    <p className="eyebrow">Account access</p>
                    <h1 className="auth-title">Identity and Access Management</h1>
                </header>

                <Outlet />
            </div>
        </div>
    );
};

export default Authentication;