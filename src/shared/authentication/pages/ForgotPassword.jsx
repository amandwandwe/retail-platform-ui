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
        <div className="auth-container">
            <h2 className="auth-form-title">Forgot Password</h2>

            <p className="auth-subtitle">
                Enter your email address and we will send you a
                password reset link.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label htmlFor="email" className="auth-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        autoComplete="email"
                        className="auth-input"
                    />
                </div>

                {error && (
                    <div className="auth-message auth-message--error">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="auth-message auth-message--success">
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit"
                >
                    {loading
                        ? "Sending Reset Link..."
                        : "Send Reset Link"}
                </button>
            </form>

            <div className="auth-links">
                <p className="auth-link-row">
                    <Link to="/auth/login" className="auth-link auth-link--primary">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;