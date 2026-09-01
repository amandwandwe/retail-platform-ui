import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RecoveryCodeLogin = () => {
    const navigate = useNavigate();

    const [recoveryCode, setRecoveryCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!recoveryCode.trim()) {
            setError("Recovery code is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/loginWithRecoveryCode", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recoveryCode,
                }),
            });

            if (!response.ok) {
                const result = await response.json();

                setError(
                    result.message ||
                    "Invalid recovery code."
                );
                return;
            }

            navigate("/");
        } catch {
            setError(
                "An unexpected error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-form-title">Recovery Code Login</h2>

            <p className="auth-subtitle">
                Use a recovery code to sign in when your
                authenticator application is unavailable.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label htmlFor="recoveryCode" className="auth-label">
                        Recovery Code
                    </label>
                    <input
                        id="recoveryCode"
                        type="text"
                        value={recoveryCode}
                        onChange={(e) =>
                            setRecoveryCode(e.target.value)
                        }
                        placeholder="Enter recovery code"
                        autoComplete="off"
                        className="auth-input"
                    />
                </div>

                {error && (
                    <div className="auth-message auth-message--error">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit"
                >
                    {loading
                        ? "Signing In..."
                        : "Sign In"}
                </button>
            </form>

            <div className="auth-links">
                <p className="auth-link-row">
                    <Link to="/auth/login" className="auth-link auth-link--primary">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RecoveryCodeLogin;