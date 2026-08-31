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
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label htmlFor="password">
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
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) =>
                                setRememberMe(
                                    e.target.checked
                                )
                            }
                        />

                        Remember Me
                    </label>
                </div>

                {error && (
                    <div
                        style={{
                            color: "red",
                            marginTop: "10px",
                        }}
                    >
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Signing In..."
                        : "Login"}
                </button>
            </form>

            <div style={{ marginTop: "20px" }}>
                <p>
                    <Link to="/auth/forgot-password">
                        Forgot Password?
                    </Link>
                </p>

                <p>
                    <Link to="/auth/recovery-code">
                        Use Recovery Code
                    </Link>
                </p>

                <p>
                    Don't have an account?{" "}
                    <Link to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;