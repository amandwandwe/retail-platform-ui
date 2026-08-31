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
    const [errors, setErrors] = useState("");

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

            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const result = await response.json();

                if (result.errors) {
                    setErrors(
                        Array.isArray(result.errors)
                            ? result.errors
                            : Object.values(result.errors).flat()
                    );
                } else {
                    setErrors([
                        result.message || "Registration failed.",
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
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Enter your password"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                    />
                </div>

                <div style={{ marginTop: "16px" }}>
                    <h3>Password Requirements</h3>
                    <ul>
                        {passwordRequirements.map(
                            (requirement) => (
                                <li key={requirement}>
                                    {requirement}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {errors.length > 0 && (
                    <div
                        style={{
                            color: "red",
                            marginTop: "16px",
                        }}
                    >
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {successMessage && (
                    <div
                        style={{
                            color: "green",
                            marginTop: "16px",
                        }}
                    >
                        {successMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ marginTop: "16px" }}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </form>

            <div style={{ marginTop: "20px" }}>
                <Link to="/auth/login">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
};

export default Register;