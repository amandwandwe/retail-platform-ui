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
        <div>
            <h1>Recovery Code Login</h1>

            <p>
                Use a recovery code to sign in when your
                authenticator application is unavailable.
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="recoveryCode">
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
                    />
                </div>

                {error && (
                    <div style={{ color: "red", marginTop: "1rem" }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ marginTop: "1rem" }}
                >
                    {loading
                        ? "Signing In..."
                        : "Sign In"}
                </button>
            </form>

            <div style={{ marginTop: "1rem" }}>
                <Link to="/auth/login">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default RecoveryCodeLogin;