import { useState } from "react";
import { Link } from "react-router-dom";

const passwordRequirements = [
    "At least 8 characters",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one number",
    "At least one special character",
];

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = [];

        if (!email.trim()) {
            validationErrors.push("Email is required.");
        }

        if (!password) {
            validationErrors.push("Password is required.");
        }

        if (!confirmPassword) {
            validationErrors.push("Confirm Password is required.");
        }

        if (password !== confirmPassword) {
            validationErrors.push("Passwords do not match.");
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors([]);
            setSuccessMessage("");

            const response = await fetch(
                "/api/iam/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            if (!response.ok) {
                const result =
                    await response.json();

                if (result.errors) {
                    const apiErrors = [];

                    Object.values(
                        result.errors
                    ).forEach((items) => {
                        if (Array.isArray(items)) {
                            apiErrors.push(...items);
                        }
                    });

                    setErrors(apiErrors);
                } else {
                    setErrors([
                        result.title ||
                        result.message ||
                        "Registration failed.",
                    ]);
                }

                return;
            }

            setSuccessMessage(
                "Registration successful. You can now sign in."
            );

            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch {
            setErrors([
                "An unexpected error occurred. Please try again.",
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-form-title">Create Account</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label htmlFor="email" className="auth-label">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="auth-input"
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
                            setPassword(
                                e.target.value
                            )
                        }
                        autoComplete="new-password"
                        placeholder="Enter your password"
                        className="auth-input"
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="confirmPassword" className="auth-label">
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        className="auth-input"
                    />
                </div>

                <div className="auth-requirements">
                    <h3 className="auth-subsection-title">
                        Password Requirements
                    </h3>

                    <ul className="auth-password-list">
                        {passwordRequirements.map(
                            (requirement) => (
                                <li
                                    key={
                                        requirement
                                    }
                                >
                                    {
                                        requirement
                                    }
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {errors.length > 0 && (
                    <div className="auth-message auth-message--error auth-message--list">
                        <ul>
                            {errors.map(
                                (
                                    error,
                                    index
                                ) => (
                                    <li
                                        key={
                                            index
                                        }
                                    >
                                        {
                                            error
                                        }
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}

                {successMessage && (
                    <div className="auth-message auth-message--success">
                        {successMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit"
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>
            </form>

            <div className="auth-links">
                <p className="auth-link-row auth-register-copy">
                    <Link to="/auth/login" className="auth-link auth-link--primary">
                        Already have an account? Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;