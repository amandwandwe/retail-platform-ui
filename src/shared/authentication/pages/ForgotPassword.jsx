import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        try {
            setLoading(true);

            await fetch(
                "/api/iam/forgotPassword",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            setMessage(
                "If an account exists for this email address, a password reset link has been sent."
            );
        } catch {
            setMessage(
                "If an account exists for this email address, a password reset link has been sent."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>

            <p>
                Enter your email address and we will send you a
                password reset link.
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        autoComplete="email"
                    />
                </div>

                {error && (
                    <div style={{ color: "red", marginTop: "1rem" }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{ color: "green", marginTop: "1rem" }}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ marginTop: "1rem" }}
                >
                    {loading
                        ? "Sending Reset Link..."
                        : "Send Reset Link"}
                </button>
            </form>

            <div style={{ marginTop: "1rem" }}>
                <Link to="/auth/login">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;