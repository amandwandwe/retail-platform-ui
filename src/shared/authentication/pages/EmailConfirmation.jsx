import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const EmailConfirmation = () => {
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const queryString = searchParams.toString();

                const response = await fetch(
                    `/api/iam/confirmEmail?${queryString}`,
                    {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    const result = await response.json();

                    setSuccess(false);

                    let message = "Email confirmation failed.";

                    try {
                        const result =
                            await response.json();

                        message =
                            result.title ||
                            result.message ||
                            message;
                    } catch { }

                    setMessage(message);
                    return;
                }

                setSuccess(true);
                setMessage(
                    "Email confirmed successfully."
                );
            } catch {
                setSuccess(false);
                setMessage(
                    "An unexpected error occurred while confirming your email."
                );
            } finally {
                setLoading(false);
            }
        };

        confirmEmail();
    }, [searchParams]);

    if (loading) {
        return (
            <div>
                <h1>Confirming Email...</h1>
                <p>Please wait while we verify your account.</p>
            </div>
        );
    }

    return (
        <div className="auth-container auth-confirmation">
            <h2 className="auth-form-title">Email Confirmation</h2>

            {success ? (
                <>
                    <div className="auth-message auth-message--success">
                        {message}
                    </div>

                    <p className="auth-subtitle">
                        Your account is now active. You can
                        sign in using your credentials.
                    </p>

                    <Link to="/auth/login" className="auth-link auth-link--primary">
                        Go to Login
                    </Link>
                </>
            ) : (
                <>
                    <div className="auth-message auth-message--error">
                        {message}
                    </div>

                    <p className="auth-subtitle">
                        The confirmation link may be invalid,
                        expired, or already used.
                    </p>

                    <Link to="/auth/login" className="auth-link auth-link--primary">
                        Return to Login
                    </Link>
                </>
            )}
        </div>
    );
};

export default EmailConfirmation;