import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "/api/iam/login?useCookies=true",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                }
            );

            if (!response.ok) {
                const text = await response.text();

                throw new Error(
                    text || "Invalid email or password."
                );
            }

            navigate("/");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-form-title">Login</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label htmlFor="email" className="auth-label">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="email"
                        className="auth-input"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="password" className="auth-label">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        autoComplete="current-password"
                        className="auth-input"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="auth-checkbox-row">
                    <label className="auth-checkbox-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) =>
                                setRememberMe(
                                    e.target.checked
                                )
                            }
                        />

                        <span>Remember Me</span>
                    </label>
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
                        : "Login"}
                </button>
            </form>

            <div className="auth-links">
                <p className="auth-link-row">
                    <Link to="/auth/forgot-password" className="auth-link">
                        Forgot Password?
                    </Link>
                </p>

                <p className="auth-link-row">
                    <Link to="/auth/recovery-code" className="auth-link">
                        Use Recovery Code
                    </Link>
                </p>

                <p className="auth-link-row auth-register-copy">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/register" className="auth-link auth-link--primary">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;